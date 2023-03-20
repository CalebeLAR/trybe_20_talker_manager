const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, './talker.json');

const getTalkers = async () => {
  try {
    const data = await fs.readFile(talkerPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido: ${error.message}`);
  }
};

const writeTalkers = async (talker) => {
  try {
    await fs.writeFile(talkerPath, talker);
  } catch (error) {
    console.error(`Erro ao escrever o arquivo: ${error.message}`);
  }
};

module.exports = { getTalkers, writeTalkers };
