import cors from 'cors';
import express from 'express';
import publicRouter from '../route/publicApi';
import cookieParser from 'cookie-parser';
import privateRoute from '../route/privateApi';
import { errorMiddleware } from '../middleware/errorMiddleware';

const web = express();

web.use(express.json());
web.use(cors());
web.use(cookieParser());

web.use(publicRouter);
web.use(privateRoute);

web.use(errorMiddleware);

export default web;
