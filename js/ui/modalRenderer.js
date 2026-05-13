export function afficherSucces(texte) {
  const msg = document.getElementById("message-succes")
  msg.textContent = texte
  msg.style.display = "block"
  setTimeout(function() {
    msg.style.display = "none"
  }, 3000)
}