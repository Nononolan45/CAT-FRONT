let loader = document.getElementById("content_loader")
let tableContainer = document.getElementById("table-food")


const getData = async() =>{

    const req =  await fetch(`${URI}/article`)
    const json = await req.json()

    if(json.data.length > 0){   

        let content = []
        let $tabHead ='<div class="table-head"><div class="serial">Titre</div><div class="country">Contenu</div><div class="visit">Auteur</div><div class="percentage">Action</div></div>'

        let $html = ""
        json.data.forEach(element => {
            $html += `<div class="table-row"><div class="serial">${element.titre}</div>
            <div class="country">${element.contenu}</div>
            <div class="visit">${element.auteur.pseudo}</div>
            <div class="percentage">
            <a href="edit.html?id=${element.id}">Éditer</a>
            <a href="" class="delete-food" data-id="${element.id}">Supprimer</a>
            </div></div>`
        });

        content.push($tabHead);
        content.push($html)

        tableContainer.innerHTML = content.join('')
        loader.style.display = "none"

    }else{
        loader.style.display = "none"
        tableContainer.innerHTML = `<p style="text-align:center">${json.message}</p>`
    }

}




getData()