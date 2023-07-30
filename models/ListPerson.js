import Student from './Student.js'
import Emloyee from './Emloyee.js'
import Customer from './Customer.js'
import checkedString from '../utils/validation.js'

class ListPerson {
    constructor(_VAT, _address, _chemistry, _company, _email, _judge, _math, _name, _physical, _typePerson, _wage, _workday) {
        this.VAT = _VAT,
            this.address = _address,
            this.chemistry = _chemistry,
            this.company = _company,
            this.email = _email,
            this.judge = _judge,
            this.math = _math,
            this.name = _name,
            this.physical = _physical,
            this.typePerson = _typePerson,
            this.wage = _wage,
            this.workday = _workday
    }

    choosePerson() {
        let isValid = true;
        let student, emloyee, customer;
        isValid &= checkedString(this.name, 1, undefined, 'span#spanName', 'Trường này không được bỏ trống')
        isValid &= checkedString(this.address, 1, undefined, 'span#spanAddress', 'Trường này không được bỏ trống')
        isValid &= checkedString(this.email, 1, undefined, 'span#spanEmail', 'Trường này không được bỏ trống')
        isValid &= checkedString(this.typePerson, 1, undefined, 'span#spanTypePerson', 'Trường này không được bỏ trống')

        if (this.typePerson === 'student') {
            isValid &= checkedString(this.math, 1, undefined, 'span#spanMath', 'Trường này không được bỏ trống')
            isValid &= checkedString(this.physical, 1, undefined, 'span#spanPhysical', 'Trường này không được bỏ trống')
            isValid &= checkedString(this.chemistry, 1, undefined, 'span#spanChemistry', 'Trường này không được bỏ trống')
            student = new Student(this.name, this.address, this.email, this.math, this.physical, this.chemistry, this.typePerson)
        } else if (this.typePerson === 'emloyee') {
            isValid &= checkedString(this.wage, 1, undefined, 'span#spanWage', 'Trường này không được bỏ trống')
            isValid &= checkedString(this.workday, 1, undefined, 'span#spanWorkday', 'Trường này không được bỏ trống')
            emloyee = new Emloyee(this.name, this.address, this.email, this.wage, this.workday, this.typePerson)
        } else {
            customer = new Customer(this.name, this.address, this.email, this.company, this.VAT, this.judge, this.typePerson)
        }

        return isValid ? student || emloyee || customer : undefined
    }

}

export default ListPerson