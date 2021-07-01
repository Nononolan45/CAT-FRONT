const getData = async() =>{

    const req =  await fetch("http://127.0.0.1:5000/nourriture")
    const json = await req.json()


    let tableContainer = document.getElementById("table-food")
    let content = []
    let $tabHead ='<div class="table-head"><div class="serial">Nom</div><div class="country">Description</div><div class="visit">Prix</div><div class="percentage">Type</div><div class="action">Action</div></div>'

    let $html = ""
    json.data.forEach(element => {
        $html += `<div class="table-row"><div class="serial">${element.nom}</div>
        <div class="country">${element.description}</div>
        <div class="visit">${element.prix}€</div>
        <div class="percentage">${element.type ? element.type.nom : ""}</div>
        <div class="action">
        <a href="edit.html?id=${element.id}">Éditer</a>
        <a href="" class="delete-food" data-id="${element.id}">Supprimer</a>
        </div></div>`
    });

    content.push($tabHead);
    content.push($html)

    tableContainer.innerHTML = content.join()

}




getData()