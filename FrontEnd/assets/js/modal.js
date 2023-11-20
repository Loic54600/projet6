//Variable récupération du token + class//
const token = localStorage.getItem("token");
const Codeco = document.querySelector(".codeco");

//Fonction changement de connexion en déconnexion//
adminDeco();

function adminDeco() {
    document.querySelectorAll(".deconnexion").forEach(a => {
        if (token === null) {
            return;
        } else {
            //change le texte//
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
        } else {
            //enleve le style display none//
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
        } else {
            a.removeAttribute("style");
        }
    });
}

//Permet au click du bouton d'appeller la modal //
document.getElementById('btn-modal').addEventListener('click', function () {
    document.getElementById('overlay').classList.add('visible');
    document.getElementById('modal').classList.add('visible');
    modalaffiche();
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

            const icon = document.createElement("span");
            icon.classList.add("fa-solid", "fa-trash-can");
            projectContainermodal.appendChild(icon);
            supprimg(icon, project.id, projectContainermodal)

            //Renvoie les données dans la gallery//
            sectiongallerymodal.appendChild(projectContainermodal);
        }
    );
}


//fonction affiche la gallery dans la modal//
function modalaffiche() {
    getProjects().then((projectsmodal) => {
        affichagegallerymodal(projectsmodal, null, sectiongallerymodal);
    })
}

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
    } else {

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
        } catch (error) {
            console.log(error);
        }
    }
}

//Permet au click du bouton d'appeller la modal-photo //
document.getElementById('btn-edition').addEventListener('click', function () {
    document.getElementById('overlayphoto').classList.add('visible');
    document.getElementById('modalphoto').classList.add('visible');
});

//Fonction supprimer image//
function supprimg(btnSuppr, id, modalObject) {
    const galleryProject = document.querySelector(`#project${id}`)
    btnSuppr.addEventListener("click", async () => {
        await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                if (response.status === 204) {
                    modalObject.remove();
                    galleryProject.remove()
                    console.log("Image supprimé")
                }
            })
            .catch(error => {
                console.log(error)
            })
    })
}


//Permet l'affichage des images lors de la selection dans la modal//
    const loadFile = function(event) {
    const reader = new FileReader();
    reader.onload = function(){
      const output = document.getElementById('img-test');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};
