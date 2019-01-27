class Background {
    constructor(number) {
        this.number = number;
        this.stars1 = [];
        this.stars2 = [];
        this.stars3 = [];
        this.angle = 0;
        
        onDraw.subscribe(this.draw.bind(this));

        background('black');
        for (let i=0; i < 334; i++) {

            this.stars1[i] = {x:Math.random()*(windowWidth+100)-50, y:Math.random()*(windowHeight+100)-50};
            this.stars2[i] = {x:Math.random()*(windowWidth+100)-50, y:Math.random()*(windowHeight+100)-50};
            this.stars3[i] = {x:Math.random()*(windowWidth+100)-50, y:Math.random()*(windowHeight+100)-50};
        }
    }

    draw() {
        push();
        background('black');
        if (this.angle >= 2 * PI) this.angle = 0;
        else this.angle += .005;
		this.x = cos(this.angle);
        this.y = sin(this.angle);
        for (let i=0; i < 334; i++) {
            circle(this.stars1[i].x-((mouseX*1)/80)*this.x, this.stars1[i].y-((mouseY*1)/80)*this.y,1);
            circle(this.stars2[i].x-((mouseX*2)/80)*this.x, this.stars2[i].y-((mouseY*2)/80)*this.y,1.5);
            circle(this.stars3[i].x-((mouseX*3)/80)*this.x, this.stars3[i].y-((mouseY*3)/80)*this.y,2);
        }
        pop();
    }
}