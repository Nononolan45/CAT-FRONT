let loader = document.getElementById("content_loader")
let tableContainer = document.getElementById("table-food")
let alerte = document.getElementById("text-al")




const getData = async() =>{

    loader.style.display = "block"
    const req =  await fetch(`${URI}/accessoire`)
    const json = await req.json()

    console.log(json)
    if(json.statusCode != 404){       
        let content = []
        let $tabHead ='<div class="table-head"><div class="serial">Nom</div><div class="country">Prix</div><div class="percentage">Type</div><div class="action">Action</div></div>'
    
        let $html = ""
        json.data.forEach(element => {
            $html += `<div class="table-row"><div class="serial">${element.nom}</div>
            <div class="country">${element.prix}€</div>
            <div class="percentage">${element.type ? element.type : ""}</div>
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
        tableContainer.innerHTML = `<p style="text-align:center">${json.message}</p>`
        loader.style.display = "none"
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
                
              const req = await  fetch(`${URI}/accessoire/${element.dataset.id}`, requestOptions)
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