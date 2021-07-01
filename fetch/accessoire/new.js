let containerSelect = document.getElementById("default-select")

let nom = document.getElementById("nom")
let prix = document.getElementById("prix")
const Form = document.getElementById("new-food")
let loader = document.getElementById("content_loader")
let alerte = document.getElementById("alerte")

const fetchData = async() =>{
    const reqType =  await fetch(`${URI}/type`)
    const jsonType = await reqType.json()
    loader.style.display = "block"
    insertData(jsonType.data)
} 



Form.addEventListener("submit" , (e) =>{
    e.preventDefault()
    loader.style.display = "block"
    let current = document.querySelector(".current")
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



const sendData = async (type) =>{

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    var urlencoded = new URLSearchParams();
    urlencoded.append("nom", nom.value);
    urlencoded.append("prix", prix.value);
    urlencoded.append("type", type);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
  
    const response = await fetch(`${URI}/accessoire/new`, requestOptions)
    const json = await response.json()
    
    loader.style.display = "none"
    alerte.innerText = json.message
    Form.reset()
    
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

