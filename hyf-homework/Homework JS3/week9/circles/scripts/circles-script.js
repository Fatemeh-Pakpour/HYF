(() => {

    //Paint a circle to a canvas element
    const canvas = document.getElementById("my-canvas");
    const context = canvas.getContext("2d");
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    class Circle {
        constructor(x, y, r, startAngle, endAngle, fillColor) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.fillColor = fillColor;
        }

        draw() {
            context.beginPath();
            context.arc(this.x, this.y, this.r, this.startAngle, this.endAngle);
            context.fillStyle = this.fillColor;
            context.stroke();
            context.fill();
        }
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function drawCircle() {
        let x = Math.floor(Math.random() * window.innerWidth);
        let y = Math.floor(Math.random() * window.innerHeight);
        let r = Math.floor(Math.random() * 100);
        let fillColor = getRandomColor();
        const newCircle = new Circle(x, y, r, 0, 2 * Math.PI, fillColor);
        newCircle.draw();
    }

    //Every half second create a new circle
    // drawCircle();
    // setInterval(drawCircle, 500);


    function drawCircleByClick(event) {
        let x = event.clientX;
        let y = event.clientY;
        let r = Math.floor(Math.random() * 100);
        let fillColor = getRandomColor();
        const newCircle = new Circle(x, y, r, 0, 2 * Math.PI, fillColor);
        newCircle.draw();
    }
    
    window.addEventListener('click', drawCircleByClick);
})();
