const  express = require('express');
require('express-group-routes');
const  dotenv = require('dotenv');
const bodyParser = require('body-parser');
const migrate = require('./migrate');
const routerManager = require('./routes');
const app = express();
const env = dotenv.config().parsed;
app.use(bodyParser.json());

try {
  migrate();
} catch (error) {
  console.log(error)  
  process.exit(1) 
}

routerManager(app);

const port = env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`Nexus app run in port: ${port}`);
});
