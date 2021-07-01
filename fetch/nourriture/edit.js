let containerSelect = document.getElementById("default-select")
let path = window.location.search 
let splitUrl = path.split("=")

let id = splitUrl[1]
let nom = document.getElementById("nom")
let prix = document.getElementById("prix")
let description = document.getElementById("description")
let button = document.getElementById("button-edit-food")
const Form = document.getElementById("edit-food")


const fetchData = async() =>{

    const req =  await fetch("http://127.0.0.1:5000/nourriture/"+id)
    const json = await req.json()

    const reqType =  await fetch("http://127.0.0.1:5000/type")
    const jsonType = await reqType.json()

    insertData(json , jsonType.data)
  
} 



Form.addEventListener("submit" , (e) =>{
    e.preventDefault()

    let current = document.querySelector(".current")
  
    if(current.innerHTML != "Choisir un type"){

        button.setAttribute("disabled" , true)

        const data = {
            nom : nom.value, 
            prix : Number(prix.value),
            description : description.value,
            type : current.innerHTML
        }
        alerte.style.color = "initial"
        alerte.innerHTML = ""
       
        sendData(data)
        .then((res) =>{
          console.log(res)
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

    const response = await fetch("http://127.0.0.1:5000/nourriture/"+id+"/edit" , {
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json',
        //   //"authorization": ,
        // },
        method: 'PUT',
        body: data
    })
    return response.json()
}



const insertData = (foodDataJson , typeDataJson) =>{
    nom.value = foodDataJson.data.nom
    description.value = foodDataJson.data.description
    prix.value = foodDataJson.data.prix

    let $select = `<div class="nice-select" tabindex="0"><span class="current">${ typeDataJson.type ? typeDataJson.type.nom : "Choisir un type"}</span>`
    let $option = '<ul class="list">'
    
    typeDataJson.forEach(element => {
        if(foodDataJson.type){
            if(foodDataJson.type.nom == element.nom){
                $option += `<li data-value="${element.nom}" class="option" selected>${element.nom}</li>`
            }
        }
        $option += `<li data-value="${element.nom}" class="option">${element.nom}</li>`
    });

    $option += "</ul>"

    $select += $option
    $select += '</div>'

    containerSelect.innerHTML = $select
    
}



fetchData()

