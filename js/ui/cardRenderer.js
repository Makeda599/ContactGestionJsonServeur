
export function cardTemplate(user) {
  const initiales = (user.prenom[0] + user.nom[0]).toUpperCase()
  // console.log(user.date_creation)
  return `
        <div class="carte-entete">
          <input type="checkbox" class="cocher" data-id="${user.id}"/>
          <div class="avatar">${initiales}</div>
          <div class="carte-nom">
            <h3>${user.prenom} ${user.nom}</h3>
            <span>${user.role}</span>
          </div>
        </div>
        <div class="carte-infos">
          <span>@ ${user.email}</span>
          <span>☎ ${user.telephone}</span>
          <span>✎ Ajouté le ${user.date_creation}</span>
        </div>
        <div class="carte-actions">
          <button class="btn-modifier" data-id="${user.id}">Modifier</button>
          <button class="btn-supprimer" data-id="${user.id}">Supprimer</button>
        </div>
      `
}