//Variable récupération du token + class//
const Token = localStorage.getItem("token");
const Codeco = document.querySelector(".codeco");

//Fonction changement de connexion en déconnexion//
adminDeco()

function adminDeco() {
    document.querySelectorAll(".deconnexion").forEach(a => {
        if (Token === null) {
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
modifier()

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
//Permet au click du bouton d'appeller la modal //
document.getElementById('btn-modal').addEventListener('click', function() {
    document.getElementById('overlay').classList.add('visible');
    document.getElementById('modal').classList.add('visible');
  });

//Ajout de la galerie dans la modal//




//Permet au click du bouton d'appeller la modal "ajout photo"//




//Genere le bouton "modifier une fois connecter"//












  
    
      
    
