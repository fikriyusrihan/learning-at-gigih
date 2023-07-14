import {getPlaylistById, updatePlaylistById} from "../services/playlist.service.js";
import httpStatus from "http-status";
import {v4 as uuidv4} from 'uuid';

const handleAddSong = async (req, res) => {
    try {
        const playlist = getPlaylistById(req.params.playlistId);
        const song = req.body;
        song.id = uuidv4();
        song.count = 0;
        playlist.songs.push(song);

        const data = updatePlaylistById(req.params.playlistId, playlist);
        res
            .status(httpStatus.CREATED)
            .json({
                status: 'success',
                message: 'Song added successfully into playlist',
                data,
            });
    } catch (e) {
        res
            .status(e.statusCode)
            .json({
                status: 'failed',
                message: e.message,
            });
    }
}

const handleDeleteSong = async (req, res) => {
    try {
        const playlist = getPlaylistById(req.params.playlistId);
        const songId = req.params.songId;
        const songIndex = playlist.songs.findIndex(song => song.id === songId);

        if (songIndex === -1) {
            res
                .status(httpStatus.NOT_FOUND)
                .json({
                    status: 'failed',
                    message: 'Song not found in playlist',
                });
            return;
        }

        playlist.songs.splice(songIndex, 1);

        const data = updatePlaylistById(req.params.playlistId, playlist);
        res
            .status(httpStatus.OK)
            .json({
                status: 'success',
                message: 'Song deleted successfully from playlist',
                data,
            });
    } catch (e) {
        res
            .status(e.statusCode)
            .json({
                status: 'failed',
                message: e.message,
            });
    }
}

const handlePlaySong = async (req, res) => {
    try {
        const playlist = getPlaylistById(req.params.playlistId);
        const songId = req.params.songId;
        const songIndex = playlist.songs.findIndex(song => song.id === songId);

        if (songIndex === -1) {
            res
                .status(httpStatus.NOT_FOUND)
                .json({
                    status: 'failed',
                    message: 'The requested song is not found in playlist',
                });
            return;
        }

        const data = playlist.songs[songIndex];
        data.count = data.count + 1;
        playlist.songs[songIndex] = data;

        updatePlaylistById(req.params.playlistId, playlist);

        res
            .status(httpStatus.OK)
            .json({
                status: 'success',
                message: 'Song played successfully',
                data,
            });
    } catch (e) {
        res
            .status(e.statusCode)
            .json({
                status: 'failed',
                message: e.message,
            });
    }
}

export {
    handleAddSong,
    handleDeleteSong,
    handlePlaySong,
}