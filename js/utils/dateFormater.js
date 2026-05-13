export function formatDate(dateInput) {
    if (!dateInput) return "—";

    const dateObj = new Date(dateInput.toString().replace(/-/g, '/'));

    if (isNaN(dateObj.getTime())) return "Date invalide";

    const dateStr = dateObj.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    return dateStr; 
}