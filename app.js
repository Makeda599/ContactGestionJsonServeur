import { saisiUser,afficheAllCard,rechargerFormulaire,getAllChecked,getAllTotalContact,pageSuivante, pagePrecedente,afficheUnCard,setRecherche} from "./js/service/contactService.js";
import { form,prenom,nom,email,telephone,selectRole,btnAjouter, listeContacts,btnToutSupprimer,btnPrev,btnInfo,btnNext,inputRecherche} from "./js/dom/element.js";
import { ajoutUser, getAllUsers, modifierUser,supprimerUser } from "./js/store/contactStore.js";
import { afficherSucces } from "./js/ui/modalRenderer.js";
import {verifMail,verifData,verifTelephone, resetErrors,afficherErreurs} from "./js/validation/validation.js";

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
        let id = btnSupp.dataset.id
        await supprimerUser(id)
        afficherSucces("Contact supprimé avec succès")
    }
    if(checkeds){
        let allUsersCheked = getAllChecked()
        idsCocher =  allUsersCheked.map(co => co.dataset.id)
        console.log(idsCocher)
    }
})
btnToutSupprimer.addEventListener("click", async function(){
    if(idsCocher.length >= 3){
             btnToutSupprimer.style.color ="red"
                let promesse = idsCocher.map(id => supprimerUser(id))
                await Promise.all(promesse)
            }
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
await afficheAllCard()