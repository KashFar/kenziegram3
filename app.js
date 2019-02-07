const express = require('express')
const multer = require("multer"); //does the file uploading
const pug = require('pug')

const path = './public' //changed from original kenziegram
//could make a new upload path variable and use below and on line 41
const upload = multer({ dest: path + `/uploads` 
  }).single('image');  // this needs to match index.pug input( type= file name='')
const port = process.envPORT || 3000;
const app = express()

// setup pug
app.set('view engine', 'pug')

const fs = require('fs'); // need this
// can use next to tell express we're done with this and you can pass it to the next function.
// middleware is just js functions between sending and receiving responses. 

app.use(express.static(path))

//new Template engine version
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('upload-confirmation', {
        msg: err
      })
    } else {
      res.render('upload-confirmation', {
        title: "Upload Confirmation",
        msg: 'File Uploaded Successfully!',
        file: `uploads/${req.file.filename}`
      })
    }
  })
})

//new Template engine version
app.get('/', (req, res) => {
  //fs.readdir is asynchronous
  fs.readdir(`./public/uploads`, function (err, images) {
    //items in an array of all of the image names
    // for (let i = 0; i < items.length; i++) {
    //   feed += `<img src = ${items[i]} height = 150px><br />`;
    // }
    res.render('index', {
      title: "Kenziegram",
      h1: "welcome to Kenziegram",
      images: images
    })
  })
})

// app.get("/", function (req, res) {
//   let feed = ``;
//   fs.readdir(path, function (err, items) {
//     console.log(items);
//     for (let i = 0; i < items.length; i++) {
//       feed += `<img src = ${items[i]} height = 150px><br />`;
//     }
//     res.send(
//       `<h1>Welcome to Kenziegram!</h1>
//         <form action = "/upload" method = "POST" enctype ="multipart/form-data">
//           <input type = 'file' name = 'image' />  
//           <input type = 'submit' />
//           </form>
//           ${feed}
//           `
//       // could also do it with arrays and .push instead of feed. would have to 
//       // use array.join at the end to combine them
//     );
//   })
// })

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
