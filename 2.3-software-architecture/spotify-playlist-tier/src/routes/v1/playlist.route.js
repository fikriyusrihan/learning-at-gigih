import express from 'express';
import PlaylistController from '../../controllers/playlist.controller.js';
import PlaylistService from '../../services/playlist.service.js';

const router = express.Router();
const playlistController = new PlaylistController(PlaylistService);

router
  .route('/')
  .get(playlistController.handleGetPlaylists)
  .post(playlistController.handleCreatePlaylist);

router
  .route('/:playlistId')
  .get(playlistController.handleGetPlaylistById)
  .put(playlistController.handleUpdatePlaylistById)
  .delete(playlistController.handleDeletePlaylistById);

export default router;

/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: Playlist management and retrieval
 */

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Retrieve a list of playlists
 *     tags: [Playlists]
 *     responses:
 *       200:
 *         description: A list of playlists
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
 *                   example: Playlists retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Playlist'
 *
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The playlist name.
 *                 example: Favorites
 *     responses:
 *       201:
 *         description: Playlist created successfully
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
 *                   example: Playlist created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 */

/**
 * @swagger
 * /playlists/{playlistId}:
 *   get:
 *     summary: Retrieve a single playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The playlist id
 *         example: 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *     responses:
 *       200:
 *         description: The playlist with the provided id
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
 *                   example: Playlist retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: The playlist with the provided id was not found
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
 *                   example: The requested playlist was not found
 *   put:
 *     summary: Update a playlist
 *     tags: [Playlists]
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
 *               name:
 *                 type: string
 *                 description: A new name for the playlist.
 *                 example: Favorites
 *                 required: true
 *                 minLength: 1
 *     responses:
 *       200:
 *         description: The playlist was updated successfully
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
 *                   example: Playlist updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: The playlist with the provided id was not found
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
 *                   example: The requested playlist was not found
 *   delete:
 *     summary: Delete a playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The playlist id
 *         example: 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *     responses:
 *       200:
 *         description: The playlist was deleted successfully
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
 *                   example: Playlist deleted successfully
 *       404:
 *         description: The playlist with the provided id was not found
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
 *                   example: The requested playlist was not found
 */
