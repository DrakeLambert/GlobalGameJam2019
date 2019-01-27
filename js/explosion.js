class Explosion {
    constructor(shuttle) {
        this.shuttle = shuttle;
        this.frameX = 0;
        this.frameY = 0;

        onDraw.subscribe(this.draw.bind(this));
    }

    draw() {
        push();
        imageMode(CENTER);
        image(explosion,this.shuttle.x,this.shuttle.y,15,15,(this.frameX * 64), (this.frameY * 66), 60, 66);
        if (++this.frameX % 8 === 0 && this.frameY < 3) {
            this.frameX = 0;
            this.frameY++;
        }
        pop();
    }
}