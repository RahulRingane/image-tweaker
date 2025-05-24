import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },

    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb (null, true);
        } else {
            cb (new Error("Invalid file type"));
        }
    },
})

export default upload;