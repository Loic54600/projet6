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

            const icon = document.createElement("spawn");
            icon.classList.add("fa-solid", "fa-trash-can"); 
            projectContainermodal.appendChild(icon);

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






//Permet au click du bouton d'appeller la modal-photo //
document.getElementById('btn-edition').addEventListener('click', function() {
    document.getElementById('overlayphoto').classList.add('visible');
    document.getElementById('modalphoto').classList.add('visible');
});

//Function ajouter une photo//
const buttonvalider = document.querySelector(".buttonvalider");
buttonvalider.addEventListener("click", ajouterimage);

async function ajouterimage(event) {
    event.preventDefault(); 

    const image = document.querySelector(".photo").files[0];
    const title = document.querySelector(".input-title").value;
    const categoryId = document.querySelector(".categorie").value;
    //si aucune information "alert" de remplissage des champs//
    if (title === "" || categoryId === "" || image === undefined) {
        alert("Remplissez tous les champs");
        return;
    } 
    //Sinon si aucune catégorie choissie "alert" remplissage de catégorie//
    else if (categoryId !== "1" && categoryId !== "2" && categoryId !== "3") {
        alert("Choisissez une catégorie valide");
        return;
        } 
    else {
        
    try {
        //variable creation du formulaire image//
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", categoryId);
        formData.append("image", image);
        //Envoie les données du formulaire dans le local//
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        //Si le formulaire est correct ajout du projet//
        if (response.status === 201) {
            alert("Projet ajouté avec succés");
            modaleProjets(dataAdmin);
            backToModale(event);
            generationProjets(data, null);
            
        } 
        //Sinon si la reponse est 400 "console" remplir tous les chants informations//
        else if (response.status === 400) {
            alert("Merci de remplir les données demandées");
        } 
        //sinon si la reponse est 500 "console" affiche erreur//
        else if (response.status === 500) {
            alert("Erreur");
        } 
        //sinon si la reponse est 401 aucune autorisation d'ajouter un projet//
        else if (response.status === 401) {
            alert("Vous n'avez pas l'autorisation d'ajouter un projet");
            //retour a la page d'acceuil//
            window.location.href = "login.html";
    }}

    catch (error) {
        console.log(error);
}}}






  
    
      
    
