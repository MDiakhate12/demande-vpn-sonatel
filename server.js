
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/Frontend'));

app.get('/*', function (req, res) {
  res
  .status(200)
  .sendFile(path.join(__dirname, '/dist/Frontend/index.html'));
});


// Start the app by listening on the default Heroku port
let server = app.listen(process.env.PORT || 3000, () => {
  let port = server.address().port;
  console.log("Le serveur tourne sur le port", port);
});
