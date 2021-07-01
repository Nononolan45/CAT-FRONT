let path = window.location.search 
let splitUrl = path.split("=")

let id = splitUrl[1]

let poids = document.getElementById("poids")
let age = document.getElementById("age")
let race = document.getElementById("race")
let type = document.getElementById("type")
let button = document.getElementById("reservation")

const getData = async() =>{
    const req =  await fetch(`http://127.0.0.1:5000/animaux/${id}`)
    const json = await req.json()
    poids.innerText = `Poids : ${json.data.poids}`
    age.innerText = `Âge : ${json.data.age}`
    race.innerText = `Race : ${json.data.race}`
    type.innerText = `Type :  ${json.data.type.nom}`
    button.innerText = `Réservez votre ${json.data.type.nom}`
    button.setAttribute("src" , `/ajouter-au-panier/${json.data.id}`)
}


getData()