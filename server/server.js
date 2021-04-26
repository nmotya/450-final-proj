const express = require('express')
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
var routes = require("./routes.js");
const cors = require('cors');

app.use(cors({credentials: true, origin: `http://localhost:${port}`}));
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

app.listen(port, () => {
  console.log(`App running on port ${port}`)
});