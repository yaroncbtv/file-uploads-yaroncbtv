const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

const port = 5000;

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="http://127.0.0.1:5500/index.html">Upload another image</a>`);
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});

app.get('/getimage', function (req, res) {
    res.send('GET request to the homepage')
    console.log(storage.filename)
  })
  

app.listen(port, () => console.log(`Server listening on port ${port}!`));