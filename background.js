class Background {
    constructor(number) {
        this.number = number;
        this.stars = [];
        for (let x=0; x < this.number; x++) {
            this.stars[x] = new Stars(Math.random()*(windowWidth+100), Math.random()*(windowHeight+100), Math.random()*3);
        }
        this.angle = 0;
    }

    setStars() {
        background('black');
        color('white');

        this.angle += .05;
		if (this.angle >= 2 * PI) this.angle = 0;
		this.x = cos(this.angle)/20;
		this.y = sin(this.angle)/20;
        
        this.stars.forEach(s => s.draw(mouseX,mouseY,this.x,this.y));
    }
}

class Stars {
    constructor(x,y,s) {
        this.x = x;
        this.y = y;
        this.s = s;
    }

    draw(xOff,yOff,pX,pY) {
        color('white');
        this.x += pX;
        this.y += pY;
        circle((this.x)-((xOff*this.s)/80), this.y-((yOff*this.s)/80), this.s);
    }

}