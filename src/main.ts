window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");

    var stage = new DisplayObjectContainer();
    var text01 = new TestField();
    text01.setText("anvas-api-test");
    text01.setX(30);
    text01.setSize(75);
    text01.alpha = 0.75;
    text01.rotation = 45;
    stage.addChild(text01);

    var image01 = new Bitmap();
    image01.setImage("src/nya.jpg");
    image01.alpha = 0.5;
    stage.addChild(image01);

    stage.alpha = 0.75;

    setInterval(() => {
        context2D.setTransform(1, 0, 0, 1, 0, 0);
        context2D.clearRect(0,0,canvas.width,canvas.height);
        text01.y++;
        stage.draw(context2D);
    },100)
};





