const express = require('express');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
const cors = require('cors');
const app = express();
const connectToMongo = require('./config/mongoose');
const port = process.env.PORT || 9003;
app.use(cors());
connectToMongo();

app.use(express.json());
app.use('/', require('./routes'));


app.listen(port, () => {
   console.log(`Space For Work app listening at http://localhost:${port}`);
})
