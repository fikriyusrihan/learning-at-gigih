import express from 'express';
import PlaylistSongsController from '../../controllers/playlist-songs.controller.js';
import PlaylistService from '../../services/playlist.service.js';

const router = express.Router();
const playlistSongsController = new PlaylistSongsController(PlaylistService);

router
  .route('/')
  .post(playlistSongsController.handleAddSong);

router
  .route('/:songId')
  .delete(playlistSongsController.handleDeleteSong);

router
  .route('/:songId/play')
  .put(playlistSongsController.handlePlaySong);

export default router;

/**
 * @swagger
 * tags:
 *   name: Playlist Songs
 *   description: Playlist songs management and retrieval
 */

/**
 * @swagger
 * /playlists/{playlistId}/songs:
 *   post:
 *     summary: Add a song to a playlist
 *     tags: [Playlist Songs]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The playlist id
 *         example: 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The song title
 *                 example: Viva La Vida
 *               artists:
 *                 type: array
 *                 description: The song artists
 *                 items:
 *                   type: string
 *                   example: Coldplay
 *               url:
 *                 type: string
 *                 description: The song url
 *                 example: https://www.youtube.com/watch?v=dvgZkm1xWPE
 *     responses:
 *       201:
 *         description: The song was added to the playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Song added to playlist successfully
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 message:
 *                   type: string
 *                   example: Invalid request body
 *       404:
 *         description: The playlist was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 message:
 *                   type: string
 *                   example: Playlist not found
 */

/**
 * @swagger
 * /playlists/{playlistId}/songs/{songId}:
 *   delete:
 *     summary: Delete a song from a playlist
 *     tags: [Playlist Songs]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The playlist id
 *         example: 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *       - in: path
 *         name: songId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The song id
 *         example: 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *     responses:
 *       200:
 *         description: The song was deleted from the playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Song deleted from playlist successfully
 *       404:
 *         description: The playlist or song was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 message:
 *                   type: string
 *                   example: Playlist or song not found
 */

/**
 * @swagger
 * /playlists/{playlistId}/songs/{songId}/play:
 *   put:
 *     summary: Play a song from a playlist
 *     tags: [Playlist Songs]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The playlist id
 *         example: 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *       - in: path
 *         name: songId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The song id
 *         example: 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *     responses:
 *       200:
 *         description: The song was played from the playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Song played from playlist successfully
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: The playlist or song was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 message:
 *                   type: string
 *                   example: Playlist or song not found
 */
