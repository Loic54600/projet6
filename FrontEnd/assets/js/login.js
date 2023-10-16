//Variable//
const email = document.querySelector("#email")
const pwd = document.querySelector("#pwd")

//Variable Error//
const EmailError = document.querySelector(".email_error")
const PwdError = document.querySelector(".pwd_error")

//Variable connexion//
const submit = document.querySelector("#submit")
const form = document.querySelector('form')

// Fonction de connexion
function login(id) {

    EmailError.innerHTML = "";
    PwdError.innerHTML = "";

    let sendData = true;

    //Vérification des caractère et message error (Email)//
    if (id.email.length === 0) {
        const p = document.createElement("p");
        p.innerHTML = "Email non valide";
        EmailError.appendChild(p);
        sendData = false
    }

    //Vérification des caractère et message error (pwd = Mot de passe)//
    if (id.pwd.length === 0) {
        const p = document.createElement("p");
        p.innerHTML = "Mot de passe non valide";
        PwdError.appendChild(p);
        sendData = false
    }


    if(sendData) {
        /*fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(id)
        })
            .then(response => response.json())
            .then(result => {
                /!* STOCKET TOKEN OU AVERTIR USER *!/
            })*/
    }
}

//Connexion//
// Permet au click d'envoyer les données Email, Pwd(mot de passe) //
submit.addEventListener("click", () => {
    let user = {
        email: email.value,
        pwd: pwd.value
    };

    login(user);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
})