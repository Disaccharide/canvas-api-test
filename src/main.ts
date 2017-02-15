window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
    context2D.fillStyle="#4DFFFF";
    context2D.fillRect(0,0,100,100);

    context2D.moveTo(10, 40);
    context2D.lineTo(90, 40);
    context2D.lineTo(25, 90);
    context2D.lineTo(50, 10);
    context2D.lineTo(75, 90);
    context2D.lineTo(10, 40);
    context2D.stroke();

    context2D.fillStyle = "#009393";
    context2D.beginPath();
    context2D.arc(150, 50, 20, 0, Math.PI * 2, true);
    context2D.closePath();
    context2D.fill();

    var img=new Image()
    img.src="nya.jpg"
    img.onload = () =>{
        context2D.drawImage(img,0,120)
    }

    /*var text1 = new TextField();
    text1.setText("star");
    text1.setTextColor("003E3E");
    text1.setX(30);
    text1.setY(110);

    var text2 = new TextField();
    text2.setText("circle");
    text2.setTextColor("003E3E");
    text2.setX(150);
    text2.setY(110);*/
}