import Person from './Person.js'

class Student extends Person {
    constructor(_name, _address, _email, _math, _physical, _chemistry, _typePerson) {
        super(_name, _address, _email, _typePerson),
        this.math = Number(_math),
        this.physical = Number(_physical),
        this.chemistry = Number(_chemistry)
    }

    calcAverage() {
        return this.average = (this.math + this.physical + this.chemistry)/3
    }

    personUI() {
        return this.person = 'Sinh viên'
    }
}

export default Student