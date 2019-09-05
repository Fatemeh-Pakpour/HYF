let http = require('http');

let server = http.createServer((req, res) => {
    console.log(`Circle with radius 10 has diameter - ${circle10.getDiameter()}, 
    circumference - ${circle10.getCircumference()} 
    and area - ${circle10.getArea()}.`)

    console.log(`Circle with radius 25 has diameter - ${circle25.getDiameter()}, 
    circumference - ${circle25.getCircumference()} 
    and area - ${circle25.getArea()}.`)
})

server.listen(3000);

class Circle {
    constructor(radius) {
        this.radius = radius;
      }

      getDiameter() {
        const diameter = this.radius * 2;
        return diameter;
      }
      getCircumference() {
        const circumference = this.radius * 2 * Math.PI;
        return circumference;
      }
      getArea() {
        const area = Math.pow(this.radius, 2) * Math.PI;
        return area;
      }
}

const circle10 = new Circle(10);
const circle25 = new Circle(25);