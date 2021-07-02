
//let json = JSON.parse(sessionStorage.getItem("animal 3"));

let json = [];
let montant = []
for (let i = 0; i < sessionStorage.length; i++) {
    json.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
    
 }
 
let nombreDeProduit = document.getElementById("nombreDeProduit")
let totalMontant = document.getElementById("montant")
let count = 0;

//console.log(json)
const replaceData = () =>{
    let container = document.getElementById("show_article")
    let $html = ""
    let total = 0

    if(json.length > 0){
        json.forEach(element => {
            if (typeof element == "object") {   
            count +=1
            $html += `
            <div class="col-md-5 col-lg-3 col-xl-3">
                <div >
                    <img class="img-fluid w-50"
                    src="img/animal-1.jpg" alt="Sample">
                
                </div>
            </div>
            <hr class="mb-4">
            <div class="col-md-7 col-lg-9 col-xl-9">
                <div>
                <div class="d-flex justify-content-between">
                    <div>
                    <h5 id="race" >${element.race}</h5>
                    <p class="mb-3 text-muted text-uppercase small" id="type">TYPE: ${element.type.nom}</p>
                    <p class="mb-2 text-muted text-uppercase small" id="poids">POIDS : ${element.poids}</p>
                    <p class="mb-3 text-muted text-uppercase small" id="age">AGE: ${element.age} mois</p>
                    </div>
                  
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="mb-0"><span><strong id="prix">${element.prix} €</strong></span></p class="mb-0">
                </div>
                <hr class="mb-4">
                </div>
            </div>
            
            
            `
            montant.push(element.prix)
            }    
        });

        montant.forEach(prix => {
            total += prix 
        })
    
        container.innerHTML = $html
        nombreDeProduit.innerHTML = count;
        totalMontant.innerHTML = total
        

    }else{
        container.innerHTML = "<p>Votre panier vide</p>"
    }
   

}

replaceData()

