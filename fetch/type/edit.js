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

    if(id != ""){
        const req =  await fetch(`${URI}/type/${id}`)
        const json = await req.json()

        if(json.statusCode == 200){
            nom.value = json.data.nom
            loader.style.display = "none"
        }else{
            Form.style.display = "none"
            document.getElementById("text-al").innerHTML = `${json.message}<br> Erreur ${json.statusCode}`
            loader.style.display = "none"
        }

    }else{
        Form.style.display = "none"
        loader.style.display = "none"
        document.getElementById("text-al").innerHTML = 'Not Found<br> Errors 404'
    }
   
  
} 



Form.addEventListener("submit" , (e) =>{
    e.preventDefault() 
    sendData()
    loader.style.display = "block"
})



const sendData = async() =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    var urlencoded = new URLSearchParams();
    urlencoded.append("nom", nom.value)
  
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
  
    const response = await fetch(`${URI}/type/${id}/edit`, requestOptions)
    const json = await response.json()
    alerte.innerText = json.message
    loader.style.display = "none"
}



fetchData()

