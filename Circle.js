function Circle (x, y) {
    this.x = x;
    this.y = y;
    this.color = [255, 255, 255];
    this.r = 1;

    this.growing = true;
}


Circle.prototype.show = function() {
	
	stroke(48, 123, 108);
	noFill();
	strokeWeight(2);
    ellipse(this.x, this.y, this.r*2, this.r*2);
}

Circle.prototype.showColor = function() {

	noStroke();
	fill(this.color[0], this.color[1], this.color[2]);
    ellipse(this.x, this.y, this.r*2, this.r*2);
}

Circle.prototype.grow = function(){
	if(this.growing == true)
		this.r = this.r + 0.5;
}

Circle.prototype.edges = function(){
	return (this.x+this.r>width || this.x-this.r<0 || this.y+this.r>height || this.y-this.r<0);
}


Circle.prototype.setX = function(x) {
    this.x = x;
}
 
Circle.prototype.getX = function() {
    return this.x;
}

Circle.prototype.setY = function(y) {
    this.y = y;
}

Circle.prototype.getY = function() {
    return this.y;
}

Circle.prototype.setR = function(r) {
    this.r = r;
}

Circle.prototype.getR = function() {
    return this.r;
}

