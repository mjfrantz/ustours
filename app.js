const fs = require('fs');
const express = require('express');

const app = express();

// //root URL with the HTTP method and a callback function by using json it will automatically set the content type to json. 
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server side', app: 'ustours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

//Parsing the data into an array of Javascript objects in the tours-simple folder. 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//route handler sending back to the client once the tours has been parsed. 
// data property the data will then in turn have a object and the response we want to send which is tours. In ES6 we do not need to specify the key and the value if the name is the same. 
//Test this out in Postman 127.0.0.1:3000/api/v1/tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
})

//start up a server with a callback function
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

