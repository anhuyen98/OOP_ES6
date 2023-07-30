
import ListPerson from '../models/ListPerson.js';
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
const DOMAIN = 'https://64959fadb08e17c917926a3e.mockapi.io/OPP_DATA'


closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", () => { // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
  }
}

// button
const button = document.querySelector(".btnCustom");
button.addEventListener("click", (e) => {
  e.preventDefault;
  button.classList.add("animate");
  setTimeout(() => {
    button.classList.remove("animate");
  }, 600);
});

// validate
// (() => {
//   'use strict'

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   const forms = document.querySelectorAll('#form1.needs-validation')

//   // Loop over them and prevent submission
//   Array.from(forms).forEach(form => {
//     form.addEventListener('submit', event => {
//       if (!form.checkValidity()) {
//         event.preventDefault()
//         event.stopPropagation()
//       }

//       form.classList.add('was-validated')
//     }, false)
//   })
// })()

// Main JS
getApi()

// users.sort((a, b) => a.firstname.localeCompare(b.firstname)) sắp xếp tên
// form#form1 input, form#form1 select

window.selectTypePerson = function (e) {
  let v = e.value
  let arrCheck = ['student', 'emloyee', 'customer']
  arrCheck.forEach((item) => {
    if (v === item) {
      document.querySelector(`#${v}Block`).style.display = 'block'
    } else {
      document.querySelector(`#${item}Block`).style.display = 'none'
      let listItem = document.querySelectorAll(`#${item}Block input`)
      listItem.forEach(vItem => vItem.value = '')
    }
  })
}

