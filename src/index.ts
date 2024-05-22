import logger from './app/logger';
import web from './app/web';

const port = process.env.PORT;
web.listen(port, () => {
  logger.info(`App running in Port: ${port}`);
});
