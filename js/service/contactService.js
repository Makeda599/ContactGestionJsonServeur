import { users, getAllUsers } from "../store/contactStore.js";
import { cardTemplate } from "../ui/cardRenderer.js";
import { formatDate } from "../utils/dateFormater.js";
import {
  listeContacts,
  prenom,
  nom,
  email,
  telephone,
  selectRole,
  btnAjouter,
} from "../dom/element.js";

export function saisiUser(prenom, nom, email, telephone, selectRole) {
  const user = {
    prenom: prenom,
    nom: nom,
    email: email,
    telephone: telephone,
    role: selectRole,
    date_creation: formatDate(new Date()),
  };
  console.log(user.date_creation);
  return user;
}

export function normalizeUser(rawUser) {
  return {
    id: rawUser.id,
    nom: rawUser.nom?.trim() ?? "",
    prenom: rawUser.prenom?.trim() ?? "",
    email: rawUser.email?.trim().toLowerCase() ?? "",
    telephone: rawUser.telephone?.trim() ?? "",
    role: rawUser.role ?? "user",
    date_creation: rawUser.date_creation ?? "",
  };
}

export function afficheUnCard(rawUser) {
  const user = normalizeUser(rawUser);
  const card = document.createElement("div");
  card.className = "carte-contact";
  card.innerHTML = cardTemplate(user);
  listeContacts.appendChild(card);
}

//  function afficheUnCard(user) {
//       const initiales = (user.prenom[0] + user.nom[0]).toUpperCase()

//       const card = document.createElement("div")
//       card.className = "carte-contact"
//       card.innerHTML = `
//         <div class="carte-entete">
//           <div class="avatar">${initiales}</div>
//           <div class="carte-nom">
//             <h3>${user.prenom} ${user.nom}</h3>
//             <span>${user.role}</span>
//           </div>
//         </div>
//         <div class="carte-infos">
//           <span>@ ${user.email}</span>
//           <span>☎ ${user.telephone}</span>
//           <span>✎ Ajouté le ${user.date}</span>
//         </div>
//         <div class="carte-actions">
//           <button class="btn-modifier" data-id="${user.id}">Modifier</button>
//           <button class="btn-supprimer" data-id="${user.id}">Supprimer</button>
//         </div>
//       `

// export   async function afficheAllCard(){
//   await getAllUsers()
//   listeContacts.innerHTML = ""
//   users.forEach(user =>{
//       afficheUnCard(user)
//   })
//  }

const perPage = 6;
let currentPage = 1;
let recherche = ""

// export async function rechercheValue(recherche){
//   await getAllUsers();
//   const tabRecherche = users.filter(u =>
//     u.nom.toLowerCase().includes(recherche) ||
//     u.prenom.toLowerCase().includes(recherche) ||
//     u.email.toLowerCase().includes(recherche) ||
//     u.telephone.toLowerCase().includes(recherche) ||
//     u.role.toLowerCase().includes(recherche) ||
//     u.date_creation.toLowerCase().includes(recherche) 

//   )
//   return tabRecherche
// }


export function setRecherche(valeur) {
  recherche = valeur.toLowerCase();
  currentPage = 1;
  afficheAllCard();
}

export async function afficheAllCard() {
  await getAllUsers();
  listeContacts.innerHTML = "";

  // 1. filtre d'abord
  const filtres = users.filter(u =>
    u.nom.toLowerCase().includes(recherche) ||
    u.prenom.toLowerCase().includes(recherche) ||
    u.email.toLowerCase().includes(recherche) ||
    u.telephone.toLowerCase().includes(recherche) ||
    u.role.toLowerCase().includes(recherche) ||
    u.date_creation.toLowerCase().includes(recherche)
  );

  // 2. calcule total sur les résultats filtrés (pas sur users)
  const total = Math.ceil(filtres.length / perPage);
  const start = (currentPage - 1) * perPage;
  const end   = start + perPage;

  // 3. pagine sur les résultats filtrés
  filtres.slice(start, end).forEach(user => afficheUnCard(user));

  document.getElementById("page-info").textContent = `Page ${currentPage} / ${total || 1}`;
  document.getElementById("btn-prev").disabled = currentPage <= 1;
  document.getElementById("btn-next").disabled = currentPage >= total;
}

export async function pageSuivante() {
  currentPage++;
  await afficheAllCard();
}

export async function pagePrecedente() {
  currentPage--;
  await afficheAllCard();
}

export async function rechargerFormulaire(id) {
  await getAllUsers();
  const user = users.find((user) => user.id === id);
  // console.log(user)
  if (!user) {
    return;
  }
  prenom.value = user.prenom;
  nom.value = user.nom;
  email.value = user.email;
  telephone.value = user.telephone;
  selectRole.value = user.role;

  //  idModifier = user.id
  btnAjouter.textContent = "modifier";
  return user.id;
}

export function getAllChecked() {
  const usersChecked = document.querySelectorAll(".cocher:checked");
  return Array.from(usersChecked);
  // console.log(Array.from(usersChecked))
}

export async function getAllTotalContact() {
  await getAllUsers();
  const total = users.length;
  return total;
}

