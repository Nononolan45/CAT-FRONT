const getData = async() =>{

    const req =  await fetch("http://127.0.0.1:5000/animaux/last")
    const json = await req.json()
   
    let container = document.getElementById("section-last-pet")
    let $html = ""

    if(json.data.length > 0){
        json.data.forEach(element => {
            $html += `<div class="col-lg-2 col-md-6 single-team"><div class="thumb"><img class="img-fluid" src="img/animal-1.jpg" alt=""></img><div class="align-items-center justify-content-center d-flex"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a></div></div><div class="meta-text mt-30 text-center"><h4>${element.race}</h4><a href="animal/show.html?id=${element.id}" class="primary-btn squire mx-auto mt-20">En savoir +</a></div></div>`    
        });
    
        container.innerHTML = $html

    }else{
        container.innerHTML = "<p>Liste vide</p>"
    }


}


getData()

