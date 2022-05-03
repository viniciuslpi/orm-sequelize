 const express = require('express');
 const bodyParser = require('body-parser');
 
 const app = express();
 
 app.use(bodyParser.json());
 
 const port = 3000;

 app.get('/teste', (req, res) => {
     res
     .status(200)
     .send({ message: 'Welcome to my API!'})
 })

 app.listen(port, () => console.log(`Server running at http://localhost:3000`))

 module.exports = app;