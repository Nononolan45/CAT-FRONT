let containerSelect = document.getElementById("default-select")
let path = window.location.search 
let splitUrl = path.split("=")

let id = splitUrl[1]
let nom = document.getElementById("nom")
const Form = document.getElementById("edit-food")
let alerte = document.getElementById("alerte")
let containerText = document.getElementById("container-text")
let loader = document.getElementById("content_loader")


const fetchData = async() =>{
    const req =  await fetch("http://127.0.0.1:5000/type/"+id)
    const json = await req.json()

    if(json.statusCode == 200){
        nom.value = json.data.nom
        loader.style.display = "none"
    }else{
        Form.style.display = "none"
        document.getElementById("text-al").innerHTML = `${json.message}<br> Erreur ${json.statusCode}`
        loader.style.display = "none"
    }
   
  
} 



Form.addEventListener("submit" , (e) =>{
    e.preventDefault() 
    sendData(nom.value)
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
 
})


const sendData = async(data) =>{

    const response = await fetch("http://127.0.0.1:5000/type/"+id+"/edit" , {
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded",
          //"authorization": ,
        },
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return response.json()
}


fetchData()

