/*
* @author Stefano Ballerini
*
* Inspired by Daniel Shiffman - Animated Circle Packing - "The Coding Train"
* youtube: https://www.youtube.com/watch?v=ERQcYaaZ6F0
*/

var totalCircles = 300;
var circles = [];

var img;

var spots = [];

function preload(){
  img = loadImage("img/apple.jpg"); 
}

function setup() {
	createCanvas(img.width, img.height);
	img.loadPixels();

	for(var i = 0; i < img.width; i++){
		for(var j = 0; j < img.height; j++){
			spots.push(createVector(i, j));
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
						if (d - 1 < circles[i].r + circles[j].r){
							circles[i].growing = false;
							break;
						}
					}
				}
			}
		}
		circles[i].showColor();
		circles[i].grow();
	}	
}

function newCircle(){

	var spot = Math.floor(random(0, spots.length));

	var x = spots[spot].x;
	var y = spots[spot].y;

	// Don't pick the same spot twice
	spots.splice(spot, 1);


	var valid = true;

	for (var i = 0; i < circles.length; i++) {
		var d = dist(x, y, circles[i].x, circles[i].y)
		if(d < circles[i].r){
			valid = false;
			break;
		}
	}

	if(valid){
		var index = (x + y * width)*4;
		index = index - index%4;
		var color = img.pixels.slice(index, index+4);
		var newCi = new Circle(x, y);
		newCi.color = color;

		return newCi;	
	}
	else
		return null;

}






