import throttle from "lodash.throttle"

const DATA_KEY = "feedback-form-state";
const refs = {
 form: document.querySelector('.feedback-form'),
 input: document.querySelector('input[name="email"]'),
 textarea : document.querySelector('textarea[name = "message"]')
}
populateData()
refs.form.addEventListener('input',throttle(formChangeHandler,500))
refs.form.addEventListener('submit',formSubmitHandler)

const data = {}

function formChangeHandler(event){
//Створюю дату та записую в локал сторедж
    data[event.target.name] = event.target.value 

    const dataToString = JSON.stringify(data)

    localStorage.setItem(DATA_KEY, dataToString)
    
}
function formSubmitHandler(event){
    event.preventDefault();
    
//Під час сабміту очистити форму, локал сторедж та вивести у консоль object 
   
    console.log(JSON.parse(localStorage.getItem(DATA_KEY)))

    localStorage.removeItem(DATA_KEY)

    event.target.reset();

    //Clearing data object
    for(key in data){
        delete data[key]
    }

}
function populateData(){
    const savedData = localStorage.getItem(DATA_KEY)
    const parsedData = JSON.parse(savedData)

//Якщо є данні у сховищі записати їх у форму

    if(savedData){
        console.log('parsed data', parsedData)
console.log('parsed email: ', parsedData.email)
console.log('parsed message: ', parsedData.message)

        refs.input.value = parsedData.email || " ";
        refs.textarea.value = parsedData.message || " ";
    }
}
