
/*		var img = new Image();
		img.src = 'fry.jpg';
		img.onload = function() {
		  draw(this);
		};

		function draw(img) {
		  var canvas = document.getElementById('canvas');
		  var ctx = canvas.getContext('2d');
		  ctx.drawImage(img, 0, 0);
		  img.style.display = 'none';
		  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		  var data = imageData.data;
		  console.log(data);
		    
		   	  for (var i = 0; i < data.length; i += 4) {
		      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
		      data[i]     = avg; // red
		      data[i + 1] = avg; // green
		      data[i + 2] = avg; // blue
		    }
		    ctx.putImageData(imageData, 0, 0);

		  var invert = function() {
		    for (var i = 0; i < data.length; i += 4) {
		      data[i]     = 255 - data[i];     // red
		      data[i + 1] = 255 - data[i + 1]; // green
		      data[i + 2] = 255 - data[i + 2]; // blue
		    }
		    ctx.putImageData(imageData, 0, 0);
		  };

		  var grayscale = function() {
		    for (var i = 0; i < data.length; i += 4) {
		      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
		      data[i]     = avg; // red
		      data[i + 1] = avg; // green
		      data[i + 2] = avg; // blue
		    }
		    ctx.putImageData(imageData, 0, 0);
		  };

		  var invertbtn = document.getElementById('invertbtn');
		  invertbtn.addEventListener('click', invert);
		  var grayscalebtn = document.getElementById('grayscalebtn');
		  grayscalebtn.addEventListener('click', grayscale);
		}
*/

function textChangeListener (evt) {
  var id = evt.target.id;
  var text = evt.target.value;
      
  if (id == "topLineText") {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }
      
  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}
    
function redrawMeme(image, topLine, bottomLine) {
  // Get Canvas2DContext
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext("2d");

  // Your code here
  if (image != null) {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

    // Meme text's specifications.
    ctx.font = "36pt Impact";
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 3;

    // Top text.
    if (topLine != null) {
      ctx.fillText(topLine, canvas.width / 2, 60);
      ctx.strokeText(topLine, canvas.width / 2, 60);
    }

    // Bottom text.
    if (bottomLine != null) {
      ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 40);
      ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 40);
    }
}
    
function saveFile() {
  window.open(document.querySelector('canvas').toDataURL());
}
    

function handleFileSelect(evt) {
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
      redrawMeme(window.imageSrc, null, null);
    }
        
    // Set image data to background image.
    image.src = data;
    console.log(fileObject.target.result);
  };
  reader.readAsDataURL(file)
}
    
window.topLineText = " ";
window.bottomLineText = " ";
var input1 = document.getElementById('topLineText');
var input2 = document.getElementById('bottomLineText');
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
document.getElementById('file').addEventListener('change', handleFileSelect, false);
document.querySelector('button').addEventListener('click', saveFile, false);