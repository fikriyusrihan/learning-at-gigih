import express from "express";
import {
    handleCreatePlaylist, handleDeletePlaylistById,
    handleGetPlaylistById,
    handleGetPlaylists, handleUpdatePlaylistById
} from "../../controllers/playlist.controller.js";
import {handleAddSong, handleDeleteSong, handlePlaySong} from "../../controllers/playlist-songs.controller.js";

const router = express.Router();

router
    .route('/')
    .get(handleGetPlaylists)
    .post(handleCreatePlaylist)

router
    .route('/:playlistId')
    .get(handleGetPlaylistById)
    .put(handleUpdatePlaylistById)
    .delete(handleDeletePlaylistById)

router
    .route('/:playlistId/songs')
    .post(handleAddSong)

router
    .route('/:playlistId/songs/:songId')
    .delete(handleDeleteSong)

router
    .route('/:playlistId/songs/:songId/play')
    .put(handlePlaySong)

export default router;