const express = require('express');
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const { createCanvas, Image } = require('canvas');
const fs = require('fs');
const app = express();
const upload = multer({ dest: 'uploads/' });

let model;

app.post('/test', upload.single('video'), async (req, res) => {
    // Load the model
    if (!model) {
        model = await tf.loadGraphModel('./model.json');
    }
  
    // Open the video file
    const video = fs.readFileSync(req.file.path);
    const image = new Image();
    image.src = video;

    // Prepare a canvas to draw frames
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Draw the video to the canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Prepare the image tensor
    let img = tf.browser.fromPixels(canvas);
    img = img.expandDims(0);

    // Detect objects in the frame
    const result = model.execute(img);
  
    // Send the results back to the client
    res.json(result);
});

app.listen(3000, () => console.log('Listening on port 3000'));
