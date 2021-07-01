let loader = document.getElementById("content_loader")
let tableContainer = document.getElementById("table-food")

const getData = async() =>{

    const req =  await fetch("http://127.0.0.1:5000/accessoire")
    const json = await req.json()

    if(json.statusCode != 404){       
        let content = []
        let $tabHead ='<div class="table-head"><div class="serial">Nom</div><div class="country">Prix</div><div class="percentage">Type</div><div class="action">Action</div></div>'
    
        let $html = ""
        json.data.forEach(element => {
            $html += `<div class="table-row"><div class="serial">${element.nom}</div>
            <div class="country">${element.prix}€</div>
            <div class="percentage">${element.type ? element.type.nom : ""}</div>
            <div class="action">
            <a href="edit.html?id=${element.id}">Éditer</a>
            <a href="" class="delete-food" data-id="${element.id}">Supprimer</a>
            </div></div>`
        });
    
        content.push($tabHead);
        content.push($html)
    
        tableContainer.innerHTML = content.join('')
        loader.style.display = "none"

    }else{
        tableContainer.innerHTML = `<p style="text-align:center">${json.message}</p>`
        loader.style.display = "none"
    }

 

}




getData()