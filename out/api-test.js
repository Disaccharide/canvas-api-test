var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = "";
        this.textColor = "#000000";
        this.x = 0;
        this.y = 8;
        this.size = 18;
        this.typeFace = "Arial";
        this.textType = "18px Arial";
    }
    TextField.prototype.draw = function (context2D) {
        context2D.fillStyle = this.textColor;
        context2D.font = this.textType;
        context2D.fillText(this.text, this.x, this.y + this.size);
        //console.log("233");
    };
    TextField.prototype.setText = function (text) {
        this.text = text;
    };
    TextField.prototype.setX = function (x) {
        this.x = x;
    };
    TextField.prototype.setY = function (y) {
        this.y = y;
    };
    TextField.prototype.setTextColor = function (color) {
        this.textColor = color;
    };
    TextField.prototype.setSize = function (size) {
        this.size = size;
        this.textType = this.size.toString() + "px " + this.typeFace;
        console.log(this.textType);
    };
    TextField.prototype.setTypeFace = function (typeFace) {
        this.typeFace = typeFace;
        this.textType = this.size.toString() + "px " + this.typeFace;
        console.log(this.textType);
    };
    return TextField;
}(DisplayObjectContainer));
//# sourceMappingURL=api-test.js.map