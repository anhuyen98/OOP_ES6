import Person from './Person.js'

class Customer extends Person {
    constructor (_name, _address, _email, _company, _VAT, _judge, _typePerson) {
        super(_name, _address, _email, _typePerson),
        this.VAT = _VAT,
        this.judge = _judge,
        this.company = _company
    }

    personUI() {
        return this.person = 'Khách hàng'
    }
}

export default Customer