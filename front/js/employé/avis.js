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

    const header_menu = document.createElement('div');
    header_menu.innerHTML = 'Changer la visibilité';

    header.appendChild(header_id);
    header.appendChild(header_date);
    header.appendChild(header_pseudo);
    header.appendChild(header_isvisible);
    header.appendChild(header_commentaire);
    header.appendChild(header_menu);
    list.appendChild(header);

    fetch('/avis/getAll.php', { method: 'POST' })
        .then((response) => response.json())
        .then((avisResponse) => {
            avisResponse.data.forEach(avis => {
                const container = document.createElement('div');
                container.className = 'data-infos';
                const id = document.createElement('div');
                id.innerHTML = avis.id;
                const date = document.createElement('div');
                date.innerHTML = avis.date;
                const pseudo = document.createElement('div');
                pseudo.innerHTML = avis.pseudo;
                const isvisible = document.createElement('div');
                isvisible.innerHTML = avis.isvisible;
                const commentaire = document.createElement('div');
                commentaire.innerHTML = avis.commentaire;

                const btnSetVisibleContainer = document.createElement('div');
                const btnSetVisible = document.createElement('button');
                if (avis.isvisible == 1) {
                    btnSetVisible.innerHTML = 'Cacher';
                }
                else {
                    btnSetVisible.innerHTML = 'Valider';
                }

                const btnDelete = document.createElement('button');
                btnDelete.innerHTML = 'Supprimer';
                btnSetVisibleContainer.appendChild(btnSetVisible);
                btnSetVisibleContainer.appendChild(btnDelete);


                container.appendChild(id);
                container.appendChild(date);
                container.appendChild(pseudo);
                container.appendChild(isvisible);
                container.appendChild(commentaire);
                container.appendChild(btnSetVisibleContainer);

                list.appendChild(container);

                btnSetVisible.onclick = () => {
                    const formData = new FormData();
                    formData.append('id', avis.id);
                    formData.append('isvisible', avis.isvisible == 1 ? 0 : 1);


                    fetch('/avis/update.php', {
                        method: 'POST',
                        body: formData
                    }).then(response => response.json())
                        .then(result => {
                            if (!result.success) {
                                alert(result.error);
                            }
                            else loadContent();
                        });
                }
                btnDelete.onclick = () => {
                    if (!confirm("Êtes-vous sûr de vouloir supprimer cet avis ?")) {
                        return;
                    }

                    const formData = new FormData();
                    formData.append('id', avis.id);

                    fetch('/avis/delete.php', {
                        method: 'POST',
                        body: formData
                    }).then(response => response.json())
                        .then(result => {
                            if (!result.success) {
                                alert(result.error);
                            }
                            else loadContent();
                        });
                }
            });
        });
}