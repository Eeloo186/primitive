const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { afterUploadImage, uploadPost, testMiddle } = require('../controllers/post');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 1 * 1024 * 1024 },
});

// POST /post/img
// 나중에 UUID로 파일 이름 암호화 추가
// 에러 메세지 추가;
router.post('/img', upload.any(), afterUploadImage);
// router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);
// router.post('/img', upload.array('image/jpeg'), afterUploadImage)


// POST /post
const upload2 = multer();
// router.post('/', isLoggedIn, upload2.none(), uploadPost);
router.post('/', upload2.none(), uploadPost);


module.exports = router;
