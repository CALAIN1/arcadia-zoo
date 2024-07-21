let createModal;

let habitatList = [];

document.addEventListener('DOMContentLoaded', async () => {
    const btnCreate = document.getElementById('btn-create-etat');
    btnCreate.addEventListener('click', onOpenCreateEtat);

    createModal = document.getElementById('create-etat-modal');
    createModal.addEventListener('click', onCloseModal);

    document.getElementById('btn-valid-new-etat').addEventListener('click', onCreateEtat);

    await loadHabitats();
    loadContent();
});

function loadHabitats() {
    return new Promise((resolve) => {
        fetch('/habitat/getAll.php', { method: 'POST' })
            .then(response => response.json())
            .then((habitat) => {
                const createSelect = document.getElementById('new-etat-habitat');
                habitatList = habitat.data;
                habitatList.forEach(habitat => {
                    createSelect.innerHTML += `<option value="${habitat.id}">${habitat.name}</option>`;
                });
                resolve();
            });
    });
}

function onCreateEtat() {
    const formData = new FormData();
    formData.append('habitat', document.getElementById('new-etat-habitat').value);
    formData.append('avis', document.getElementById('new-etat-avis').value);
    formData.append('amelioration', document.getElementById('new-etat-amelioration').checked ? "oui" : "non");

    //Ternaire
    // document.getElementById('new-etat-amelioration').checked ? "oui" : "non"
    //Equivalent :
    /*if (document.getElementById('new-etat-amelioration').checked){
        return "oui";
    }
    else{
        return "non"
    }*/

    fetch('/etat/create.php', {
        method: "POST",
        body: formData
    }).then((response) => response.json())
        .then((result) => {
            createModal.removeAttribute("show");
            loadContent();
        });
}

function loadContent() {
    const list = document.getElementById('data-list');
    list.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'data-infos header';

    const header_id = document.createElement('div');
    header_id.innerHTML = 'id';
    const header_date = document.createElement('div');
    header_date.innerHTML = 'date';
    const header_avis = document.createElement('div');
    header_avis.innerHTML = 'avis';
    const header_amelioration = document.createElement('div');
    header_amelioration.innerHTML = 'amélioration';
    const header_habitat = document.createElement('div');
    header_habitat.innerHTML = 'Habitat';

    header.appendChild(header_id);
    header.appendChild(header_date);
    header.appendChild(header_habitat);
    header.appendChild(header_avis);
    header.appendChild(header_amelioration);
    list.appendChild(header);

    fetch('/etat/getAll.php', { method: 'POST' })
        .then((response) => response.json())
        .then((etats) => {
            etats.data.forEach(etat => {
                const container = document.createElement('div');
                container.className = 'data-infos';
                const id = document.createElement('div');
                id.innerHTML = etat.id;
                const date = document.createElement('div');
                date.innerHTML = etat.date;
                const habitat = document.createElement('div');
                habitat.innerHTML = etat.habitat;
                const avis = document.createElement('div');
                avis.innerHTML = etat.avis;
                const amelioration = document.createElement('div');
                amelioration.innerHTML = etat.amelioration;

                container.appendChild(id);
                container.appendChild(date);
                container.appendChild(habitat);
                container.appendChild(avis);
                container.appendChild(amelioration);

                list.appendChild(container);
            });
        });
}
function onOpenCreateEtat() {
    createModal.setAttribute('show', '');
}
function onCloseModal(evt) {
    if (createModal == evt.target) {
        createModal.removeAttribute('show');
        editingData = null;
    }
}
