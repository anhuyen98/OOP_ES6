class Person {
    constructor (_name, _address, _email, _typePerson) {
        this.name = _name,
        this.address = _address,
        this.email = _email,
        this.typePerson = _typePerson
    }
    
    setCode() {
        return this.code = Math.floor(100000 + Math.random() * 900000);
    }
}

export default Person