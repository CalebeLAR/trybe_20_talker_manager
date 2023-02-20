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
   } catch (err) {
     res.status(500).send({ message: err.message });
   }
 });

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
