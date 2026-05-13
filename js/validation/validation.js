import { users } from "../store/contactStore.js"

export function verifMail(email, idModifier){
    const verif = users.find(u => u.email === email)
    if(!verif) return 0
    if (idModifier != null && String(verif.id) === String(idModifier)) return 0 
    return 1
}

export function verifTelephone(telephone, idModifier){
    const verif = users.find(u => u.telephone === telephone)
    if(!verif) return 0
    if (idModifier != null && String(verif.id) === String(idModifier)) return 0 
    return 1
}

  export function verifData(nom,prenom,email,telephone,selectRole,idModifier){
    let errors = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^(70|75|76|77|78)[0-9]{7}$/
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/
    if (nom === ""){
        errors.nom = "veuillez remplir le nom" 
    }else if(!nameRegex.test(nom)){
        errors.nom = "Le nom doit contenir que des lettres"
    }
    if (prenom === ""){
        errors.prenom = "veuillez remplir le prenom" 
    }else if(!nameRegex.test(prenom)){
        errors.prenom = "Le prenom doit contenir que des lettres"
    }
    if (email === ""){
        errors.email = "veuillez remplir le email" 
    }else if(!emailRegex.test(email)){
         errors.email = "Email invalide"
    }
    //verification de mail unique
    const verifEmail = verifMail(email,idModifier)
    if(verifEmail === 1){
        errors.email = "L'email doit être unique"
    }
    if (telephone === ""){
        errors.telephone = "veuillez remplir le telephone" 
    } else if(!phoneRegex.test(telephone)){
        errors.telephone = "Numéro sénégalais invalide"
    }
    //telephone unique
    const verifTel = verifTelephone(telephone,idModifier)
    if(verifTel === 1){
        errors.telephone = "Le numéro de téléphone doit être unique"
    }
    if (selectRole === ""){
        errors.selectRole = "veuillez remplir le selectRole" 
    }


    return errors
   }

 
  export function resetErrors(){
    const errorSpans = document.querySelectorAll('[id$="Error"]')

    errorSpans.forEach(span => {
        span.textContent = ""
    })
    }

  export function afficherErreurs(errors){
    resetErrors()

    if(errors.prenom){
        document.getElementById("prenomError").textContent = errors.prenom
        document.getElementById("prenomError").style.color = "red"
    }

    if(errors.nom){
        document.getElementById("nomError").textContent = errors.nom
        document.getElementById("nomError").style.color = "red"
    }

    if(errors.email){
        document.getElementById("emailError").textContent = errors.email
        document.getElementById("emailError").style.color = "red"
    }

    if(errors.telephone){
        document.getElementById("telephoneError").textContent = errors.telephone
        document.getElementById("telephoneError").style.color = "red"
    }
    if(errors.selectRole){
        document.getElementById("roleError").textContent = errors.selectRole
        document.getElementById("roleError").style.color = "red"
    }

    }