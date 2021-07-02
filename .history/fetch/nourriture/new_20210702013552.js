let containerSelect = document.getElementById("default-select")

let nom = document.getElementById("nom")
let prix = document.getElementById("prix")
let description = document.getElementById("description")
let button = document.getElementById("button-edit-food")
let alerte = document.getElementById("alerte")
let Form = document.getElementById("form")
let loader = document.getElementById("content_loader")


const fetchData = async() =>{

    const reqType =  await fetch(`${URI}/type`)
    const jsonType = await reqType.json()

    if(jsonType.statusCode == 200){
        insertData(jsonType.data)
    }else{
        loader.style.display = "none"
        document.getElementById("text-al").innerHTML = `${json.message}<br> Erreur ${json.statusCode}`
    }
    
} 



Form.addEventListener("submit" , (e) =>{
    e.preventDefault()
    let current = document.querySelector(".current")
    if(current.innerHTML != "Choisir un type"){

        loader.style.display = "block"
        alerte.style.color = "initial"
        alerte.innerHTML = ""
        sendData(current)

    }else{
        alerte.style.color = "red"
        alerte.innerHTML = "Veuillez sélectionner un type"
    }

})


const sendData = async(current) =>{
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

  
    var urlencoded = new URLSearchParams();
    urlencoded.append("nom", nom.value)
    urlencoded.append("prix", prix.value);
    urlencoded.append("description", description.value);
    urlencoded.append("type", current.innerHTML);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
  
    const response = await fetch(`${URI}/nourriture/new`, requestOptions)
    const json = await response.json()
    alerte.innerText = json.message
    Form.reset()
    loader.style.display = "none"
}



const insertData = ( typeDataJson) =>{

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

