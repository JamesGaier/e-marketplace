require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT;
const db = require('./models');
const controllers = require('./controllers');
const routes = require('./routes');

app.get('/', (req, res) => {res.json({msg: 'hello world'});});

app.use(cors());
app.use(express.json());

app.use('/api/auth', routes.auth);
app.use('/api/cart', routes.cart);
app.use('/api/store', routes.store);

app.use(controllers.notFound);
app.use(controllers.errors);

app.listen(PORT, console.log(`Server starting on http://localhost:${PORT}/...`));
