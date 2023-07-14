import Playlist from "../models/playlist.model.js";
import NotFoundError from "../utils/errors.utils.js";

const createPlaylist = (body) => {
    return Playlist.createPlaylist(body);
}

const getAllPlaylists = () => {
    return Playlist.getAllPlaylists();
}

const getPlaylistById = (id) => {
    const playlist = Playlist.getPlaylistById(id);
    if (!playlist) {
        throw new NotFoundError('The requested playlist was not found.');
    }

    return playlist;
}

const updatePlaylistById = (id, body) => {
    const playlist = Playlist.getPlaylistById(id);
    if (!playlist) {
        throw new NotFoundError('The requested playlist was not found.');
    }

    return Playlist.updatePlaylistById(id, body);
}

const deletePlaylistById = (id) => {
    const playlist = Playlist.getPlaylistById(id);
    if (!playlist) {
        throw new NotFoundError('The requested playlist was not found.');
    }

    Playlist.deletePlaylistById(id);
}

export {
    createPlaylist,
    getAllPlaylists,
    getPlaylistById,
    updatePlaylistById,
    deletePlaylistById,
};