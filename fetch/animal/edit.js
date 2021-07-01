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

    if(id != ""){

        const req =  await fetch(`${URI}/animaux/${id}`)
        const json = await req.json()

        if(json.statusCode == 200){
            const reqType =  await fetch(`${URI}/type`)
            const jsonType = await reqType.json()
        
            insertData(json , jsonType.data)

        }else{
            Form.style.display = "none"
            loader.style.display = "none"
            document.getElementById("text-al").innerHTML = `${json.message}<br> Erreur ${json.statusCode}`
        }

    }else{
        Form.style.display = "none"
        loader.style.display = "none"
        document.getElementById("text-al").innerHTML = 'Not Found<br> Errors 404'
    }
    
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





const insertData = (DataJson , typeDataJson) =>{
    
    age.value = DataJson.data.age
    prix.value = DataJson.data.prix
    race.value = DataJson.data.race
    poids.value = DataJson.data.poids

    let $select = `<div class="nice-select" tabindex="0"><span class="current">${ DataJson.data.type ? DataJson.data.type.nom : "Choisir un type"}</span>`
    let $option = '<ul class="list">'
    
    typeDataJson.forEach(element => {
        if(DataJson.data.type == element.nom){
            $option += `<li data-value="${element.nom}" class="option" selected>${element.nom}</li>`
        }else{
            $option += `<li data-value="${element.nom}" class="option">${element.nom}</li>`
        }
    });

    $option += "</ul>"

    $select += $option
    $select += '</div>'

    containerSelect.innerHTML = $select
    loader.style.display = "none"
    
}




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
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
  
    const response = await fetch(`${URI}/animaux/${id}/edit`, requestOptions)
    const json = await response.json()
    alerte.innerText = json.message
    loader.style.display = "none"
}






fetchData()

