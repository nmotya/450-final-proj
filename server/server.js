const express = require('express')
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
var routes = require("./routes.js");
const cors = require('cors');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/test', routes.test);

app.get('/test1', routes.test1);

app.get('/contractSpendingAcrossYears/:year1/:year2', routes.contractSpendingAcrossYears);

app.get('/contractSpendingAcrossYearsSum/:year1/:year2', routes.contractSpendingAcrossYearsSum);

app.get('/contractAgencySpending/:agency', routes.contractAgencySpending);

app.get('/contractAgencySpendingYear/:agency/:year1/:year2', routes.contractAgencySpendingYear);

app.get('/contractForeignSpending/', routes.contractForeignSpending);

app.get('/contractStateSpending/', routes.contractStateSpending);

app.get('/contractLargestStateAward/:agency', routes.contractLargestStateAward);

app.get('/contractCovidAward/', routes.contractCovidAward);

app.get('/assistanceTrans_2018/', routes.assistanceTrans_2018);

app.get('/assistTest/', routes.assistTest);

app.get('/assistTest2/', routes.assistTest2);

app.get('/totalObligatedByYear/', routes.totalObligatedByYear);

app.get('/nonFedByYear/', routes.nonFedByYear);

app.listen(port, () => {
  console.log(`App running on port ${port}`)
});