const btnId0 = document.querySelector(".filter_btn-id-0");
const btnId1 = document.querySelector(".filter_btn-id-1");
const btnId2 = document.querySelector(".filter_btn-id-2");
const btnId3 = document.querySelector(".filter_btn-id-3");

const sectiongallery = document.querySelector(".gallery");

//fonction de recherche de document//
async function getProjects() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}
//fonction affiche les données de la gallery //
function affichagegallery(projects, idFiltre) {
    if (idFiltre !== null) {
        projects = projects.filter(projects => projects.categoryId === idFiltre);
    }
//placement dans la div gallery //
    sectiongallery.innerHTML = '';

    projects.forEach((project) => {
            //Récupération des projets //
            const projectContainer = document.createElement('figure');

            //Récupération de l'image //
            const image = document.createElement('img');
            image.src = project.imageUrl;
            //descriptif de l'image//
            image.setAttribute('alt', project.title);
            projectContainer.appendChild(image);

            //Récupération du titre //
            const title = document.createElement('figcaption');
            title.innerHTML = project.title;
            projectContainer.appendChild(title);

            //Renvoie les données dans la gallery//
            sectiongallery.appendChild(projectContainer)
        }
    );
}

//fonction changement de couleur des boutons //
function filterbtonActive(filtre) {
    //Supprime la classe du filtre actuel
    const filtreActuel = document.querySelector('.filter_btn-active');
    filtreActuel.classList.remove('filter_btn-active')
    //Active la classe pour changmennt de couleur //
    filtre.classList.add('filter_btn-active');
}

changeId();

//Change l'affichage au moment du click par rapport a l'id//
function changeId() {

    getProjects().then((projects) => {
        affichagegallery(projects, null, sectiongallery);
        //bouton btnId0 = "Tous" // click fonction affiche toute la galerie //
        btnId0.addEventListener('click', () => {
            //affiche toutes les id //
            affichagegallery(projects, null, sectiongallery);
            //active la classe ('filter_btn-active')//
            filterbtonActive(btnId0);
        });
        //bouton btnId1 = "Objets" // click fonction affiche les images de la galerie sous id "1" //
        btnId1.addEventListener('click', () => {
            // affiche toutes les id 1 //
            affichagegallery(projects, 1, sectiongallery);
            filterbtonActive(btnId1);
        });
        //bouton btnId2 = "Appartements"//
        btnId2.addEventListener('click', () => {
            affichagegallery(projects, 2, sectiongallery);
            filterbtonActive(btnId2);
        })
        //bouton btnId3 = "Hotels et restaurants"//
        btnId3.addEventListener('click', () => {
            affichagegallery(projects, 3);
            filterbtonActive(btnId3);
        })
    })
}