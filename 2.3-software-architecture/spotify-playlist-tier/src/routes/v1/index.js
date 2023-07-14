import express from 'express';
import playlistRoute from './playlist.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/playlists',
    route: playlistRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
