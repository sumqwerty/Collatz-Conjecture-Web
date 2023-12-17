const sketch = (skt) => {
    let appCanvas;
    let render = []
    let limit = 2000;
    let slider;
    let zoom = 1;

    let origin = {
        x: 0,
        y: 0
    };


    skt.setup = () => {
        appCanvas = skt.createCanvas(window.innerWidth-50,window.innerHeight-25);
        appCanvas.parent("canvas-container");
        origin.x = skt.width/2;
        origin.y = (2*skt.height/3);
        slider = new Slider2D(skt,10,10,150,150,0,0,180,180,0,0);

        for(let i=1; i<limit; ++i){
            sublst = []
            
            let n=i;
            do{
                sublst.push(n)
                n = skt.collatzFunc(n);
            
            }while(n!=1);
            sublst.push(1);
            sublst.reverse();
            render.push(sublst);
        }
        skt.frameRate(30);
        
    };

    skt.draw = () =>{
        skt.background(0);
        
        for(let i=0; i<render.length; ++i){
            let tendonLength = 15;
            let seq = render[i];
            skt.push();
            skt.scale(zoom);
            skt.translate(origin.x,origin.y);
            for(let j=0; j<seq.length; ++j){
                let value = seq[j];

                if(value%2==0){
                    skt.rotate(skt.radians(slider.getValue().x));
                }else{
                    skt.rotate(-skt.radians(slider.getValue().y));
                }

                skt.stroke(255,100);

                skt.line(0,0,0,-tendonLength);
                skt.translate(0,-tendonLength);
            }
            skt.pop();
        }
        slider.disp();
    };

    skt.keyPressed = () =>{
        if(skt.key === 'z')zoom+=0.05;
        else if(skt.key === 'x')zoom-=0.05;
        else if(skt.key === 'w')origin.y -= 5;
        else if(skt.key === 's')origin.y += 5;
        else if(skt.key === 'a')origin.x -= 5;
        else if(skt.key === 'd')origin.x += 5;
    }

    skt.collatzFunc = (n)=>{
        if(n%2 == 0){
          return n/2;
        }
        else{
          return (n*3+1)/2;
        }
    };

};



let myp5 = new p5(sketch);