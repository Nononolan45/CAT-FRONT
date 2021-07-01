let containerSelect = document.getElementById("default-select")
let path = window.location.search 
let splitUrl = path.split("=")

let id = splitUrl[1]
let nom = document.getElementById("nom")
let prix = document.getElementById("prix")
let button = document.getElementById("button-edit-food")
let alerte = document.getElementById("alerte")
const Form = document.getElementById("edit-food")
let loader = document.getElementById("content_loader")


const fetchData = async() =>{

    if(id != ""){

        const req =  await fetch(`${URI}/accessoire/${id}`)
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
    urlencoded.append("nom", nom.value)
    urlencoded.append("prix", prix.value)
    urlencoded.append("type", type)
  

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
  
    const response = await fetch(`${URI}/accessoire/${id}/edit`, requestOptions)
    const json = await response.json()
    alerte.innerText = json.message
    loader.style.display = "none"
}



const insertData = (DataJson , typeDataJson) =>{
    nom.value = DataJson.data.nom
    prix.value = DataJson.data.prix

    let $select = `<div class="nice-select" tabindex="0"><span class="current">${ DataJson.data.type ? DataJson.data.type : "Choisir un type"}</span>`
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



fetchData()

