
let nom = document.getElementById("nom")
const Form = document.getElementById("new-food")





Form.addEventListener("submit" , async (e) =>{
    e.preventDefault()
    // const response =  await fetch("http://127.0.0.1:5000/type/new" , {
    //     headers: {
    //       "Content-Type" : "application/json",
    //       //"authorization": ,
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({"nom" : nom.value})
    // })
    // const json = await response.json()

    fetchData()
 
})

const fetchData = () =>{

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("nom", nom.value);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://127.0.0.1:5000/type/new", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


}