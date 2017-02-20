var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.alpha = 1;
        this.globalAlpha = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        // hasBeenCalculated = false;
        this.matrix = new math.Matrix();
        this.globalMatrix = new math.Matrix();
    }
    DisplayObject.prototype.draw = function (context2D) {
        this.matrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.matrix, this.parent.globalMatrix);
        }
        if (this.parent == null) {
            this.globalAlpha = this.alpha;
            this.globalMatrix = this.matrix;
        }
        context2D.globalAlpha = this.globalAlpha;
        context2D.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        this.render(context2D);
    };
    DisplayObject.prototype.render = function (context2D) { };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.apply(this, arguments);
        this.childArray = [];
    }
    DisplayObjectContainer.prototype.addChild = function (child) {
        this.childArray.push(child);
        child.parent = this;
    };
    DisplayObjectContainer.prototype.render = function (context2D) {
        for (var _i = 0, _a = this.childArray; _i < _a.length; _i++) {
            var displayObject = _a[_i];
            displayObject.draw(context2D);
        }
    };
    return DisplayObjectContainer;
}(DisplayObject));
var TestField = (function (_super) {
    __extends(TestField, _super);
    function TestField() {
        _super.call(this);
        this.text = "";
        this.textColor = "#000000";
        this.size = 18;
        this.typeFace = "Arial";
        this.textType = "18px Arial";
    }
    TestField.prototype.render = function (context2D) {
        context2D.fillStyle = this.textColor;
        context2D.font = this.textType;
        context2D.fillText(this.text, this.x, this.y + this.size);
    };
    TestField.prototype.setText = function (text) {
        this.text = text;
    };
    TestField.prototype.setX = function (x) {
        this.x = x;
    };
    TestField.prototype.setY = function (y) {
        this.y = y;
    };
    TestField.prototype.setTextColor = function (color) {
        this.textColor = color;
    };
    TestField.prototype.setSize = function (size) {
        this.size = size;
        this.textType = this.size.toString() + "px " + this.typeFace;
        console.log(this.textType);
    };
    TestField.prototype.setTypeFace = function (typeFace) {
        this.typeFace = typeFace;
        this.textType = this.size.toString() + "px " + this.typeFace;
        console.log(this.textType);
    };
    return TestField;
}(DisplayObject));
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.call(this);
        this.imageID = "";
    }
    Bitmap.prototype.render = function (context2D) {
        var _this = this;
        var image = new Image();
        image.src = this.imageID;
        this.imageCache = image;
        if (this.imageCache) {
            context2D.drawImage(this.imageCache, this.x, this.y);
        }
        else {
            image.onload = function () {
                context2D.drawImage(image, _this.x, _this.y);
            };
        }
    };
    Bitmap.prototype.setImage = function (text) {
        this.imageID = text;
    };
    Bitmap.prototype.setX = function (x) {
        this.x = x;
    };
    Bitmap.prototype.setY = function (y) {
        this.y = y;
    };
    return Bitmap;
}(DisplayObject));
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        _super.apply(this, arguments);
        this.graphics = new Graphics();
    }
    return Shape;
}(DisplayObjectContainer));
var Graphics = (function (_super) {
    __extends(Graphics, _super);
    function Graphics() {
        _super.apply(this, arguments);
        this.fillColor = "#000000";
        this.alpha = 1;
        this.globalAlpha = 1;
        this.strokeColor = "#000000";
        this.lineWidth = 1;
        this.lineColor = "#000000";
    }
    Graphics.prototype.beginFill = function (color, alpha) {
        this.fillColor = color;
        this.alpha = alpha;
    };
    Graphics.prototype.endFill = function () {
        this.fillColor = "#000000";
        this.alpha = 1;
    };
    Graphics.prototype.drawRect = function (x1, y1, x2, y2, context2D) {
        context2D.globalAlpha = this.alpha;
        context2D.fillStyle = this.fillColor;
        context2D.fillRect(x1, y1, x2, y2);
        context2D.fill();
    };
    Graphics.prototype.drawCircle = function (x, y, rad, context2D) {
        context2D.fillStyle = this.fillColor;
        context2D.globalAlpha = this.alpha;
        context2D.beginPath();
        context2D.arc(x, y, rad, 0, Math.PI * 2, true);
        context2D.closePath();
        context2D.fill();
    };
    Graphics.prototype.drawArc = function (x, y, rad, beginAngle, endAngle, context2D) {
        context2D.strokeStyle = this.strokeColor;
        context2D.globalAlpha = this.alpha;
        context2D.beginPath();
        context2D.arc(x, y, rad, beginAngle, endAngle, true);
        context2D.closePath();
        context2D.stroke();
    };
    Graphics.prototype.drawStar = function (x, y, rad, beginAngle, endAngle, context2D) {
        context2D.moveTo(x, y);
        context2D.lineTo(x + 80, y);
        context2D.lineTo(x + 15, y + 50);
        context2D.lineTo(x + 40, y - 30);
        context2D.lineTo(x + 65, y + 50);
        context2D.lineTo(x, y);
        context2D.stroke();
    };
    return Graphics;
}(DisplayObjectContainer));
//# sourceMappingURL=drawing-api.js.map