import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

// `cb` stands for "callback." 
// It is a function provided by Multer that you call to pass the result back to Multer after performing your logic. 
// It is used to define the behavior for destination and filename functions.
// `cb` ensures that Multer waits for the callback before proceeding

export const upload = multer({ 
    storage, 
})