import logger from './app/logger.js';
import web from './app/web.js';

const port: number = 3000;
web.listen(port, () => {
  logger.info(`App running in Port: ${port}`);
});
