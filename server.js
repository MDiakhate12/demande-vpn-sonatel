//Install express server
import express, { static } from 'express';
import { join } from 'path';
import { json } from "body-parser";


const app = express();
app.use(json());

// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(static(__dirname + '/dist/Frontend'));

app.get('*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
  res.sendFile(join(__dirname + '/dist/Frontend/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);