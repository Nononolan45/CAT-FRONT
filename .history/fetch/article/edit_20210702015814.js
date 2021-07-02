
let titre = document.getElementById("titre")
let contenu = document.getElementById("contenu")
let alerte = document.getElementById("alerte")
let loader = document.getElementById("content_loader")
const Form = document.getElementById("new-food")
let path = window.location.search 
let splitUrl = path.split("=")
let id = splitUrl[1]





const fetchData = async() =>{
    loader.style.display = "block"

    if(id != ""){
        const req =  await fetch(`${URI}/article/${id}`)
        const json = await req.json()

        loader.style.display = "none"
        console.log(json)
        if(json.statusCode == 200){

            console.log(json.data.contenu)
            titre.value = json.data.titre
            contenu.innerText = json.data.contenu



        }else{
            Form.style.display = "none"
            document.getElementById("text-al").innerHTML = `${json.message}<br> Error ${json.statusCode}`
        }

    }else{
        Form.style.display = "none"
        loader.style.display = "none"
        document.getElementById("text-al").innerHTML = 'Not Found<br> Errors 404'
    }
    
  
  
} 







Form.addEventListener("submit" , async (e) =>{
    e.preventDefault()
    loader.style.display = "block"
    sendData()
})




const sendData = async () =>{

  var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);


  var urlencoded = new URLSearchParams();
  urlencoded.append("titre", titre.value);
  urlencoded.append("contenu", contenu.value);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  const response = await fetch(`${URI}/article/${id}/edit`, requestOptions)
  const json = await response.json()
  if(json.message){
      alerte.innerText = json.message
  }
  Form.reset()
  
  
}





fetchData()