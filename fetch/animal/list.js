const getData = async() =>{

    const reqType =  await fetch("http://127.0.0.1:5000/type")
    const jsonType = await reqType.json()

    const req =  await fetch("http://127.0.0.1:5000/animaux")
    const json = await req.json()

   


    let nav = document.getElementById('pills-tab')
    let container = document.getElementById("pills-tabContent")

    let $li= ""
    let $tab = ""

    jsonType.data.forEach((element ,index) => {
        if(index == 0){
            $li += `<li class="nav-item"><a class="nav-link active" id="tab-${element.nom}" data-toggle="pill" href="#${element.nom}" role="tab" aria-controls="${element.nom}" aria-selected="true">${element.nom}</a></li>`
            $tab +=`<div class="tab-pane fade show active" id="${element.nom}" role="tabpanel" aria-labelledby="${element.nom}-tab"><div class="row gallery-item"></div></div>`

        }else{
            $li += `<li class="nav-item"><a class="nav-link" id="tab-${element.nom}" data-toggle="pill" href="#${element.nom}" role="tab" aria-controls="${element.nom}" aria-selected="false">${element.nom}</a></li>`
            $tab += `<div class="tab-pane fade show" id="${element.nom}" role="tabpanel" aria-labelledby="${element.nom}-tab"><div class="row gallery-item"></div></div>`
        }
    });

    nav.innerHTML = $li 
    
    container.innerHTML = $tab

    jsonType.data.forEach(type => {
        let div = document.querySelector("#"+type.nom+" .gallery-item")
         let $html = []
         json.data.forEach(element => {
             if(type.nom == element.type.nom){
                 $html.push(`<div class="col-md-4"><a href="animal/show.html?id=${element.id}" class="img-gal" title="voir"><div class="single-gallery-image" style="background: url(img/animal-3.jpg);"><span>${element.race}</span></div></a></div>`)
             }
         });
         div.innerHTML = $html.join('')
    })
    


}




getData()