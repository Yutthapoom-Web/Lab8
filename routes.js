const express = require('express');
const router = express.Router();
const controller = require('./Controller');
const multer = require('multer');

// ตั้งค่าที่เก็บรูปภาพ
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', controller.index);
router.get('/add', controller.addPage);
router.post('/add', upload.single('image'), controller.store);
router.get('/delete/:id', controller.delete);

module.exports = router;