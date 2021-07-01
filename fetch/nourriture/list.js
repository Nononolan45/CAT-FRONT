
let loader = document.getElementById("content_loader")
let tableContainer = document.getElementById("table-food")
let alerte = document.getElementById("text-al")


const getData = async() =>{

    const req =  await fetch(`${URI}/nourriture`)
    const json = await req.json()

    if(json.statusCode != 404){   

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

        tableContainer.innerHTML = content.join('')
        loader.style.display = "none"

        deleteItem()

    }else{
        loader.style.display = "none"
        tableContainer.innerHTML = `<p style="text-align:center">${json.message}</p>`
    }

}




getData()




const deleteItem = () =>{
  let list = document.querySelectorAll(".delete-food")
    list.forEach( element => {
        element.addEventListener("click" , async(e) =>{
            e.preventDefault()
            loader.style.display = "block"
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
              };
              
            const req = await  fetch(`${URI}/nourriture/${element.dataset.id}`, requestOptions)
            const json = await req.json()

            loader.style.display = "none"

            alerte.innerText = json.message

            if(json.statusCode == 201){
                setTimeout(() => {
                    getData()
                    alerte.innerText = ""  
                }, 2000);
          
            }
             
        })
    });
}



