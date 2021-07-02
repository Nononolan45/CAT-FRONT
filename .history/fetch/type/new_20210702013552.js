
let nom = document.getElementById("nom")
let alerte = document.getElementById("alerte")
const Form = document.getElementById("new-food")





Form.addEventListener("submit" , async (e) =>{
    e.preventDefault()
    fetchData()
})




const fetchData = async () =>{

  var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);


  var urlencoded = new URLSearchParams();
  urlencoded.append("nom", nom.value);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  const response = await fetch(`${URI}/type/new`, requestOptions)
  const json = await response.json()
  alerte.innerText = json.message
  Form.reset()

  
}


