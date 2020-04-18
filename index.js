const express = require('express');
const app = express();
const morgan = require('morgan');


let topMovies = [ {
  title : 'The Lord of the Rings',
  director : 'Peter Jackson'
},
{
  title : '300',
  director : 'Zack Snyder'
},
{
  title : 'RocknRolla',
  director : 'Guy Ritchie'
},
{
  title : 'Good Will Hunting',
  director : 'Gus Van Sant'
},
{
  title : 'Moneyball',
  director : 'Bennett Miller'
},
{
  title : 'Blow',
  director : 'Ted Demme'
},
{
  title : 'Love',
  director : 'Gaspar Noe'
},
{
  title : 'Enter the void',
  director : 'Gaspar Noe'
},
{
  title : 'Pulp Fiction',
  director : 'Quentin Tarantino'
},
{
  title : 'Reservoir dogs',
  director : 'Quentin Tarantino'
}
]

app.use(express.static('public'));
app.use(morgan('common'));

app.get('/', function(req, res) {
  res.send('Must-watch movies')
});
app.get('/secreturl', function (req, res) {
  res.send('This is a secret url with super top-secret content.');
});
app.get('/documentation', function(req, res) {
  res.sendFile('public/documentation.html', { root: __dirname });
});
app.get('/movies', function(req, res) {
  res.json(topMovies)
});

app.use(function (err, req, res, next) {
console.error(err.stack);
res.status(500).send('Oops, something went wrong!');
});

app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
