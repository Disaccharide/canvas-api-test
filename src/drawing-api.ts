

interface Drawable{
    render(context2D : CanvasRenderingContext2D);
}



abstract class DisplayObject implements Drawable{
    parent : DisplayObjectContainer;
    alpha = 1;
    globalAlpha = 1;
    scaleX = 1;
    scaleY = 1;
    x = 0;
    y = 0;
    rotation = 0;
    localMatrix = new math.Matrix();
    globalMatrix = new math.Matrix();
    listeners : TouchEvents[] = [];
    width = 1;
    height = 1;

    draw(context2D : CanvasRenderingContext2D){
        this.localMatrix.updateFromDisplayObject(this.x,this.y,this.scaleX,this.scaleY,this.rotation);
        if(this.parent){
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix,this.parent.globalMatrix);
        }
        if(this.parent == null){
            this.globalAlpha = this.alpha;
            this.globalMatrix = this.localMatrix;
        }
        context2D.globalAlpha = this.globalAlpha;
        context2D.setTransform(this.globalMatrix.a,this.globalMatrix.b,this.globalMatrix.c,this.globalMatrix.d,this.globalMatrix.tx,this.globalMatrix.ty);
        this.render(context2D);
    }

    addEventListener(type : TouchEventsType,touchFunction : Function,object : any,ifCapture? : boolean,priority?: number){
        var touchEvent = new TouchEvents(type,touchFunction,object,ifCapture,priority);
        this.listeners.push(touchEvent);
    }

    abstract render(context2D : CanvasRenderingContext2D)

    abstract hitTest(x : number,y : number):DisplayObject
}

class DisplayObjectContainer extends DisplayObject{
    childArray : DisplayObject[] = [];

    addChild(child : DisplayObject){
        this.childArray.push(child);
        child.parent = this;
    }

    render(context2D : CanvasRenderingContext2D){
        for(let displayObject of this.childArray){
            displayObject.draw(context2D);
        }
    }

    hitTest(x : number,y: number) : DisplayObject{
        var rect = new math.Rectangle();
        rect.x = rect.y = 0;
        rect.width = this.width;
        rect.height = this.height;
        var result = null;
        if(rect.isPointInRectangle(x,y)){
            result = this;
            TouchEventService.getInstance().addPerformer(this);


            for(let i = this.childArray.length - 1;i >= 0;i--){
                var child = this.childArray[i];
                var point = new math.Point(x,y);
                var invertChildenLocalMatirx = math.invertMatrix(child.localMatrix);
                var pointBasedOnChild = math.pointAppendMatrix(point,invertChildenLocalMatirx);
                var hitTestResult = child.hitTest(pointBasedOnChild.x,pointBasedOnChild.y);
                if(hitTestResult){
                    result = hitTestResult;
                    break;
                }
            }
            return result;
        }

        return null;
    }
}

class TestField extends DisplayObject{

    text = "";
    textColor = "#000000";
    size = 18;
    typeFace = "Arial";
    textType = "18px Arial";

    constructor(){
        super();
    }
    


    render(context2D : CanvasRenderingContext2D){
        context2D.fillStyle = this.textColor;
        context2D.font = this.textType;
        context2D.fillText(this.text,0,0 + this.size);
    }

    hitTest(x : number,y :number){
        var rect = new math.Rectangle();
        rect.x = rect.y = 0;
        rect.width = this.size * this.text.length;
        rect.height = this.size;
        if(rect.isPointInRectangle(x,y)){
            TouchEventService.getInstance().addPerformer(this);
            return this;
        }
        else{
            return null;
        }
    }

    setText(text){
        this.text = text;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }

    setTextColor(color){
        this.textColor = color;
    }

    setSize(size){
        this.size = size;
        this.textType = this.size.toString() + "px " + this.typeFace;
    }

    setTypeFace(typeFace){
        this.typeFace = typeFace;
        this.textType = this.size.toString() + "px " + this.typeFace;
    }
}

class Bitmap extends DisplayObject{

    imageID = "";
    image : HTMLImageElement;


    constructor(id : string){
        super();
        this.imageID = id;
        this.image = new Image();
        this.image.src = this.imageID;
        this.image.onload = () =>{
            this.width = this.image.width;
            this.height = this.image.height;
        }
    }

    render(context2D : CanvasRenderingContext2D){
        if(this.image){
            context2D.drawImage(this.image,0,0);
        }
        else{
            this.image.onload = () =>{
                context2D.drawImage(this.image,0,0);
            }
        }
    }

    hitTest(x : number,y :number){
        var rect = new math.Rectangle();
        rect.x = rect.y = 0;
        rect.width = this.image.width;
        rect.height = this.image.height;
        if(rect.isPointInRectangle(x,y)){
            TouchEventService.getInstance().addPerformer(this);
            return this;
        }
        else{
            return null;
        }
    }

    setImage(text){
        this.imageID = text;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }

    

}

class Shape extends DisplayObjectContainer{

    graphics : Graphics = new Graphics();

}

class Graphics extends DisplayObjectContainer{

    fillColor = "#000000";
    alpha = 1;
    globalAlpha = 1;
    strokeColor = "#000000";
    lineWidth = 1;
    lineColor = "#000000";
    

    beginFill(color,alpha){
        this.fillColor = color;
        this.alpha = alpha;
    }

    endFill(){
        this.fillColor = "#000000";
        this.alpha = 1;
    }

    
    drawRect(x1,y1,x2,y2,context2D : CanvasRenderingContext2D){
        context2D.globalAlpha = this.alpha;
        context2D.fillStyle = this.fillColor;
        context2D.fillRect(x1,y1,x2,y2);
        context2D.fill();
    }

    drawCircle(x,y,rad,context2D : CanvasRenderingContext2D){
        context2D.fillStyle = this.fillColor;
        context2D.globalAlpha = this.alpha;
        context2D.beginPath();
        context2D.arc(x,y,rad,0,Math.PI*2,true);
        context2D.closePath();
        context2D.fill();
    }

    drawArc(x,y,rad,beginAngle,endAngle,context2D : CanvasRenderingContext2D){
        context2D.strokeStyle = this.strokeColor;
        context2D.globalAlpha = this.alpha;
        context2D.beginPath();
        context2D.arc(x,y,rad,beginAngle,endAngle,true);
        context2D.closePath();
        context2D.stroke();
    }
    
    drawStar(x,y,rad,beginAngle,endAngle,context2D : CanvasRenderingContext2D){
        context2D.moveTo(x, y);
        context2D.lineTo(x+80, y);
        context2D.lineTo(x+15, y+50);
        context2D.lineTo(x+40, y-30);
        context2D.lineTo(x+65, y+50);
        context2D.lineTo(x, y);
        context2D.stroke();
    }
}