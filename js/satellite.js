class Satellite {
	constructor(owner, planet) {
		this.owner = owner;
		this.planet = planet;
		this.angle = Math.random() * 2 * PI;
		this.speed = Math.random() * .01;
		this.laserWidth = 0;
		this.laserTarget;

		this.img = satelliteIMG[Math.floor(Math.random()*2)];
		
		onDraw.subscribe(this.draw.bind(this));
	}

	changeOwner(newOwner) {
		this.owner = newOwner;
	}

	shoot(shuttle) {
		this.laserWidth = 10;
		this.laserTarget = shuttle;
	}

	draw() {
		this.angle += .005 + this.speed;
		if (this.angle >= 2 * PI) this.angle = 0;
		this.x = cos(this.angle) * 34 + this.planet.x;
		this.y = sin(this.angle) * 34 + this.planet.y;

		if (this.laserWidth !== 0) {
			push();
			stroke(255,0,0,200);
			strokeWeight(this.laserWidth);
			this.laserWidth--;
			line(this.x, this.y, this.laserTarget.x, this.laserTarget.y);
			stroke(255);
			strokeWeight(3);
			line(this.x, this.y, this.laserTarget.x, this.laserTarget.y);
			pop();
		}

		push();
		imageMode(CENTER);
		translate(this.x,this.y);
		rotate(this.angle);
		image(this.img,0,0,12,12);
		pop();
	}

	drawLaser() {

	}
}
