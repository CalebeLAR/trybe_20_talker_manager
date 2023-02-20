const express = require('express');
const readFile = require('./ultils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (req, res) => {
  try {
     const talkers = await readFile();
     if (talkers) return res.status(200).json(talkers);
   } catch (error) {
     res.status(500).send({ message: error.message });
   }
 });

 app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talkers = await readFile();
    const talker = talkers.find((tal) => tal.id === Number(id));
    if (talker.id) return res.status(200).json(talker);
  } catch (error) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
