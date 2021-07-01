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

    const reqType =  await fetch("http://127.0.0.1:5000/type")
    const jsonType = await reqType.json()
    insertData(jsonType.data)
} 



Form.addEventListener("submit" , (e) =>{
    e.preventDefault()

    let current = document.querySelector(".current")
  
    if(current.innerHTML != "Choisir un type"){

        const data = {
            race : race.value, 
            prix : Number(prix.value),
            age : Number(prix.age),
            type : current.innerHTML,
            poids: Number(poids.value)
        }
        alerte.style.color = "initial"
        alerte.innerHTML = ""
       
        sendData(data)
        .then((res) =>{
            if(res.statusCode != 201){
                alerte.style.color = "red"
                alerte.innerHTML = res.message
            }else{
                alerte.style.color = "initial"
                alerte.innerHTML = res.message
            }
        })
        .catch((error)=>{
            alerte.style.color = "red"
            alerte.innerHTML = "Erreur serveur."
        })

    }else{
        alerte.style.color = "red"
        alerte.innerHTML = "Veuillez sélectionner un type"
    }

 
 
})


const sendData = async(data) =>{

    const response = await fetch("http://127.0.0.1:5000/animaux/" , {
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded",
          //"authorization": ,
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    return response.json()
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

