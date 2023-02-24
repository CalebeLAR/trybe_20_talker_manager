const express = require('express');
const { getTalkers, writeTalkers } = require('./ultils');

const { 
  gerToken, 
  validLogin, 
  validDataLogin, 
  validToken, 
  validName, 
  validTalker, 
  validWatchedAt, 
  validAge, 
  validRate } = require('./middlewares'); 

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (req, res) => {
  try {
     const talkers = await getTalkers();
     if (talkers) return res.status(200).json(talkers);
   } catch (error) {
     res.status(500).send({ message: error.message });
   }
 });

 app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talkers = await getTalkers();
    const talker = talkers.find((tal) => tal.id === Number(id));
    if (talker.id) return res.status(200).json(talker);
  } catch (error) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', validLogin, validDataLogin, gerToken, (req, res) => {
  res.status(200).json({ token: res.token });
});

app.post('/talker', 
  validToken,
  validName,
  validAge,
  validTalker,
  validWatchedAt,
  validRate, async (req, res) => {
    try {
      const talkers = await getTalkers();
      const indexLastTalker = [talkers.length - 1];
      const lastTalkerId = talkers[indexLastTalker].id;
      const newId = lastTalkerId + 1;
      const newTalker = { id: newId, ...req.body };
      await writeTalkers(JSON.stringify([...talkers, newTalker]));
      res.status(201).json(newTalker);
    } catch (error) {
      res.sendStatus(500);
    }
});

// não remova esse endpoint, é para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
