url = "http://localhost:3000/cats";
let dbDogs = [];
const dogCardsContainer = document.querySelector('.dogCardsContainer');
const deletePage = document.querySelector('.deletePage');
let elemToDelete = '';
let idToDelete = 0;

const readData = (dbDogs) =>{
    const data = fetch(url)
    .then((data) =>{
        return data.json();
    })
    .then((response)=>{
        dbDogs = response;
        dogCardsAccum(dbDogs)
    })
}

readData(dbDogs);

function dogCardsAccum(dbDogs){
    let dogItemsAccumulated = '';

    dbDogs.forEach(dogItem => {

        dogItemsAccumulated += `<article class="dogCard" id='${dogItem.id}'>
        <div class="none">
            <div class="icons">
                <div class="edit ">
                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6.5873V1L5.28571 3.03175L16 13.1905L11.9821 17L1 6.5873Z" stroke="#A1A1A1"/>
                    </svg>

                </div>
                <div class="deleteBtn ">
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1.06066" y1="1.93934" x2="13.0607" y2="13.9393" stroke="#A1A1A1" stroke-width="3"/>
                        <line x1="13.0607" y1="2.06066" x2="1.06066" y2="14.0607" stroke="#A1A1A1" stroke-width="3"/>
                        </svg>


                </div>
            </div>
        </div>
        <div class="center">
            <div class="imgContainer"><img src="${dogItem.img}" alt="Cobu" class="dogImg"></div>
            <h2 class="dogName">${dogItem.name}</h2>
            <p><span class="telefono">${dogItem.telefono} |</span><span class="correo"> Correo</span></p>
            <p class="pais">${dogItem.pais}</p>
            <p class="description">${dogItem.descripcion}</p>
        </div>
    </article>
`
    });
    printCards(dogItemsAccumulated);
}

function printCards(dogItemsAccumulated){
    dogCardsContainer.innerHTML='';
    dogCardsContainer.innerHTML=dogItemsAccumulated;

    loadListeners();
}

function loadListeners(){
    dogCardsContainer.addEventListener('click', showButtons);
}

function showButtons(e){
     if (e.target.parentElement.classList.contains('deleteBtn')){

        elemToDelete = e.target.parentElement.parentElement.parentElement.parentElement;
        idToDelete= e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
        console.log(idToDelete);
        showDeletePage();
        loadListenerDeletePage(elemToDelete);

     };
}



function loadListenerDeletePage(elemToDelete){

    deletePage.addEventListener('click', deletePageButtons);
    
}

function deletePageButtons(e){
    if(e.target.classList.contains('CancelarBtn')){
        dissapearDeletePage();
    }

    if(e.target.classList.contains('aceptarBtn')){
        removeElement(elemToDelete);
        // BORRAR BASE DE DATOS

    }

}


function removeElement(elemToDelete){
    elemToDelete.remove();
    dissapearDeletePage();
    deleteInServer();
    
}

function showDeletePage(){
    deletePage.parentElement.classList.remove('none');
}

function dissapearDeletePage(){
    deletePage.parentElement.classList.add('none');
}

function deleteInServer(){

    const options = {
        method: 'DELETE',
    }
    
    try{
        fetch(`${url}/${idToDelete}`, options)
        .then(res=>{
            console.log(res.status);
            return res.json();
            
        })
        .then(data=>{
            console.log(data);
        })
    } catch (error) {
      console.log('Error: ' + error);
    }
}
