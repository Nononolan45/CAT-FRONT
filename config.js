const URI = "http://127.0.0.1:5000/api"


const isConnect = () =>{
    const a = document.getElementById("log");
if(localStorage.getItem('token')){
    a.innerHTML = "Déconnexion"
    a.href = "javascript:void(0);"
    a.onclick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id')
        window.location.href = '/'
    }
}

}


isConnect()

let path = window.location
if(path.pathname == "/administration/" && !localStorage.getItem('token') ){
    window.location = "/"
}



