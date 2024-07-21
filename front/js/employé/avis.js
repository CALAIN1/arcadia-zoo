document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});

function loadContent() {
    const list = document.getElementById('data-list');
    list.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'data-infos header';

    const header_id = document.createElement('div');
    header_id.innerHTML = 'id';
    const header_date = document.createElement('div');
    header_date.innerHTML = 'date';
    const header_pseudo = document.createElement('div');
    header_pseudo.innerHTML = 'pseudo';
    const header_commentaire = document.createElement('div');
    header_commentaire.innerHTML = 'commentaire';
    const header_isvisible = document.createElement('div');
    header_isvisible.innerHTML = 'Isvisible';

    header.appendChild(header_id);
    header.appendChild(header_date);
    header.appendChild(header_pseudo);
    header.appendChild(header_isvisible);
    header.appendChild(header_commentaire);
    list.appendChild(header);

    fetch('/avis/getAll.php', { method: 'POST' })
        .then((response) => response.json())
        .then((etats) => {
            etats.data.forEach(etat => {
                const container = document.createElement('div');
                container.className = 'data-infos';
                const id = document.createElement('div');
                id.innerHTML = etat.id;
                const date = document.createElement('div');
                date.innerHTML = etat.date;
                const pseudo = document.createElement('div');
                pseudo.innerHTML = etat.pseudo;
                const isvisible = document.createElement('div');
                isvisible.innerHTML = etat.isvisible;
                const commentaire = document.createElement('div');
                commentaire.innerHTML = etat.commentaire;

                container.appendChild(id);
                container.appendChild(date);
                container.appendChild(pseudo);
                container.appendChild(isvisible);
                container.appendChild(commentaire);

                list.appendChild(container);
            });
        });
}