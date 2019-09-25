class Student {
    constructor({ name, grade, favorite }) {
        if(!name || !grade){
            throw "Wrong";
        }


        this.name = name;
        this.grade = grade;
        this.favorite = favorite;
    }
}

module.exports = Student;