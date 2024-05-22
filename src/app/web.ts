import cors from 'cors';
import express from 'express';
import publicRouter from '../route/publicApi';
// import privateRoute from '../route/privateApi.js';
import { errorMiddleware } from '../middleware/errorMiddleware';

const web = express();

web.use(express.json());
web.use(cors());

web.use(publicRouter);
// web.use(privateRoute);

web.use(errorMiddleware);

export default web;
