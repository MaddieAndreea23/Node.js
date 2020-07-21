const express = require("express");
const morgan = require("morgan");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const app = express();

// Mongoose //
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/MyFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

let movies = [
  {
    id: 1,
    title: "The Lord of the Rings",
    director: "Peter Jackson",
    description:
      "Set in the fictional world of Middle-earth, the films follow the hobbit Frodo Baggins as he and the Fellowship embark on a quest to destroy the One Ring, to ensure the destruction of its maker, the Dark Lord Sauron.",
    genre: "Adventure",
    image: "",
    featured: "true"
  },
  {
    id: 2,
    title: "300",
    director: "Zack Snyder",
    description:
      "The plot revolves around King Leonidas (Gerard Butler), who leads 300 Spartans into battle against the Persian 'God-King' Xerxes (Rodrigo Santoro) and his invading army of more than 300,000 soldiers. As the battle rages, Queen Gorgo (Lena Headey) attempts to rally support in Sparta for her husband. ",
    genre: "Action",
    image: "",
    featured: "true"
  },
  {
    id: 3,
    title: "RocknRolla",
    director: "Guy Ritchie",
    description:
      "In London, a real-estate scam puts millions of pounds up for grabs, attracting some of the city's scrappiest tough guys and its more established underworld types, all of whom are looking to get rich quick.",
    genre: "Crime",
    image: "",
    featured: "true"
  },
  {
    id: 4,
    title: "Good Will Hunting",
    director: "Gus Van Sant",
    description:
      "Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.",
    genre: "Drama",
    image: "",
    featured: "true"
  },
  {
    id: 5,
    title: "Moneyball",
    director: "Bennett Miller",
    description:
      "Oakland A's general manager Billy Beane's successful attempt to assemble a baseball team on a lean budget by employing computer-generated analysis to acquire new players.",
    genre: "Biography",
    image: "",
    featured: "true"
  },
  {
    id: 6,
    title: "Blow",
    director: "Ted Demme",
    description:
      "The story of how George Jung, along with the Medellín Cartel headed by Pablo Escobar, established the American cocaine market in the 1970s in the United States.",
    genre: "Crime",
    image: "",
    featured: "true"
  },
  {
    id: 7,
    title: "Love",
    director: "Gaspar Noe",
    description:
      "Murphy is an American living in Paris who enters a highly emotionally charged relationship with the unstable Electra. Unaware of the effect it will have on their relationship, they invite their pretty neighbor into their bed.",
    genre: "Drama",
    image: "",
    featured: "true"
  },
  {
    id: 8,
    title: "Enter the void",
    director: "Gaspar Noe",
    description:
      "An American drug dealer living in Tokyo is betrayed by his best friend and killed in a drug deal. His soul, observing the repercussions of his death, seeks resurrection.",
    genre: "Fantasy",
    image: "",
    featured: "true"
  },
  {
    id: 9,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genre: "Crime",
    image: "",
    featured: "true"
  },
  {
    id: 10,
    title: "Reservoir Dogs",
    director: "Quentin Tarantino",
    description:
      "When a simple jewelry heist goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant.",
    genre: "Crime",
    image: "",
    featured: "true"
  }
];

let genres = [
  {
    name: "Adventure",
    description:
      "Adventure movies are usually exciting stories, with new experiences or exotic locales, very similar to or often paired with the action film genre."
  },
  {
    name: "Action",
    description:
      "Action movies normally include high energy, big-budget physical stunts and chases, battles, fights, escapes, destructive crises - all designed for pure audience escapism."
  },
  {
    name: "Crime",
    description:
      "A crime movie is about a crime that is being committed or was committed. It can also be an account of a criminal's life. It often falls into the action or adventure genres."
  },
  {
    name: "Drama",
    description:
      "Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone,[2] focusing on in-depth development of realistic characters who must deal with realistic emotional struggles."
  },
  {
    name: "Biography",
    description: "The details of the life story of a real person."
  },
  {
    name: "Fantasy",
    description:
      "Fantasy movies are about magic or supernatural forces, rather than technology (as science fiction), if it happens to take place in a modern or future era."
  }
];

