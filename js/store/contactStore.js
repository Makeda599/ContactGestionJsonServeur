const URL = "http://localhost:3000";

export let users = [];

export async function getAllUsers() {
  const response = await fetch(`${URL}/contacts`);
  const data = await response.json();
  users.length = 0;
  users.push(...data);
  return users;
}

export async function ajoutUser(user) {
  try {
    const response = await fetch(`${URL}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const newUser = await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function modifierUser(id, user) {
  try {
    const response = await fetch(`${URL}/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const dataModif = await response.json();
    return dataModif;
  } catch (error) {
    console.log(error);
  }
}

export async function supprimerUser(id) {
  try {
    const response = await fetch(`${URL}/contacts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression");
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
