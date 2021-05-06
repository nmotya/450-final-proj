const express = require('express')
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
var routes = require("./routes.js");
const cors = require('cors');

app.use(cors({credentials: true, origin: `http://localhost:3000`}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/contractSpendingAcrossYears/:year1/:year2', routes.contractSpendingAcrossYears);

app.get('/contractSpendingAcrossYearsSum/:year1/:year2', routes.contractSpendingAcrossYearsSum);

app.get('/contractAgencySpending/', routes.contractAgencySpending);

app.get('/contractAgencySpendingYear/:agency/:year1/:year2', routes.contractAgencySpendingYear);

app.get('/contractForeignSpending/', routes.contractForeignSpending);

app.get('/contractStateSpending/', routes.contractStateSpending);

app.get('/contractLargestStateAward/:agency', routes.contractLargestStateAward);

app.get('/contractCovidAward/', routes.contractCovidAward);

app.get('/assistanceSpendingAcrossYears/:year1/:year2', routes.assistanceSpendingAcrossYears);

app.get('/assistanceSpendingAcrossYearsSum/:year1/:year2', routes.assistanceSpendingAcrossYearsSum);

app.get('/assistanceAgencySpending/', routes.assistanceAgencySpending);

app.get('/assistanceAgencySpendingYear/:agency/:year1/:year2', routes.assistanceAgencySpendingYear);

app.get('/contractSpendingByYear/:year1', routes.contractSpendingByYear);

app.get('/contractSourceToRecipient/:source/:recipient', routes.contractSourceToRecipient);

app.get('/contractRecipientType/', routes.contractRecipientType);

app.get('/assistanceAreaofworkStateExists/:aow/:year', routes.assistanceAreaofworkStateExists);

app.get('/contractOrganizationStateHighest/:year', routes.contractOrganizationStateHighest);

app.get('/assistanceAreaofworkStateHighest/:year', routes.assistanceAreaofworkStateHighest);

app.get('/assistanceSourceToRecipient/:source/:recipient', routes.assistanceSourceToRecipient);

app.get('/assistanceSpendingByYear/:year', routes.assistanceSpendingByYear);

app.get('/assistanceStateSpending/', routes.assistanceStateSpending);

app.get('/assistanceTotalAmountSpentState/:year1/:year2', routes.assistanceTotalAmountSpentState);

app.get('/contractsTotalAmountSpentState/:year1/:year2', routes.contractsTotalAmountSpentState);

app.get('/contractPaSpendingByYear/', routes.contractPaSpendingByYear);

app.get('/assistanceSpendingAcrossYearsSumGroupBy/', routes.assistanceSpendingAcrossYearsSumGroupBy);

app.get('/contractSpendingAcrossYearsSumGroupBy/', routes.contractSpendingAcrossYearsSumGroupBy);

app.post('/insertIntoSurvey/', routes.insertIntoSurvey);
app.listen(port, () => {
  console.log(`App running on port ${port}`)
});