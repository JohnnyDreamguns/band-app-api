var express = require('express');
var url = require('url');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

const chunkArray = (myArray, chunk_size) => {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
};

const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item
    return obj
  }, {});

const bandData = [
  {
    id: 1,
    name: 'The Plague Doctors',
    bio: 'Wrong pop for the 21st Century',
    formed: '2007',
    albums: [1]
  },
  {
    id: 2,
    name: 'Duty Now',
    bio: 'Angry paranoid post rock',
    formed: '2004',
    albums: [2]
  },
  {
    id: 3,
    name: 'The Thinman Project',
    bio: 'Italo rock band',
    formed: '2008',
    albums: [4]
  },
  {
    id: 4,
    name: 'Kingfishers Catch Fire',
    bio: 'Majestic Pop',
    formed: '2007',
    albums: [3]
  },
  {
    id: 5,
    name: 'Politburo',
    bio: 'Post punk',
    formed: '2000',
    albums: [5,6]
  },
  {
    id: 6,
    name: 'Billy Ruffian',
    bio: 'Political pop',
    formed: '2005',
    albums: [7]
  },
  {
    id: 7,
    name: 'Nick Alexander',
    bio: 'Psych pop',
    formed: '2010',
    albums: [8]
  }
];

const albumData = [
  {
    id: 1,
    name: 'On The Moon',
    released: '2014',
    band: 1
  },
  {
    id: 2,
    name: 'Demo EP',
    released: '2005',
    band: 2
  },
  {
    id: 3,
    name: 'Demons and Monsters',
    released: '2010',
    band: 4
  },
  {
    id: 4,
    name: 'The SackMask Man',
    released: '2010',
    band: 3
  },
  {
    id: 5,
    name: 'Sally Came to See',
    released: '2013',
    band: 5
  },
  {
    id: 6,
    name: 'Barrington Way',
    released: '2016',
    band: 5
  },
  {
    id: 7,
    name: 'Music vs Money',
    released: '2011',
    band: 6
  },
  {
    id: 8,
    name: 'Saturn Mansions',
    released: '2019',
    band: 7
  }
];

app.get('/bands', (req, res, next) => {
  var url_parts = url.parse(req.url, true);
  const pageNum = url_parts.query.page || 1;
  const all = url_parts.query.all || false;

  const results = all ? bandData : chunkArray(bandData, 3)[pageNum - 1];

  const resultsObj = arrayToObject(results);

  res.json({ results: resultsObj, totalResults: bandData.length });
});

app.get('/bands/:bandId', (req, res, next) => {
  const bandId = req.params.bandId;
  let results = bandData.filter(band => { return band.id === parseInt(bandId); });

  const resultsObj = arrayToObject(results);

  //res.status(404).json({ error: 'This is test' });

  res.json({ results: resultsObj });
});

app.get('/bands/:bandId/albums', (req, res, next) => {
  const bandId = req.params.bandId;
  let results = albumData.filter(album => { return album.band === parseInt(bandId); });

  const resultsObj = arrayToObject(results);

  res.json({ results: resultsObj });
});

app.get('/albums', (req, res, next) => {
  var url_parts = url.parse(req.url, true);
  const pageNum = url_parts.query.page || 1;
  const all = url_parts.query.all || false;

  const results = all ? albumData : chunkArray(albumData, 3)[pageNum - 1];

  const resultsObj = arrayToObject(results);

  res.json({ results: resultsObj, totalResults: albumData.length });
});

app.get('/albums/:albumId', (req, res, next) => {
  const albumId = req.params.albumId;
  let results = albumData.filter(album => { return album.id === parseInt(albumId); });

  const resultsObj = arrayToObject(results);

  res.json({ results: resultsObj });
});
