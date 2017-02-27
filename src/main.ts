window.onload = () => {
    var currentTarget;
    var startTarget;
    var isMouseDown = false;
    var startPoint = new math.Point(-1, -1);
    var movingPoint = new math.Point(0, 0);

    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");

    var stage = new DisplayObjectContainer();
    stage.width = 600;
    stage.height = 600;

    var button = new Bitmap("src/click.jpg");
    button.x = 0;
    button.y = 0;
    var text01 = new TestField();
    text01.setText("↑ click me");
    text01.setX(75);
    text01.setY(225);

    stage.addChild(text01);
    stage.addChild(button);

    var container = new DisplayObjectContainer();
    container.width = 600;
    container.height = 600;

    var list = new Bitmap("src/move.jpg");
    var text02 = new TestField();
    text02.setText("↑ move me");
    text02.setX(60);
    text02.setY(220);

    container.x = 250;
    container.y = 5;
    container.addChild(list);
    container.addChild(text02);

    stage.addChild(container);

    stage.addEventListener(TouchEventsType.MOUSEDOWN, () => {}, this)
    container.addEventListener(TouchEventsType.MOUSEMOVE, () => {}, this)

    list.addEventListener(TouchEventsType.MOUSEMOVE, () => {
        if (currentTarget == startTarget) {
            container.x += (TouchEventService.stageX - movingPoint.x);
            container.y += (TouchEventService.stageY - movingPoint.y);
        }
    }, this);

    button.addEventListener(TouchEventsType.CLICK, () => {
        alert("you have clicked the button");
    }, this);

    window.onmousedown = (e) => {
        let x = e.offsetX - 3;
        let y = e.offsetY - 3;
        TouchEventService.stageX = x;
        TouchEventService.stageY = y;
        startPoint.x = x;
        startPoint.y = y;
        movingPoint.x = x;
        movingPoint.y = y;
        TouchEventService.currentType = TouchEventsType.MOUSEDOWN;
        currentTarget = stage.hitTest(x, y);
        startTarget = currentTarget;
        TouchEventService.getInstance().toDo();
        isMouseDown = true;
    }

    window.onmouseup = (e) => {
        let x = e.offsetX - 3;
        let y = e.offsetY - 3;
        TouchEventService.stageX = x;
        TouchEventService.stageY = y;
        var target = stage.hitTest(x, y);
        if (target == currentTarget) {
            TouchEventService.currentType = TouchEventsType.CLICK;
        }
        else {
            TouchEventService.currentType = TouchEventsType.MOUSEUP
        }
        TouchEventService.getInstance().toDo();
        currentTarget = null;
        isMouseDown = false;
    }

    window.onmousemove = (e) => {
        if (isMouseDown) {
            let x = e.offsetX - 3;
            let y = e.offsetY - 3;
            TouchEventService.stageX = x;
            TouchEventService.stageY = y;
            TouchEventService.currentType = TouchEventsType.MOUSEMOVE;
            currentTarget = stage.hitTest(x, y);
            TouchEventService.getInstance().toDo();
            movingPoint.x = x;
            movingPoint.y = y;
        }
    }

    setInterval(() => {
        context2D.save();
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);
        context2D.restore();
    }, 100)

};





