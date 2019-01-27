class Explosion {
    constructor(shuttle, input) {
        this.shuttle = shuttle;
        this.input = input;
        this.frameX = 0;
        this.frameY = 0;
        this.scale = 1;
        this.reverse = 1;

        onDraw.subscribe(this.draw.bind(this));
    }

    draw() {
        push();
        imageMode(CENTER);
        if (!this.input) {
            image(explosion,this.shuttle.x,this.shuttle.y,15,15,(this.frameX * 64), (this.frameY * 66), 60, 66);
            if (++this.frameX % 8 === 0 && this.frameY < 3) {
                this.frameX = 0;
                this.frameY++;
            }
        } else if(this.frameX++ < 32) {
            translate(this.shuttle.x,this.shuttle.y);
            if (this.scale >= 2) {
                this.reverse = -1;
            } //else {this.reverse = -1;}
            scale(this.scale+= (.1*this.reverse));
            image(plus,0,0,12,12);
        }
        pop();
    }
}