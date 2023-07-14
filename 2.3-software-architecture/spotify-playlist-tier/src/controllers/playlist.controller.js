import httpStatus from "http-status";
import {
    createPlaylist,
    deletePlaylistById,
    getAllPlaylists,
    getPlaylistById,
    updatePlaylistById
} from "../services/playlist.service.js";

const handleCreatePlaylist = async (req, res) => {
    const response = createPlaylist(req.body);

    res
        .status(httpStatus.CREATED)
        .json({
            status: 'success',
            message: 'Playlist created successfully',
            data: response,
        });
}

const handleGetPlaylists = async (req, res) => {
    const data = getAllPlaylists();

    res
        .status(httpStatus.OK)
        .json({
            status: 'success',
            message: 'Playlists retrieved successfully',
            data,
        });
}

const handleGetPlaylistById = async (req, res) => {
    try {
        const data = getPlaylistById(req.params.playlistId);
        res
            .status(httpStatus.OK)
            .json({
                status: 'success',
                message: 'Playlist retrieved successfully',
                data,
            });
    } catch (e) {
        console.log(e);
        res
            .status(e.statusCode)
            .json({
                status: 'failed',
                message: e.message,
            });
    }
}

const handleUpdatePlaylistById = async (req, res) => {
    try {
        const data = updatePlaylistById(req.params.playlistId, req.body);

        res
            .status(httpStatus.OK)
            .json({
                status: 'success',
                message: 'Playlist updated successfully',
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

const handleDeletePlaylistById = async (req, res) => {
    try {
        deletePlaylistById(req.params.playlistId);

        res
            .status(httpStatus.OK)
            .json({
                status: 'success',
                message: 'Playlist deleted successfully',
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
    handleCreatePlaylist,
    handleGetPlaylists,
    handleGetPlaylistById,
    handleUpdatePlaylistById,
    handleDeletePlaylistById,
};