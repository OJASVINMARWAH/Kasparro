const express =
    require('express');

const router =
    express.Router();

const multer =
    require('multer');

const {
    detectVision
} = require(
    '../controllers/visionController'
);

const storage =
  multer.diskStorage({

    destination:
      (
        req,
        file,
        cb
      ) => {

        cb(
          null,
          'uploads/'
        );
      },

    filename:
      (
        req,
        file,
        cb
      ) => {

        const ext =
          file.originalname
            .split('.')
            .pop();

        cb(

          null,

          `${Date.now()}.${ext}`
        );
      }
  });

const upload =
  multer({
    storage
  });
router.post(
    '/detect',
    upload.single('frame'),
    detectVision
);

module.exports =
    router;