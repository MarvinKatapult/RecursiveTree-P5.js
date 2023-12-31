var angleSlider;
var lengthSlider;
var a;
var lengthReduction = 0.75;
var startLength = 150;
var button;
var rainbow = false;
var angleIncrement = 0;

function setup() {
	createCanvas(1000, 700);

	angleSlider = createSlider(0, PI, PI / 4, 0.01);
	lengthSlider = createSlider(0.2, 0.77, lengthReduction, 0.01);

	rainbowButton = createButton('Rainbow - Switch');
	rainbowButton.position(50, height - 50);
	rainbowButton.mousePressed(onRainbowPress);

	frameRate(60);

}

function draw() {

	background(33);
	translate(width/2, height - 50);

	makeBranch(startLength);
	
	lengthReduction = lengthSlider.value();
	
	if (angleIncrement == 0) {
		a = angleSlider.value();		
	} 
	else {
		a += angleIncrement;
	}
}

function makeBranch(len) {

	if (len < 3) {
		return;
	}

	line(0, 0, 0, -len);
	translate(0, -len);

	if (rainbow === true) {
		colorMode(HSB, 255);

		var colorValue = map(len, 3, startLength, 0, 255);
		var c = color(colorValue, 255, 255);
		stroke(c);

	}
	else {
		colorMode(RGB, 255);
		stroke(255);
	}
	
	// Branch1
	push();
		rotate(a);
		makeBranch(len * lengthReduction);
	pop();

	// Branch2
	push();
		rotate(-a);
		makeBranch(len * lengthReduction);
	pop();
	
}

function onRainbowPress() {
	rainbow === true ? rainbow = false : rainbow = true;
	
}

function keyPressed() {
	if (key == 'a') {
		if (angleIncrement == 0) {
			angleIncrement = 0.01;
		}
		else {
			angleIncrement = 0;
		}
	}
}