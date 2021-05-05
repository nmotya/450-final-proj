const fetch = require('node-fetch');

const url = 'http://localhost:8000';

async function getAssistanceAreaofworkStateHighest(year) {
  try {
    const response = await (await fetch(`${url}/assistanceAreaofworkStateHighest/${year}`)).json();
    return response;
  } catch (e) {
    return e;
  }
}

module.exports = { getAssistanceAreaofworkStateHighest };
