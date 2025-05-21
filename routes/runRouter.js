const { Router } = require('express');
const prisma = require('../prismaClient');
const runRouter = new Router();

runRouter.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newRun = await prisma.run.create({
      data: {
        username: name,
        start: new Date(),
        status: 'running',
      },
    });
    res.json(newRun);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

runRouter.get('/', async (req, res) => {
  try {
    const runs = await prisma.run.findMany({
      where: {
        status: 'finished',
      },
    });
    res.json(runs);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

function checkPosCorrectness(pos, character) {
  return (
    pos.left >= character.startx &&
    pos.left <= character.endx &&
    pos.top >= character.starty &&
    pos.top <= character.endy
  );
}

function alreadyFound(characterName, run) {
  return run.foundCharacters.some((found) => {
    return found === characterName;
  });
}

function checkGameEnd(run) {
  const foundCount = run.foundCharacters.length;
  const totalCount = run.totalCharacters;
  return foundCount >= totalCount;
}

runRouter.put('/:runId', async (req, res) => {
  const { runId } = req.params;
  const { target, pos } = req.body;

  try {
    const character = await prisma.character.findFirst({
      where: {
        name: target,
      },
    });
    const run = await prisma.run.findUnique({
      where: { id: runId },
    });
    const hit = checkPosCorrectness(pos, character);
    if (!hit) {
      return res.json({
        success: false,
        message: `You didn't click on ${target}`,
        run,
      });
    }
    const isFoundAlready = alreadyFound(character.name, run);
    if (isFoundAlready) {
      return res.json({
        success: false,
        message: `You already found ${target}`,
        run,
      });
    }
    // Update the run with the found character
    const updatedRun = await prisma.run.update({
      where: { id: runId },
      data: {
        foundCharacters: {
          push: character.name,
        },
      },
    });
    // Check if the game has ended
    const gameEnded = checkGameEnd(updatedRun);
    if (gameEnded) {
      const finalRun = await prisma.run.update({
        where: { id: runId },
        data: {
          status: 'finished',
          end: new Date(),
        },
      });
      const time = finalRun.end - finalRun.start;
      // Convert time from milliseconds to seconds
      console.log(`Game finished in ${time} ms`);
      return res.json({
        success: true,
        message: `You found all characters!`,
        run: finalRun,
      });
    } else {
      return res.json({
        success: true,
        message: `You found ${target}`,
        run: updatedRun,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

runRouter.get('/', async (req, res) => {
  try {
    const runs = await prisma.run.findMany();
    res.json(runs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = runRouter;
