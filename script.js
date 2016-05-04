var handleFileSelect = function(evt) {
  var canvasWidth = 500;
  var canvasHeight = 500;
  var file = evt.target.files[0];
      
  var reader = new FileReader();
  reader.onload = function(fileObject) {
    var data = fileObject.target.result;
        
    // Create an image object
    var image = new Image();
    image.onload = function() {
          
      window.imageSrc = this;
      draw(window.imageSrc);
    }
        
    // Set image data to background image.
    image.src = data;
  };
  reader.readAsDataURL(file)
}
    
var draw = function(img) {
  // Get Canvas2DContext
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext("2d");

  // Check if image exists.
  if (img != null) {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  img.style.display = 'none';
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  // Function that inverts the image.
  var invert = function() {
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = 255 - data[i];     // red
      data[i + 1] = 255 - data[i + 1]; // green
      data[i + 2] = 255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };

  // Function that grayscales the image.
  var grayscale = function() {
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };

  // Listen for a button's event and apply appropriate grayscaling.
  var invertbtn = document.getElementById('invertBtn');
  invertbtn.addEventListener('click', invert);
  var grayscalebtn = document.getElementById('grayscaleBtn');
  grayscalebtn.addEventListener('click', grayscale);

  // Listen for a button's event and save file. 
  var saveFile =function() {
    window.open(document.querySelector('canvas').toDataURL());
  }
  document.querySelector('#saveBtn').addEventListener('click', saveFile, false);
}
   
document.getElementById('file').addEventListener('change', handleFileSelect, false);
