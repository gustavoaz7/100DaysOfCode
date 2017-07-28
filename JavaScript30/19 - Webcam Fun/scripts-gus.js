const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
// Creating logical tags to turn effects on/off 
var redLogic = false, displaceLogic = false, greenBackLogic = false;

function getVideo () {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false})
		.then(localMediaStream => {
			video.src = window.URL.createObjectURL(localMediaStream);
			video.play();
		})
		.catch(err => {console.error('Error', err)});
}

function paintToCanvas () {
	// Setting canvas dimensions according to video dimensions
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	setInterval(() => {
		// Adding a frame(image) to the canvas every 24ms
		ctx.drawImage(video, 0, 0, width, height);
		// Storing image data to add effects
		var pixels = ctx.getImageData(0, 0, width, height);

		pixels = redEffect(pixels);
		pixels = displaceRGB(pixels);
		pixels = greenBackground(pixels);

		ctx.putImageData(pixels, 0, 0);

	}, 24)
}

function takePhoto() {
	// Playing the audio
	snap.currentTime = 0;
	snap.play();

		// Importing data from canvas:
	// Creating raw data URL
	const data = canvas.toDataURL('image/png');
	// Creating a link and setting it to that URL
	const link = document.createElement('a');
	link.href = data;
	// Setting it to be downloaded
	link.setAttribute('download', 'webcamPic');
	// Displaying this link as an image
	link.innerHTML = `<img src="${data}" alt="webcamPic" />`
	// Placing the link into its respective area as the first element in it
	strip.insertBefore(link, strip.firstChild);
}


// Effects

function redEffect(pixels) {
	if (!redLogic) {return pixels};

	// i+4 -> r, g, b, a (opacity)
	for (var i=0; i<pixels.data.length; i += 4) {
		pixels.data[i+0] = pixels.data[i+0] + 150; // RED
		pixels.data[i+1] = pixels.data[i+1] - 50; // GREEN
		pixels.data[i+2] = pixels.data[i+2] - 150; // BLUE
	}
	return pixels;
}

function displaceRGB(pixels) {
	if (!displaceLogic) {return pixels};

	// i+4 -> r, g, b, a (opacity)
	for(var i = 0; i < pixels.data.length; i+=4) {
	    pixels.data[i-150] = pixels.data[i+0]; // RED
	    pixels.data[i+300] = pixels.data[i+1]; // GREEN
	    pixels.data[i-350] = pixels.data[i+2]; // Blue
    }
	return pixels;
}

function greenBackground(pixels) {
	if (!greenBackLogic) {return pixels};

	const lev = {};

	document.querySelectorAll('.rgb input').forEach((input) => {lev[input.name] = input.value});
	
	for(var i = 0; i < pixels.data.length; i+=4) {
		red = pixels.data[i+0];
		green = pixels.data[i+1];
		blue = pixels.data[i+2];
		alpha = pixels.data[i+3];

		if (red >= lev.rmin && red <= lev.rmax &&
			blue >= lev.bmin && blue <= lev.bmax &&
			green >= lev.gmin && green <= lev.gmax) {
			pixels.data[i+3] = 0;
		}
	}
return pixels;
}


getVideo();

video.addEventListener('canplay', paintToCanvas);