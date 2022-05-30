const URL_BASE = "https://6282cc5038279cef71cd0768.mockapi.io/Jobs"
const queryId = (id) => document.getElementById(id);
const spinneRender = document.querySelector('.loading__container--img')


const spinner = () =>{
    spinneRender.style.display = 'block'
}

const getJob = () => {
    fetch(`${URL_BASE}`)
        .then(res => res.json())
        .then(data => renderCards(data))
        .catch(err => console.log(err))
}
getJob()

const jobDetail = (id) => {
    fetch(`${URL_BASE}/${id}`)
        .then((response) => response.json())
        .then((data) => renderCardsDetails(data))
        .catch((error) => console.log(error));
    globalId = id
}
//jobDetail(1)

const container__cards = document.querySelector('.container__cards')

const renderCards = (jobs) =>{
    container__cards.innerHTML = ''
    spinner()
    setTimeout(() =>{
        spinneRender.style.display = 'none'

        for( const { name, description, location, category, seniority, id } of jobs){
        container__cards.innerHTML += `
        <div class="container__cards--cards">
            <img src="img/pensar.png" width="20%">
            <h2>${name}</h1>
            <p>${description}</p>
            <div class="span__card">
                <span class="span__card--s">${location}</span>
                <span class="span__card--s">${category}</span>
                <span class="span__card--s">${seniority}</span>
            </div>
            <button class="btn btn-details" onclick="jobDetail(${id})">See Details</button>
        </div>
    `
    }
    },1000)
}

let globalId, nameJob, descriptionJob, locationJob, categoryJob, seniorityJob

const renderCardsDetails = (job) =>{
    const {name, description, location, category, seniority, id }= job
    

    nameJob = name
    descriptionJob = description
    locationJob= location
    categoryJob = category
    seniorityJob = seniority

    container__cards.innerHTML = ''
    spinner()

    setTimeout(() =>{
        spinneRender.style.display = 'none'

        container__cards.innerHTML = `
    <div class="container__cards--details">

        <img src="img/rechazar.png" width="10%" class="div__img--imagen">

        <div class="div__info">

            <h2>${name}</h2>

            <p><span>Description:</span> ${description}</p>

            <div class="span__carddetail">
                <p class="span__card--p"><span>Location: </span>${location}</p>
                <p class="span__card--p"><span>Category: </span>${category}</p>
                <p class="span__card--p"><span>Seniority: </span>${seniority}</p>
            </div>
        </div>

        <div class="div__btn">
            <button class="div__btn--edit" id="edit" onClick="showForm(globalId)">Edit job</button>
            <button class="div__btn--delet" id="delete" onClick="alertShow()">Delete job</button>
        </div>

    </div>`;

    },2000)
    
}

//POST

const createJob = () =>{

    container__cards.innerHTML = ''
    spinner()

    setTimeout(() =>{
        spinneRender.style.display = 'none'

        container__cards.innerHTML = `
        <form id="form__container">   
            <label for="">Job title:</label>
            <input type="text" class="form__container--input" placeholder="Job title here" id="nameCard">

            <label for="">Description:</label>
            <textarea name="" id="descriptionCard" cols="30" rows="10" class="form__container--input">Work description</textarea>

            <div>

              <label for="">Tags:</label>
              <input type="text" class="form__container--input" placeholder="Location" id="locationForm">
              <input type="text" class="form__container--input" placeholder="Seniority" id="seniorityForm">
              <input type="text" class="form__container--input" placeholder="Category" id="categoryForm">

            </div>

            <button class="btn btn-submit" type="submit" id="submit" onClick="submitCreateJob(event)">Submit</button>
        </form>
        `   

    },2000)

}


const btnCreateJob = document.getElementById('createJob')
btnCreateJob.addEventListener('click', createJob)

const saveData = () =>{
    return {
        name: document.getElementById('nameCard').value,
        description: document.getElementById('descriptionCard').value,
        location: document.getElementById('locationForm').value,
        category: document.getElementById('categoryForm').value,
        seniority: document.getElementById('seniorityForm').value,
    }
}

//console.log(saveData())

const submitCreateJob = (e) =>{

    e.preventDefault();
    
    fetch (`${URL_BASE}`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(saveData()) 
    })
   
    .then(() => setTimeout(getJob(),1000))
    .catch(error => console.log(error)) 
}  
//console.log (submitCreateJob())

/*queryId('createJob').addEventListener('click', (e) => {
    e.preventDefault()
    queryId('forms_container').style.display = 'block'
}) NO LO TRAE
*/


//PUT

//let globalId, nameJob, descriptionJob, locationJob, categoryJob, seniorityJob

const showForm = (globalId) =>{
    container__cards.innerHTML = `

    <form id="form__container">   
        <label for="">Job title:</label>
        <input type="text" class="form__container--input" placeholder="Job title here" id="nameCard" value="${nameJob}">

        <label for="">Description:</label>
        <textarea name="" id="descriptionCard" cols="30" rows="10" class="form__container--input">${descriptionJob}</textarea>

        <div>

            <label for="">Tags:</label>
            <input type="text" class="form__container--input" placeholder="Location" id="locationForm" value="${locationJob}">
            <input type="text" class="form__container--input" placeholder="Seniority" id="seniorityForm" value="${seniorityJob}">
            <input type="text" class="form__container--input" placeholder="Category" id="categoryForm" value="${categoryJob}">

        </div>

        <button class="btn btn-submit" type="submit" id="submit" onClick="editJob(event)">Submit</button>
    </form>
    `   

}

//console.log(showForm())

const editJob = (globalId, (e)=> {
    e.preventDefault()

    fetch(`${URL_BASE}/${globalId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveData())
    })
    .then(()=> jobDetail(globalId))
    .catch(err => console.log(err))
})


//Delete

const deleteJob = (id) => {
    fetch(`${URL_BASE}/${id}`, {
        method: "DELETE"
    })

    .then(() => setTimeout(getJob(),2000))
    .catch(err => console.log(err))
}


const alertShow = () => {
    container__cards.innerHTML += `
        <div class="alertDelete" role="alert">
            Are you sure you want to delete this jobs?
            <button class="btn btn-cancel" id="cancel" onClick="jobDetail(globalId)">Cancel</button>
            <button class="btn btn-delete" id="delete"" onClick="deleteJob(globalId)">Delete</button>
        </div>
    `

}


//FILTER


const filterData = () =>{

    let search = {
        location: document.getElementById('locationSearch').value,
        category: document.getElementById('categorySearch').value,
        seniority: document.getElementById('senioritySearch').value,
    };

    fetch(`${URL_BASE}`)
    .then((res) => res.json())
    .then((data) => {
        renderCardsDetails(
          data.filter(
            ({ location, seniority, category }) =>
              location === search.location ||
              seniority === search.seniority ||
              category === search.category
          )
        );
      })
    .catch(err => console.log(err));



   const btnSearch = document.getElementById('search')
   btnSearch.addEventListener('click', (e) =>{
       e.preventDefault();
       setTimeout(()=>{
           filterData(
            document.getElementById('locationSearch').value,
            document.getElementById('categorySearch').value,
            document.getElementById('senioritySearch').value,
           )

       },2000)
    })


   const btnClear = document.getElementById('clear')
   btnClear.addEventListener('click', (e) =>{
       e.preventDefault();
       dovument.getElementById('locationSearch').value = ""
       document.getElementById('categorySearch').value = ""
       document.getElementById('senioritySearch').value = ""
       getJob()
   })

}

