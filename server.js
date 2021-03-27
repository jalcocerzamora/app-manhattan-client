// Express server for the Angular APP
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname+'/dist/store'));

app.get('/',function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname+'/dist/store/') });
});

// Start the APP by listening on the default Heroku port
app.listen(process.env.PORT || 8080);