//Variable//
const  Email = document.querySelector (".email")
const  Pwd = document.querySelector (".pwd")

//Variable Error//
const EmailError = document.querySelector (".email_error")
const PwdError = document.querySelector (".pwd_error")

//Variable connexion//
const submit = document.querySelector (".submit")


// Fonction de connexion
function login(id) {

    console.log(id);
    EmailError.innerHTML = "";
    PwdError.innerHTML = "";

    //Vérification des caractère et message error (Email)//
    if (!id.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
        const p = document.createElement("p");
        p.innerHTML = "Email non valide";
        EmailError.appendChild(p);
        return;
        }

    //Vérification des caractère et message error (pwd = Mot de passe)//
    if (id.pwd.length < 5 && !id.pwd.match(/^[a-zA-Z0-9]+$/g)) {
        const p = document.createElement("p");
        p.innerHTML = "Mot de passe non valide";
        PwdError.appendChild(p);
        return;
        }
        // Si couple email/mdp correct
    else if (result.token) {
        localStorage.setItem("token", result.token);
        window.location.href = "index.html";
    }
    
 }

//Connexion//
// Permet au click d'envoyer les données Email, Pwd(mot de passe) //
submit.addEventListener("click", () => {
    let user = {
        Email: email.value,
        Pwd: pwd.value
    };

    login(user);
})