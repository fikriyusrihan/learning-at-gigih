import httpStatus from 'http-status';

export default class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = httpStatus.NOT_FOUND;
  }
}
