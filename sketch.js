/*
* @author Stefano Ballerini
*
* Inspired on Daniel Shiffman - Animated Circle Packing - "The Coding Train"
* youtube: https://www.youtube.com/watch?v=QHEQuoIKgNE&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=62
*/

var totalCircles = 20;
var circles = [];

var spots = [];

var img;

function preload(){
  img = loadImage("img/t.png");
}

function setup() {
	createCanvas(img.width, img.height);
	img.loadPixels();

	for(var i = 0; i < img.width; i++){
		for(var j = 0; j < img.height; j++){
			var loc = (i + j * width)*4;
			var brightness = img.pixels[loc];
			if(brightness > 1){
				spots.push(createVector(i, j));
			} 
		}
	}

}

function draw(){

	if (spots.length <= totalCircles)
		noLoop();
	
	background(255);

	var count = 0;
	
	while(count < totalCircles){

		var newC = newCircle();

		if (newC != null){
			circles.push(newC);
			count++; 
		}

	}

	for (var i in circles) {
		if(circles[i].growing){
			if(circles[i].edges()){
				circles[i].growing = false;
			}else{
				for (var j in circles){
					if(i != j){
						var d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
						if (d - 2 < circles[i].r + circles[j].r){
							circles[i].growing = false;
							break;
						}
					}
				}
			}
		}
		circles[i].show();
		circles[i].grow();
	}
}

function newCircle(){

	var spot = Math.floor(random(0, spots.length));

	if(spots.length < totalCircles)
		return null;

	var x = spots[spot].x;
	var y = spots[spot].y;

	// Don't pick the same spot twice
	spots.splice(spot, 1);

	var valid = true;

	for (var i = 0; i < circles.length; i++) {
		var d = dist(x, y, circles[i].x, circles[i].y)
		if(d < circles[i].r + 2){
			valid = false;
			break;
		}
	}

	if(valid)
		return new Circle(x, y);
	else
		return null;

}