window.editPerson = function (id) {

  document.querySelector('#btnAddUser').style.display = 'none';
  document.querySelector('#btnUpdateUser').style.display = 'inline-block';
  document.querySelector('#btnUpdateUser').setAttribute('data-id', id)
  document.querySelector('#selectType').setAttribute('disabled', '')
  let promise = axios({
    url: `${DOMAIN}/${id}`,
    method: 'GET'
  })
  promise
    .then((result) => {
      const inputs = document.querySelectorAll('form#form1 input[type="text"], form#form1 select')
      inputs.forEach((i) => {
        const { name } = i
        if (name === 'typePerson') {
          document.querySelector(`#${result.data[name]}Block`).style.display = 'block'
        }
        i.value = result.data[name]
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

window.deletePerson = function (id) {
  deleteApi(id)
}

// Hàm lấy dữ liệu từ user
function getInfor() {
  const person = {}
  const inputValue = document.querySelectorAll('form#form1 input[type="text"], form#form1 select');
  inputValue.forEach((item) => {
    const { name, value } = item;
    person[name] = value
  })
  const { VAT, address, chemistry, company, email, judge, math, name, physical, typePerson, wage, workday } = person
  // if (typePerson === 'student') {
  //   return new Student(name, address, email, math, physical, chemistry, typePerson)
  // } else if (typePerson === 'emloyee') {
  //   return new Emloyee(name, address, email, wage, workday, typePerson)
  // } else {
  //   return new Customer(name, address, email, company, VAT, judge, typePerson)
  // }
  const type = new ListPerson(VAT, address, chemistry, company, email, judge, math, name, physical, typePerson, wage, workday)
  return type.choosePerson()
}

function renderUI(arr) {
  let htmlTable = ''
  arr.forEach((i) => {
    htmlTable += `
    <tr>
      <td>${i.code}</td>
      <td>${i.typeUI}</td>
      <td>${i.name}</td>
      <td>${i.address}</td>
      <td>${i.email}</td>
      <td>${i.average ? new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(i.average) : ''}</td>
      <td>${i.salary ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(i.salary) : ''}</td>
      <td>${i.company || ''}</td>
      <td>
        <button id="btnEdit" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editPerson(${i.id})">Sửa</button>
        <button class="btn btn-danger" onclick="deletePerson(${i.id})">Xóa</button>
      </td>
      </tr>
      `
    // <p class="status status-unpaid">Unpaid</p>
    // <td>${arr.average}</td>
    // <td>${arr.salary}</td>
    // <td><a href="#">${arr.id}</a></td>
    // <td>${i.company}</td>

  })
  document.querySelector('#tbody').innerHTML = htmlTable;
}

function getApi() {
  let promise = axios({
    url: DOMAIN,
    method: 'GET'
  })
  promise
    .then((result) => {
      console.log(result.data)
      renderUI(result.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

function postApi(data) {
  let promise = axios({
    url: DOMAIN,
    method: 'POST',
    data: data
  })
  promise
    .then((result) => {
      console.log(result)
      getApi()
    })
    .catch((err) => {
      console.log(err)
    })
}

function putApi(id, data) {
  let promise = axios({
    url: `${DOMAIN}/${id}`,
    method: 'PUT',
    data: data
  })
  promise
    .then((result) => {
      console.log(result.data)
      getApi()
    })
    .catch((err) => {
      console.log(err)
    })
}

function deleteApi(id) {
  let promise = axios({
    url: `${DOMAIN}/${id}`,
    method: 'DELETE'
  })
  promise
    .then((result) => {
      console.log(result.data)
      getApi()
    })
    .catch((err) => {
      console.log(err)
    })
}


document.querySelector('#btnAdd').onclick = function () {
  document.querySelector('#btnAddUser').style.display = 'inline-block';
  document.querySelector('#btnUpdateUser').style.display = 'none';
  document.querySelector('#selectType').removeAttribute('disabled')
}

document.querySelector('#btnAddUser').onclick = () => {
  let person = getInfor()

  // const { VAT, address, chemistry, company, email, judge, math, name, physical, typePerson, wage, workday } = person

  if (person) {

    if (person.typePerson === 'student') {
      // let student = new Student(name, address, email, math, physical, chemistry, typePerson)
      postApi({
        ...person,
        code: person.setCode(),
        average: person.calcAverage(),
        typeUI: person.personUI()
      })
    } else if (person.typePerson === 'emloyee') {
      // let emloyee = new Emloyee(name, address, email, wage, workday, typePerson)
      postApi({
        ...person,
        code: person.setCode(),
        salary: person.calcSalary(),
        typeUI: person.personUI()
      })
    } else {
      // let customer = new Customer(name, address, email, company, VAT, judge, typePerson)
      postApi({
        ...person,
        code: person.setCode(),
        typeUI: person.personUI()
      })
    }

    document.querySelector('#btnClose').click()
  } else {
    console.log('Tạo người dùng thất bại')
  }
}

document.querySelector('ul.typePS').onclick = function (e) {
  const value = (e.target.attributes['data-v'].nodeValue)
  console.log("value: ", value);
  let arrValue = [];
  let promise = axios({
    url: DOMAIN,
    method: 'GET'
  })
  promise
    .then((result) => {
      console.log(result.data)
      result.data.forEach((i) => {
        if (value === 'all') {
          arrValue = result.data
        }
        if (i.typePerson === value) {
          arrValue.push(i)
        }
      })
      renderUI(arrValue)
    })
    .catch((err) => {
      console.log(err)
    })
}

document.querySelector('ul.typeName').onclick = function (e) {
  const nameV = (e.target.attributes['data-n'].nodeValue)
  console.log("nameV: ", nameV);
  let promise = axios({
    url: DOMAIN,
    method: 'GET'
  })
  promise
    .then((result) => {
      let arrName = result.data
      if (nameV === '0') {
        arrName.sort((a, b) => (a.name).localeCompare(b.name))
      } else {
        arrName.sort((a, b) => (b.name).localeCompare(a.name))
      }
      renderUI(arrName)
    })
    .catch((err) => {
      console.log(err)
    })
}

document.querySelector('#btnUpdateUser').onclick = function () {
  const person = getInfor()
  const id = document.querySelector('#btnUpdateUser').getAttribute('data-id')
  if (person.typePerson === 'student') {
    // let student = new Student(name, address, email, math, physical, chemistry, typePerson)
    putApi(id, {
      ...person,
      code: person.setCode(),
      average: person.calcAverage(),
      typeUI: person.personUI()
    })
  } else if (person.typePerson === 'emloyee') {
    // let emloyee = new Emloyee(name, address, email, wage, workday, typePerson)
    putApi(id, {
      ...person,
      code: person.setCode(),
      salary: person.calcSalary(),
      typeUI: person.personUI()
    })
  } else {
    // let customer = new Customer(name, address, email, company, VAT, judge, typePerson)
    putApi(id, {
      ...person,
      code: person.setCode(),
      typeUI: person.personUI()
    })
  }
  document.querySelector('#btnUpdateUser').toggleAttribute('data-id', false)
  document.querySelector('#btnClose').click()
}

const myModal = document.querySelector('#exampleModal')
const myForm = document.querySelector('#form1')
const mySpan = document.querySelectorAll('#form1 span')
myModal.addEventListener('hidden.bs.modal', () => {
  myForm.reset()
  mySpan.forEach((span) => {
    span.style.display = 'none'
  })
  let arrCheck = ['student', 'emloyee', 'customer']
  arrCheck.forEach((i) => {
    document.querySelector(`#${i}Block`).style.display = 'none'
  })
})