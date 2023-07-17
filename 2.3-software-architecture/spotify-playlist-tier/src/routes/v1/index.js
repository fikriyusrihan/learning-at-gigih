import express from 'express';
import playlistRoute from './playlist.route.js';
import playlistSongRoute from './playlist-song.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/playlists',
    route: playlistRoute,
  },
  {
    path: '/playlists/:playlistId/songs',
    route: playlistSongRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
