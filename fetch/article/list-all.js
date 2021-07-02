const getArticles = async () =>  {

    const req =  await fetch(`${URI}/article`)
    const json = await req.json()

    let container = document.getElementById("list-article")
    let $html = ""

    if(json.data.length > 0){
        json.data.forEach(element => {
            $html += `<div class="single-blog col-lg-4 col-md-4">							
            <a href="#">
                <h4>${element.titre}
                Kitchen Finding Reliable Sellers</h4>
            </a>
            <p>
        ${element.contenu}    </p>
        </div>`    
        });
        container.innerHTML = $html

    }else{
        container.innerHTML = "<p>Liste vide</p>"
    }
    
}

getArticles();