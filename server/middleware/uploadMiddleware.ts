import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000}, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Images only!'));
    }
}

export {upload};