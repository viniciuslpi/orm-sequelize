 const express = require('express');
 const routes = require('./routes');
 const app = express();
 const port = 3000;
 
 routes(app)
 app.listen(port, () => console.log(`Server running at http://localhost:3000`))

 module.exports = app;