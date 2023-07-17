import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Spotify Playlist - Documentation',
      version: '1.0.0',
      description: 'Spotify Playlist is a simple REST API to manage your playlists and songs.',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/v1',
      },
    ],
  },
  apis: [
    './src/models/*.js',
    './src/routes/v1/*.route.js',
  ],
};

export default swaggerJsdoc(options);
