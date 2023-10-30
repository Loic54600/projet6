//Variable récupération du token + class//
const token = localStorage.getItem("token");
const Codeco = document.querySelector(".codeco");

//Fonction changement de connexion en déconnexion//
adminDeco();

function adminDeco() {
    document.querySelectorAll(".deconnexion").forEach(a => {
        if (token === null) {
            return;
        }
        else {
          a.removeAttribute("aria-hidden")
            a.removeAttribute("style")
            Codeco.innerHTML = "deconnexion";
        }
    });
}
//Fonction affiche le bouton "modifier"//
modifier();

function modifier() {
  document.querySelectorAll(".btn-modal").forEach(a => {
      if (token === null) {
          return;
      }
      else {
          a.removeAttribute("style");
      }
  });
}
//fonction affiche le header edition si conencter//
edition();

function edition() {
  document.querySelectorAll(".edition").forEach(a => {
      if (token === null) {
          return;
      }
      else {
          a.removeAttribute("style");
      }
  });
}

//Permet au click du bouton d'appeller la modal //
document.getElementById('btn-modal').addEventListener('click', function() {
    document.getElementById('overlay').classList.add('visible');
    document.getElementById('modal').classList.add('visible');
  });

//Ajout de la galerie dans la modal//
const sectiongallerymodal = document.querySelector(".gallery-modal");

async function getProjectsmodal() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}
function affichagegallerymodal(projectsmodal) {
    if (projectsmodal !== null) {
        projectsmodal = projectsmodal.filter(projectsmodal => projectsmodal.categoryId);
    }
//placement dans la div gallery //
sectiongallerymodal.innerHTML = '';

projectsmodal.forEach((project) => {
            //Récupération des projets //
            const projectContainermodal = document.createElement('figure');

            //Récupération de l'image //
            const image = document.createElement('img');
            image.src = project.imageUrl;
            //descriptif de l'image//
            image.setAttribute('alt', project.title);
            projectContainermodal.appendChild(image);

           // const icon = document.createElement("");
           // icon.classList.add("fa-solid", "fa-trash-can"); 
           // p.appendChild(icon);

            //Renvoie les données dans la gallery//
            sectiongallerymodal.appendChild(projectContainermodal)
        }
    );
}
modalaffiche();
//function affiche la gallery dans la modal//
function modalaffiche() {

    getProjects().then((projectsmodal) => {
        affichagegallerymodal(projectsmodal, null, sectiongallerymodal);     
    })
}
//Function supprime une image//



//Modal-photo//
//Permet au click du bouton d'appeller la modal-photo //
document.getElementById('btn-edition').addEventListener('click', function() {
    document.getElementById('overlayphoto').classList.add('visible');
    document.getElementById('modalphoto').classList.add('visible');
});



//fonction ajouter un projet//
const title = document.querySelector(".input-title").value;
const categoryId = document.querySelector(".categorie").value;
const image = document.querySelector(".photo").files[0];







  
    
      
    
