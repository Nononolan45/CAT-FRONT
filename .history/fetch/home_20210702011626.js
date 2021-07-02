const getData = async() =>{
    const a = document.getElementById("log");
    if(!localStorage.getItem(token)){
        log.innerHTML = "Connexion"
    }
    else {
        log.innerHTML = "Déconnexion"
    }

    const req =  await fetch(`${URI}/animaux/last`)
    const json = await req.json()
   
    let container = document.getElementById("section-last-pet")
    let $html = ""

    if(json.data.length > 0){
        json.data.forEach(element => {
            $html += `<div class="col-lg-2 col-md-6 single-team"><div class="thumb"><img class="img-fluid" src="img/animal-1.jpg" alt=""></img><div class="align-items-center justify-content-center d-flex"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a></div></div><div class="meta-text mt-30 text-center"><h4>${element.race}</h4><a href="animal/show.html?id=${element.id}" class="primary-btn squire mx-auto mt-20">En savoir +</a></div></div>`    
        });
    
        container.innerHTML = $html

    }else{
        container.innerHTML = "<p>Liste vide</p>"
    }


}


getData()

let alerte = document.getElementById("alerte")
const FormLogin = document.getElementById("login");



FormLogin.addEventListener("submit" , async (e) =>{
    e.preventDefault()
    document.getElementById("login-alert").innerText = '';
    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

  
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", document.getElementById('login-email').value);
    urlencoded.append("motDePasse", document.getElementById('login-password').value);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
  
    const response = await fetch(`${URI}/login`, requestOptions)
    const json = await response.json()
    if(json.message){
        document.getElementById("login-alert").innerText = json.message
    }
    else {
        localStorage.setItem('token', JSON.stringify(json.token));
        window.location.href('/');
    }
    FormLogin.reset()
})


