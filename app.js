import { saisiUser,afficheAllCard,rechargerFormulaire,getAllChecked,getAllTotalContact,pageSuivante, pagePrecedente,afficheUnCard,setRecherche} from "./js/service/contactService.js";
import { form,prenom,nom,email,telephone,selectRole,btnAjouter, listeContacts,btnToutSupprimer,btnPrev,btnInfo,btnNext,inputRecherche,modalConfirm,confirmTexte,confirmOui,confirmNon,toutSelectionner,formLogin,inputLogin,inputPassword,loginError,btnDeconnexion,nomUser} from "./js/dom/element.js";
import { ajoutUser, getAllUsers, modifierUser,supprimerUser } from "./js/store/contactStore.js";
import { afficherSucces } from "./js/ui/modalRenderer.js";
import {verifMail,verifData,verifTelephone, resetErrors,afficherErreurs} from "./js/validation/validation.js";
import { navigate } from "./js/router/router.js";
import { loginUser, logoutUser, getSession, isLoggedIn } from "./js/store/authStore.js";

// LOGIN
function init() {
  if (isLoggedIn()) {
    ouvrirApp(getSession());
  } else {
    navigate('login');
  }
}
async function ouvrirApp(session) {
  navigate('app');  
  nomUser.textContent = session.nom;
  await afficheAllCard();
}

formLogin.addEventListener("submit", async function(event) {
  event.preventDefault();
  loginError.textContent = ""; 
  const loginVal = inputLogin.value.trim();
  const passVal  = inputPassword.value.trim();

  if (!loginVal || !passVal) {
    loginError.textContent = "Remplissez tous les champs.";
    return;
  }

  const resultat = await loginUser(loginVal, passVal);

  if (!resultat.ok) {
    loginError.textContent = resultat.message; 
    return;
  }

  
  formLogin.reset();
  await ouvrirApp(resultat.user);
});

btnDeconnexion.addEventListener("click", function() {
  logoutUser();           
  navigate('login');      
  formLogin.reset();
});




//CONTACT 

let idModifier = null 
form.addEventListener("submit",async function(event){
        event.preventDefault()
        let prenomValue = prenom.value.trim()
        let nomValue = nom.value.trim()
        let emailValue = email.value.trim()
        let telephoneValue = telephone.value.trim()
        let selectRoleValue = selectRole.value.trim()

        let errors = verifData(nomValue,prenomValue,emailValue,telephoneValue,selectRoleValue,idModifier)
        if(Object.keys(errors).length > 0){
            afficherErreurs(errors)
            return
        }
        if(idModifier === null){
            let newUser = saisiUser(prenomValue,nomValue,emailValue,telephoneValue,selectRoleValue)
            await ajoutUser(newUser)
           
            afficherSucces("contact ajouté avec succés")
        }else{
            let modifUser= saisiUser(prenomValue,nomValue,emailValue,telephoneValue,selectRoleValue)

            await modifierUser(idModifier, modifUser)
            afficherSucces("Contact modifié avec succès")
            idModifier = null                        
            btnAjouter.textContent = "Ajouter"    
            
        }
       await afficheAllCard()  
        form.reset()
})

let idsCocher  =[]
let idSupprimer
listeContacts.addEventListener("click",async function(event){
    const btnSupp = event.target.closest(".btn-supprimer")
    const btnModifier = event.target.closest(".btn-modifier")
    const checkeds = event.target.closest(".cocher")
    // console.log(btnModifier)
    if (btnModifier){
        let id = btnModifier.dataset.id
        idModifier = await rechargerFormulaire(id)
    }
    if(btnSupp){
        idSupprimer = btnSupp.dataset.id
        // console.log(btnSupp)
        modalConfirm.classList.remove("hidden")
        // console.log(modalConfirm)
        confirmTexte.textContent = "Voulez-vous vraiment supprimer cet contact"
        
    }
    if(checkeds){
        let allUsersCheked = getAllChecked()
        idsCocher =  allUsersCheked.map(co => co.dataset.id)
        // console.log(idsCocher)
        if(idsCocher.length >= 3){
             btnToutSupprimer.classList.remove("hidden")
             btnToutSupprimer.style.backgroundColor ="red"
              btnToutSupprimer.style.color ="white"
             console.log(btnToutSupprimer)
}
    }
})
//  console.log(idsCocher)


toutSelectionner.addEventListener("change", async function() {
    const toutesLesCheckbox = document.querySelectorAll(".cocher")

    toutesLesCheckbox.forEach(checkbox => {
        if (checkbox.checked !== toutSelectionner.checked) {
            checkbox.checked = toutSelectionner.checked
            checkbox.dispatchEvent(new Event("change"))
        }
    })

    if (toutSelectionner.checked) {
        idsCocher = Array.from(toutesLesCheckbox).map(co => co.dataset.id)
        btnToutSupprimer.classList.remove("hidden")
        btnToutSupprimer.style.color = "red"
    } else {
        idsCocher = []
        btnToutSupprimer.classList.add("hidden")
    }
})








btnToutSupprimer.addEventListener("click", async function(){
                    confirmTexte.textContent = "Voulez-vous vraiment supprimer ces contacts"

                let promesse = idsCocher.map(id => supprimerUser(id))
                await Promise.all(promesse)
            })
confirmOui.addEventListener("click", async function(){
    await supprimerUser(idSupprimer)
    afficherSucces("Contact supprimé avec succès")
})
confirmNon.addEventListener("click", async function(){
            modalConfirm.classList.add("hidden")

})
// NOMBRE DE CONTACTS
let total = await getAllTotalContact()
compteur.textContent = `${total} contacts`


//ACTION Pagination



btnPrev.addEventListener("click",async function(){
    pagePrecedente() 
})
btnNext.addEventListener("click",async function(){
   pageSuivante()
})

inputRecherche .addEventListener("input",async function(){
   setRecherche(inputRecherche.value)
    // listeContacts.innerHTML=""
    // // console.log(inputRecherche.value)
    // tab.forEach(t=>afficheUnCard(t))
})

init()