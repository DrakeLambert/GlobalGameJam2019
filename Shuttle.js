class Shuttle {
	constructor(owner, destination, x, y) {
		/**@type {Player} */
		this.owner = owner;
		/**@type {Planet} */
		this.destination = destination;
		/**@type {Number} */
		this.x = x;
		/**@type {Number} */
		this.y = y;
		/**@type {Number} */
		this.maxVelocity = 3;
		/**@type {Number} */
		this.velocity = 0;
		/**@type {Number} */
		this.acceleration = 0.04;

		this.draw = onDraw.subscribe(this.onDraw.bind(this));
	}
	updatePosition() {
		if (this.velocity < this.maxVelocity) {
			this.velocity += this.acceleration;
		}
		let slope = atan((this.destination.y - this.y) / (this.destination.x - this.x));
		let dX = cos(slope) * this.velocity;
		let dY = sin(slope) * this.velocity;
		if (this.x > this.destination.x) {
			dX *= -1;
			dY *= -1;
		}
		this.x += dX;
		this.y += dY;
	}

	hasArrived() {
		return dist(this.x, this.y, this.destination.x, this.destination.y) < this.destination.diameter / 2;
	}

	onDraw() {
		if (this.hasArrived()) {
			onDraw.unsubscribe(this.draw);
			this.destination.receiveShuttle(this);
		}
		this.updatePosition();
		push();
		fill(this.owner.color);
		stroke('black');
		strokeWeight(1);
		ellipse(this.x, this.y, 10, 10);
		pop();
	}
}
