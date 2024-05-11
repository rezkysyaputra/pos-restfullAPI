import multer from 'multer';
import ResponseError from '../error/response-error.js';

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/image');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const filter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ResponseError(400, 'file format must be a png, jpg or jpeg'), false);
  }
};

const fileUploadMiddleware = multer({
  storage: fileStorage,
  fileFilter: filter,
}).single('image');

export default fileUploadMiddleware;
