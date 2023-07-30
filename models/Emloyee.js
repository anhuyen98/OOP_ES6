import Person from './Person.js'

class Emloyee extends Person {
    constructor (_name, _address, _email, _wage, _workday, _typePerson) {
        super(_name, _address, _email, _typePerson),
        this.wage = Number(_wage),
        this.workday = Number(_workday)
    }

    calcSalary() {
        return this.salary = this.wage * this.workday;
    }

    personUI() {
        return this.person = 'Giảng viên'
    }
}

export default Emloyee