let directors = [
  {
    name: "Peter Jackson",
    bio:
      "Sir Peter Robert Jackson is a New Zealand film director, screenwriter, and film producer. He is best known as the director, writer, and producer of the Lord of the Rings trilogy (2001–03) and the Hobbit trilogy (2012–14), both of which are adapted from the novels of the same name by J. R. R. Tolkien.",
    birth: "1961",
    death: ""
  },
  {
    name: "Zack Snyder",
    bio:
      "Zachary Edward Snyder is an American film director, producer, and screenwriter. He made his feature film debut in 2004 with a remake of the 1978 horror film Dawn of the Dead. Since then, he has directed or produced a number of comic book and superhero films.",
    birth: "1966",
    death: ""
  },
  {
    name: "Guy Ritchie",
    bio:
      "Guy Stuart Ritchie is an English film director, producer, writer, and businessman. He is known for his British gangster films and Sherlock Holmes franchise.",
    birth: "1968",
    death: ""
  },
  {
    name: "Gus Van Sant",
    bio:
      "Gus Green Van Sant Jr. is an American film director, screenwriter, painter, photographer, musician, and author who has earned acclaim as both an independent and mainstream filmmaker.",
    birth: "1952",
    death: ""
  },
  {
    name: "Bennett Miller",
    bio:
      "Bennett Miller is an American film director, known for directing the acclaimed films Capote (2005), Moneyball (2011), and Foxcatcher (2014). He has been nominated twice for the Academy Award for Best Director.",
    birth: "1966",
    death: ""
  },
  {
    name: "Ted Demme",
    bio:
      "Edward Kern 'Ted' Demme was an American director, producer, and actor.",
    birth: "1963",
    death: "2002"
  },
  {
    name: "Gaspar Noe",
    bio:
      "Gaspar Noé is an Argentine filmmaker based in Paris, France. He is the son of Argentine painter, writer and intellectual Luis Felipe Noé.He has directed five feature films: I Stand Alone (1998), Irréversible (2002), Enter the Void (2009), Love (2015), and Climax (2018).",
    birth: "1963",
    death: ""
  },
  {
    name: "Quentin Tarantino",
    bio:
      "Quentin Jerome Tarantino is an American filmmaker and actor. His films are characterized by nonlinear storylines, aestheticization of violence, extended scenes of dialogue, ensemble casts, references to popular culture and a wide variety of other films, soundtracks primarily containing songs and score pieces from the 1960s to the 1980s, alternate history, and features of neo-noir film.",
    birth: "1963",
    death: ""
  }
];

let users = [
  {
    id: 1,
    Name: "Jessica Drake",
    Password: "drake1",
    Email: "jessica.drake@gmail.com",
    Birthday: "03-01-1992"
  },
  {
    id: 2,
    Name: "Ben Cohen",
    Password: "cohenben143",
    Email: "ben.cohen@gmail.com",
    Birthday: "23-06-1992"
  },
  {
    id: 3,
    Name: "Lisa Downing",
    Password: "downinglisa34",
    Email: "lisa.downing@gmail.com",
    Birthday: "11-12-1991"
  }
];

// Use express.static to serve the “documentation.html” file from the public folder
app.use(express.static("public"));
// Use the Morgan middleware library to log all requests
app.use(morgan("common"));
//Use the body-parser middleware to read the “body” of HTTP requests within the request handlers
app.use(bodyParser.json());

// GET requests
app.get("/", function(req, res) {
  res.send("Must-watch movies");
});
app.get("/secreturl", function(req, res) {
  res.send("This is a secret url with super top-secret content.");
});
app.get("/documentation", function(req, res) {
  res.sendFile("public/documentation.html", { root: __dirname });
});

/////////             =============== [ M O V I E S ] ===============            /////////

// Get all movies
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Get a movie by title
app.get('/movies/:title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((Title) => {
      res.json(Title);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get all genres
app.get('/genres', (req, res) => {
  genres.find()
    .then((genres) => {
      res.status(201).json(genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Genre by name
app.get('/movies/genres/:Name', (req, res) => {
  Movies.findOne({'Genre.Name': req.params.Name})
  .then(function(movie){
    res.json(movie)
    })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});


// Gets all directors
app.get('/directors', (req, res) => {
  directors.find()
    .then((directors) => {
      res.status(201).json(directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Director by name
app.get('/movies/directors/:Name', (req, res) => {
  Movies.findOne({'Director.Name': req.params.Name})
  .then(function(movie){
    res.json(movie)
    })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});


/////////             =============== [ U S E R S ] ===============            /////////


// Get all Users
app.get('/Users', (req, res) => {
  Users.find()
    .then((Users) => {
      res.status(201).json(Users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Get a User by name
app.get('/Users/:Name', (req, res) => {
  Users.findOne({ Name: req.params.Name })
    .then((User) => {
      res.json(User);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//Add a User
/* We’ll expect JSON in this format
{
  ID: Integer,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  users.findOne({ Name: req.body.Name })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        users
          .create({
            Name: req.body.Name,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Update a User's info, by name
/* We’ll expect JSON in this format
{
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/Users/:Name', (req, res) => {
  Users.findOneAndUpdate({ Name: req.params.Name }, { $set:
    {
      Name: req.body.Name,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Add a movie to a user's list of favorites
app.post('/users/:Name/Movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Name: req.params.Name }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Delete a user by name
app.delete('/users/:Name', (req, res) => {
  Users.findOneAndRemove({ Name: req.params.Name })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.name + ' was not found');
      } else {
        res.status(200).send(req.params.name + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// error-handling middleware function that will log all application-level errors to the terminal
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Oops, something went wrong!");
});

// requests listner
app.listen(8080, () => {
  console.log("My Movie app is listening on port 8080");
});
