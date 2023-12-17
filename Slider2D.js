class Slider2D{
    constructor(skt,x,y,wdth,hght,minX,minY,maxX,maxY,initialValueX,initialValueY){
        
        this.skt = skt;
        this.x = x;
        this.y = y;


        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;

        this.width = wdth;
        this.height = hght;

        this.valueX = initialValueX;
        this.valueY = initialValueY;


        this.dotPosX = this.skt.map(this.valueX,this.minX,this.maxX,this.x,this.x+this.width);
        this.dotPosY = this.skt.map(this.valueY,this.minY,this.maxY,this.y,this.y+this.height);

    }
    
    getValue(){
        return {x: this.valueX, y: this.valueY};
    }
    
    update(){
        if(this.skt.mouseIsPressed){
            if(this.skt.mouseX >= this.x && this.skt.mouseX <= this.x+this.width && this.skt.mouseY >= this.y && this.skt.mouseY <= this.y+this.height){
                this.dotPosX = this.skt.mouseX;
                this.dotPosY = this.skt.mouseY;

                this.valueX = Math.round(this.skt.map(this.dotPosX, this.x, this.x+this.width, this.minX, this.maxX));
                this.valueY = Math.round(this.skt.map(this.dotPosY, this.y, this.y+this.height, this.minY, this.maxY));
            }
        }
    }


    disp(){
        this.update();
        this.skt.stroke(0,0,255);
        this.skt.fill(0,0,150,150);
        this.skt.rect(this.x,this.y,this.width,this.height);
        this.skt.fill(255,150);
        this.skt.stroke(255,200);
        this.skt.line(this.dotPosX,this.y,this.dotPosX,this.y+this.height);
        this.skt.line(this.x,this.dotPosY,this.x+this.width,this.dotPosY);
        this.skt.circle(this.dotPosX,this.dotPosY,10);
        this.skt.textSize(15);
        this.skt.text("("+ this.valueX + "," + this.valueY +")",this.x,this.y+this.height+15);
    }



}