function newLocalStorage(array) {   
    const newArrayJson = JSON.stringify(array)
    localStorage.setItem("jobsData", newArrayJson);
}

function createCard(object) {
    let li = document.createElement("li");
    li.classList.add("card");

    let span = document.createElement("span");
    span.innerText = object.title;

    let infoCard = document.createElement("div")
    infoCard.classList.add("info-card");

    let enterprise = document.createElement("span");
    enterprise.innerText = object.enterprise;

    let location = document.createElement("span")
    location.innerText = object.location;

    let description = document.createElement("p");
    description.innerText = object.description;

    let btnsCard = document.createElement("div");
    btnsCard.classList.add("btns-card");

    let divbtns = document.createElement("div");
    divbtns.classList.add("btns-modality");

    let modality = document.createElement("button");
    modality.classList.add("grey-button");
    modality.innerText = object.modalities[0];

    let modality2 = document.createElement("button");
    modality2.classList.add("grey-button");
    modality2.innerText = object.modalities[1];

    let apply = document.createElement("button");
    apply.classList.add("purple-button");
    apply.setAttribute("id", object.id)
    apply.innerText = "Candidatar"
    
    divbtns.append(modality,modality2)
    infoCard.append(enterprise, location);
    btnsCard.append(divbtns, apply);
    li.append(span,infoCard,description,btnsCard)
    return li;
}

function createAsideCard(object) {
    let li = document.createElement("li");
    li.classList.add("card-selected");

    let div = document.createElement("div");
    div.classList.add("title-card-selected")
    
    let title = document.createElement("p");
    title.innerText = object.title;

    let trashIcon = document.createElement("i");
    trashIcon.setAttribute("id", object.id)
    trashIcon.classList.add("fa-solid", "fa-trash" ,"icon");

    let infoCard = document.createElement("div")
    infoCard.classList.add("info-card");

    let enterprise = document.createElement("span");
    enterprise.innerText = object.enterprise;

    let location = document.createElement("span")
    location.innerText = object.location;

    let btn = document.getElementById(object.id);
    btn.innerText = "Remover Candidatura"

    div.append(title, trashIcon);
    infoCard.append(enterprise, location);
    li.append(div,infoCard);
    return li;
}

function addApplyAndRemoveApplyFromBtn() {
    const btnsApplies = document.querySelectorAll(".purple-button");
    btnsApplies.forEach(btn => {
        btn.addEventListener("click", (event)=> {

            if(btn.id === event.target.id) {
                if(btn.textContent == "Candidatar")  { 
                    let objElement = jobsData[btn.id];
                    if(!candidacies.find(objElement => objElement.id == btn.id)) {
                        candidacies.push(objElement);
                    }
                    newLocalStorage(candidacies);
                    renderAsideCards(candidacies);
                } else { 
                    btn.innerText = "Candidatar"; 
                    candidacies = candidacies.filter(candidacy => {
                        return candidacy.id != btn.id;
                    });
                    newLocalStorage(candidacies);
                    renderAsideCards(candidacies);
                }               
            }
        })
    })
}

function removeApply() {
    const btnsRemove = document.querySelectorAll(".fa-trash");
    const btnPurple = document.querySelectorAll(".purple-button");
    btnsRemove.forEach(btnRemove => {
        btnRemove.addEventListener("click", (event)=> {
        if(btnRemove.id === event.target.id) {
            btnPurple.forEach(btn => {
                if(btn.id == event.target.id) {
                    btn.innerText = "Candidatar";
                }
            })
        
            let jobs = [...jobsData];
            let objElement = jobs[btnRemove.id];
            if(candidacies.find(objElement => objElement.id == btnRemove.id)) {
                candidacies.splice(candidacies.indexOf(objElement), 1);
            }
            newLocalStorage(candidacies)
            renderAsideCards(candidacies);
        }
        })
    })
}