let containerSelect = document.getElementById("default-select")
let path = window.location.search 
let splitUrl = path.split("=")

let id = splitUrl[1]
let age = document.getElementById("age")
let prix = document.getElementById("prix")
let race = document.getElementById("race")
let poids = document.getElementById("poids")

let button = document.getElementById("button-edit-food")
let alerte = document.getElementById("alerte")
const Form = document.getElementById("edit-food")
let loader = document.getElementById("content_loader")


const fetchData = async() =>{
    const reqType =  await fetch(`${URI}/type`)
    const jsonType = await reqType.json()
    loader.style.display = "block"
    insertData(jsonType.data)
} 



Form.addEventListener("submit" , (e) =>{
    e.preventDefault()

    let current = document.querySelector(".current")
    loader.style.display = "block"

    if(current.innerHTML != "Choisir un type"){
        alerte.style.color = "initial"
        alerte.innerHTML = ""
        sendData(current.innerHTML)

    }else{
        alerte.style.color = "red"
        alerte.innerHTML = "Veuillez sélectionner un type"
        loader.style.display = "none"
    }

 
 
})



const sendData = async(type) =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    var urlencoded = new URLSearchParams();
    urlencoded.append("race", race.value)
    urlencoded.append("prix", prix.value)
    urlencoded.append("type", type)
    urlencoded.append("poids", poids.value)
    urlencoded.append("age", age.value)
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
  
    const response = await fetch(`${URI}/animaux/new`, requestOptions)
    const json = await response.json()
    alerte.innerText = json.message
    Form.reset()
    loader.style.display = "none"
}






const insertData = (typeDataJson) =>{
    
    let $select = `<div class="nice-select" tabindex="0"><span class="current">Choisir un type</span>`
    let $option = '<ul class="list">'
    
    typeDataJson.forEach(element => {
        $option += `<li data-value="${element.nom}" class="option">${element.nom}</li>`
    });

    $option += "</ul>"

    $select += $option
    $select += '</div>'

    containerSelect.innerHTML = $select
    loader.style.display = "none"
    
}



fetchData()

