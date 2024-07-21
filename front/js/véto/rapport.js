let createModal;

let animalList = [];

document.addEventListener('DOMContentLoaded', async () => {
    const btnCreate = document.getElementById('btn-create-report');
    btnCreate.addEventListener('click', onOpenCreateReport);

    createModal = document.getElementById('create-report-modal');
    createModal.addEventListener('click', onCloseModal);

    document.getElementById('btn-valid-new-report').addEventListener('click', onCreateReport);

    await loadAnimals();
    loadContent();
});

function loadAnimals() {
    return new Promise((resolve) => {
        fetch('/animal/getAll.php', { method: 'POST' })
            .then(response => response.json())
            .then((animals) => {
                const createSelect = document.getElementById('new-report-animal');
                animalList = animals.data;
                animalList.forEach(animal => {
                    createSelect.innerHTML += `<option value="${animal.id}">${animal.name}</option>`;
                });
                resolve();
            });
    });
}

function onCreateReport() {
    const formData = new FormData();
    formData.append('animal', document.getElementById('new-report-animal').value);
    formData.append('etat', document.getElementById('new-report-etat').value);
    formData.append('food', document.getElementById('new-report-food').value);
    formData.append('qte', document.getElementById('new-report-qte').value);
    formData.append('detail', document.getElementById('new-report-detail').value);

    fetch('/report/create.php', {
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
    const header_detail = document.createElement('div');
    header_detail.innerHTML = 'détails';
    const header_food = document.createElement('div');
    header_food.innerHTML = 'Nourriture';
    const header_qty_food = document.createElement('div');
    header_qty_food.innerHTML = 'Qte. Nourriture';
    const header_etat = document.createElement('div');
    header_etat.innerHTML = 'Etat de l\'animal';
    const header_utilisateur = document.createElement('div');
    header_utilisateur.innerHTML = 'Nom d\'utilisateur';
    const header_animal = document.createElement('div');
    header_animal.innerHTML = 'Animal';

    header.appendChild(header_id);
    header.appendChild(header_date);
    header.appendChild(header_animal);
    header.appendChild(header_utilisateur);
    header.appendChild(header_food);
    header.appendChild(header_qty_food);
    header.appendChild(header_etat);
    header.appendChild(header_detail);
    list.appendChild(header);

    fetch('/report/getAll.php', { method: 'POST' })
        .then((response) => response.json())
        .then((reports) => {
            reports.data.forEach(report => {
                const container = document.createElement('div');
                container.className = 'data-infos';
                const id = document.createElement('div');
                id.innerHTML = report.id;
                const date = document.createElement('div');
                date.innerHTML = report.date;
                const detail = document.createElement('div');
                detail.innerHTML = report.detail;
                const food = document.createElement('div');
                food.innerHTML = report.food;
                const qty_food = document.createElement('div');
                qty_food.innerHTML = report.qty_food;
                const etat = document.createElement('div');
                etat.innerHTML = report.etat;
                const animal = document.createElement('div');
                animal.innerHTML = report.animal;
                const utilisateur = document.createElement('div');
                utilisateur.innerHTML = report.utilisateur;

                container.appendChild(id);
                container.appendChild(date);
                container.appendChild(animal);
                container.appendChild(utilisateur);
                container.appendChild(food);
                container.appendChild(qty_food);
                container.appendChild(etat);
                container.appendChild(detail);



                list.appendChild(container);
            });
        });
}
function onOpenCreateReport() {
    createModal.setAttribute('show', '');
}
function onCloseModal(evt) {
    if (createModal == evt.target) {
        createModal.removeAttribute('show');
        editingData = null;
    }
}
