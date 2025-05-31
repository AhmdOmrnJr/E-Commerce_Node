import multer from 'multer'

export const allowedExtensions = {
    image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
    file: ['application/pdf', 'application/msword'],
    video: ['video/mp4']
}
export function fileUpload({ customValidation = allowedExtensions.image } = {}) {
    const storage = multer.diskStorage({});
    function fileFilter(req, file, cb) {
        console.log('Incoming file:', file); // Log the file object
        if (!customValidation.includes(file.mimetype)) {
            console.log('Rejected file. MIME type:', file.mimetype);
            return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
    }
    return multer({ storage, fileFilter });
}