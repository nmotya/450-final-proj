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

app.listen(port, () => {
  console.log(`App ruuning on port ${port}.`)
});