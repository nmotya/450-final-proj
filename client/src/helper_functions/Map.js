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

async function getContractOrganizationStateHighest(year) {
  try {
    const response = await (await fetch(`${url}/contractOrganizationStateHighest/${year}`)).json();
    return response;
  } catch (e) {
    return e;
  }
}

async function getAssistanceAreaofworkStateExists(aow, year) {
  try {
    const response = await (await fetch(`${url}/assistanceAreaofworkStateExists/${aow}/${year}`)).json();
    return response;
  } catch (e) {
    return e;
  }
}

async function getAssistanceTotalAmountSpentState(year1, year2) {
  try {
    const response = await (await fetch(`${url}/assistanceTotalAmountSpentState/${year1}/${year2}`)).json();
    return response;
  } catch (e) {
    return e;
  }
}

async function getContractsTotalAmountSpentState(year1, year2) {
  try {
    const response = await (await fetch(`${url}/contractsTotalAmountSpentState/${year1}/${year2}`)).json();
    return response;
  } catch (e) {
    return e;
  }
}


module.exports = { 
  getAssistanceAreaofworkStateHighest, 
  getContractOrganizationStateHighest,
  getAssistanceAreaofworkStateExists,
  getAssistanceTotalAmountSpentState,
  getContractsTotalAmountSpentState
};
