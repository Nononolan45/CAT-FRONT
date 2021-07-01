let containerSelect = document.getElementById("default-select")

let nom = document.getElementById("nom")
let prix = document.getElementById("prix")
let description = document.getElementById("description")
const Form = document.getElementById("new-food")
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

    const response = await fetch("http://127.0.0.1:5000/nourriture/new" , {
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

