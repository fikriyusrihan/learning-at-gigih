import express from 'express';
import httpStatus from "http-status";
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';

const app = express();
const playlists = new Map();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.statusCode = httpStatus.OK;
    res.json({message: 'Hello World!'});
});

app.get('/playlists', (req, res) => {
    const response = Array.from(playlists.values());

    res.statusCode = httpStatus.OK;
    res.json(response);
});

app.post('/playlists', (req, res) => {
    const id = uuidv4();
    const {name} = req.body;

    playlists.set(id, {id, name, songs: []});

    res.statusCode = httpStatus.CREATED;
    res.json({id, name});
});

app.get('/playlists/:id', (req, res) => {
    const id = req.params.id;

    if (playlists.has(id)) {
        const playlist = playlists.get(id);

        res.statusCode = httpStatus.OK;
        res.json(playlist);
    } else {
        res.statusCode = httpStatus.NOT_FOUND;
        res.json({error: 'the requested playlist is not found'});
    }
});

app.post('/playlists/:id/songs', (req, res) => {
    const id = req.params.id;
    const {title, artists, url} = req.body;

    if (playlists.has(id)) {
        const playlist = playlists.get(id);
        const song = {title, artists, url};

        playlist.songs.push(song);
        playlists.set(id, playlist);

        res.statusCode = httpStatus.CREATED;
        res.json(song);
    } else {
        res.statusCode = httpStatus.NOT_FOUND;
        res.json({error: 'the requested playlist is not found'});
    }
});

app.get('/playlists/:id/songs', (req, res) => {
    const id = req.params.id;

    if (playlists.has(id)) {
        const playlist = playlists.get(id);
        const songs = playlist.songs;

        if (songs.length <= 0) {
            res.statusCode = httpStatus.NOT_FOUND;
            res.json({error: 'the requested playlist has no songs'});
        } else {
            const selectedSong = songs[Math.floor(Math.random() * songs.length)];
            res.redirect(selectedSong.url);
        }
    } else {
        res.statusCode = httpStatus.NOT_FOUND;
        res.json({error: 'the requested playlist is not found'});
    }
});

app.listen(3000, () => {
    console.log(`Server is started at http://localhost:3000!`);
});