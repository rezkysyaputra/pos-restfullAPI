import logger from './app/logger';
import web from './app/web';

const port: number = 3000;
web.listen(port, () => {
  logger.info(`App running in Port: ${port}`);
});
