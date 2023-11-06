//Variable //
const email = document.querySelector("#email")
const pwd = document.querySelector("#pwd")
const error = document.querySelector(".error");

//Variable Error //
const EmailError = document.querySelector(".email_error")
const PwdError = document.querySelector(".pwd_error")

//Variable connexion //
const submit = document.querySelector("#submit")
const form = document.querySelector('form')

//Fonction de connexion //
function login(id) {
    EmailError.innerHTML = "";
    PwdError.innerHTML = "";
    let sendData = true;
    //Vérification message error (Email)//
    if (id.email.length === 0) {
        const p = document.createElement("p");
        //Message erreur //
        p.innerHTML = "Email non valide";
        EmailError.appendChild(p);
        sendData = false
    }
    //Vérification message error (password = Mot de passe)//
    if (id.password.length === 0) {
        const p = document.createElement("p");
        //Message erreur //
        p.innerHTML = "Mot de passe non valide";
        PwdError.appendChild(p);
        sendData = false
    }
    if (sendData) {
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(id)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                //si le resultat ne correspond pas, un message d'erreur s'affiche //
                if (result.error || result.message) {
                    const p = document.createElement("p");
                    p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
                    PwdError.appendChild(p);
                    //Si le token est correct, il a connexion //
                } 
                else if (result.token) {
                    localStorage.setItem("token", result.token);
                    // retour a la page index si connexion //
                    window.location.href = "index.html";
                }
            })
            //error de log //
            .catch(error =>
                console.log(error));
    }
}

//Connexion//
// Permet au click d'envoyer les données Email, Pwd(mot de passe) //
submit.addEventListener("click", () => {
        let user = {
            email: email.value,
            password: pwd.value
        };
        login(user);
    }
)
//Envoie les données du formulaire //
form.addEventListener('submit', (e) => {
    console.log('in')
        e.preventDefault();
    }
)

const Supprtokken = document.querySelector(".error");

//Si la personne est déjà connecter, on supprime le token //
function deleteToken() {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");

        const p = document.createElement("p");
        //Message de reconnexion //
        p.innerHTML = "Veuillez vous reconnecter";
        Supprtokken.appendChild(p);
    }
}

deleteToken()