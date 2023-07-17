const db = connect('mongodb://localhost:27017/gigih');

const popularSongs = [
  {
    "title": "Shape of You",
    "playCount": 1000000000,
    "period": "2017-2022"
  },
  {
    "title": "Uptown Funk",
    "playCount": 850000000,
    "period": "2014-2018"
  },
  {
    "title": "Despacito",
    "playCount": 800000000,
    "period": "2017-2021"
  },
  {
    "title": "See You Again",
    "playCount": 750000000,
    "period": "2015-2019"
  },
  {
    "title": "Closer",
    "playCount": 700000000,
    "period": "2016-2020"
  },
  {
    "title": "Thinking Out Loud",
    "playCount": 650000000,
    "period": "2014-2019"
  },
  {
    "title": "Sorry",
    "playCount": 600000000,
    "period": "2015-2018"
  },
  {
    "title": "Havana",
    "playCount": 550000000,
    "period": "2017-2020"
  },
  {
    "title": "Someone Like You",
    "playCount": 500000000,
    "period": "2011-2015"
  },
  {
    "title": "Bad Guy",
    "playCount": 450000000,
    "period": "2019-2022"
  }
]

db.popularSongs.insertMany(popularSongs);