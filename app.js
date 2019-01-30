const express = require('express')
const multer = require("multer"); //does the file uploading

const path = './public/uploads'
const upload = multer({dest: path})
const port = process.envPORT || 3000;
const app = express()
const fs = require('fs'); // need this

// can use next to tell express we're done with this and you can pass it to the next function.
// middleware is just js functions between sending and receiving responses. 

app.use(express.static(path))
// app.use(express.json()) is used only with response of json. 
// fetch and sent a request to send JSON.
// now we are using the form tag that does the request in correct type already

// what do i need to do to form a response. Send back another HTML page.
// have chrome load a new page. UPLOAD SUCCESSFUL and show the image and a back button.
// title like upload successful and 
// title -Upload successful
//<img src = "${req.file.filename}"/>
// <a href = "/>Back</a>"
// a tags lets things be clickable

app.post('/upload', upload.single('image'), (req, res) => {
  console.log("Uploaded: " + req.file.filename)
    res.send(`
    <h1> Title - Upload successful </h1>
    <a href = "/"><button>Back</button></a><br />
    <img src = ${req.file.filename} height = 300px />
    `
    )
})
// need to create form to upload an image
//    write a <form> tag using template literals.
//     form attributes: action= "/upload", method = "POST" <- default is get.
//     enctype= "text/plain" ="multipart/form-data" ="x-www-urlencoded"

// anything thats not a node module we don't need to do npm install. For fr.readdir
// we need to get all the filenames in the uploads directory. 
// for each filename, create and `<img src="">` <-backtick characters string to upload the images.
/// fr readdir returns and array of all the filenames in that directory
// `<img src = "/uploads/${filename}">. also need to display a form to upload an image.

app.get("/", function (req, res) {
  let feed = ``;
  fs.readdir(path, function (err, items) {
    console.log(items);
    for (let i = 0; i < items.length; i ++){
      feed += `<img src = ${items[i]} height = 150px><br />`;
    }
    res.send(
      `<h1>Welcome to Kenziegram!</h1>
        <form action = "/upload" method = "POST" enctype ="multipart/form-data">
          <input type = 'file' name = 'image' />  
          <input type = 'submit' />
          </form>
          ${feed}
          `
          // could also do it with arrays and .push instead of feed. would have to 
          // use array.join at the end to combine them
    );
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
