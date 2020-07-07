require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(PORT, console.log(`Server starting on ${PORT}...`));
