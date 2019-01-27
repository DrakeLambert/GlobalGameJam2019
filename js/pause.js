class Pause {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = 30;
		this.isPaused = false;
		onMouseClicked.subscribe(this.onMouseClicked.bind(this));
		onDraw.subscribe(this.draw.bind(this));
	}

	onMouseClicked() {
		if (this.containsPoint(mouseX, mouseY)) {
			this.isPaused = !this.isPaused;
			if (this.isPaused) {
				noLoop();
			} else {
				loop();
			}
		}
	}

	containsPoint(x, y) {
		return x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size;
	}

	draw() {
		push();
		if (this.isPaused) {
			fill('orange');
		} else {
			fill('green');
		}
		rect(this.x, this.y, this.size, this.size);
		pop();
	}
}
