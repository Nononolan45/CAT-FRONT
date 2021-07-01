let loader = document.getElementById("content_loader")
let tableContainer = document.getElementById("table-food")
const getData = async() =>{

    const req =  await fetch("http://127.0.0.1:5000/type")
    const json = await req.json()

    if(json.statusCode != 404){   
       
        let content = []
        let $tabHead ='<div class="table-head"><div class="serial">Nom</div><div class="percentage"></div><div class="action"></div></div>'

        let $html = ""
        if(json.data.length > 0){
            json.data.forEach(element => {
                $html += `<div class="table-row"><div class="serial">${element.nom}</div>
                <div class="percentage">
                <a href="edit.html?id=${element.id}">Éditer</a>
                </div>
                <div class="action">
                <a href="" class="delete-food" data-id="${element.id}">Supprimer</a>
                </div></div>`
            });

            content.push($tabHead);
            content.push($html)

            tableContainer.innerHTML = content.join('')
        }else{
            tableContainer.innerHTML = `<p style="text-align:center">${json.message}</p>`
        }
   
        loader.style.display = "none"
    }else{
        loader.style.display = "none"
        tableContainer.innerHTML = `<p style="text-align:center">${json.message}</p>`
    }
}




getData()