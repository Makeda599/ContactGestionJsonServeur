
const URL_API   = "http://localhost:3000";
const CLE_SESSION = "contacts_session";

export async function loginUser(login, password) {
  try {
    const response = await fetch(
      `${URL_API}/users?login=${login}`
    );
    const resultats = await response.json();

    if (resultats.length === 0) {
      return { ok: false, message: "Identifiant introuvable." };
    }

    const user = resultats[0];

    if (user.password !== password) {
      return { ok: false, message: "Mot de passe incorrect." };
    }

    const session = {
      id:    user.id,
      login: user.login,
      nom:   user.nom,
      role:  user.role,
    };
    sessionStorage.setItem(CLE_SESSION, JSON.stringify(session));

    return { ok: true, user: session };

  } catch (erreur) {
    return { ok: false, message: "Serveur inaccessible." };
  }
}

export function logoutUser() {
  sessionStorage.removeItem(CLE_SESSION);
}

export function getSession() {
  const raw = sessionStorage.getItem(CLE_SESSION);
  if (!raw) return null;
  return JSON.parse(raw);
}

export function isLoggedIn() {
  return getSession() !== null;
}