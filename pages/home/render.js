function renderCards(array) {
    const ul = document.querySelector(".cards");

    array.map(element => {
        ul.append(createCard(element));
    })
    addApplyAndRemoveApplyFromBtn();
    renderAsideCards(candidacies);
}

function renderAsideCards(array) {
    const ul = document.querySelector(".cards-selected");
    const message = document.querySelector(".none-selected");
    ul.innerHTML = "";
    if(array.length > 0) {
        array.map(element => {
            ul.append(createAsideCard(element));
        })
        message.style.display = "none";
        removeApply();
    } else { 
        message.style.display = "block";
        message.innerText = "Você ainda não aplicou para nenhuma vaga";
    }
}

function getJobsData() {
    const jobsDataJSON = localStorage.getItem('jobsData')
  
    if(jobsDataJSON) {
        const dataInLocalStorage = JSON.parse(jobsDataJSON)   
        candidacies = dataInLocalStorage;
    } 
    renderCards(jobsData);
}

getJobsData();


