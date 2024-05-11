import cors from 'cors';
import express from 'express';
import publicRouter from '../route/public-api.js';
import errorMiddleware from '../middleware/error-middleware.js';
import privateRoute from '../route/api.js';

const web = express();

web.use(express.json());
web.use(cors());

web.use(publicRouter);
web.use(privateRoute);

web.use(errorMiddleware);

export default web;
