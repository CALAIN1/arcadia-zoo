let createModal, modifyModal, deleteModal;
let editingData;

let habitatList = [];
let raceList = [];

document.addEventListener('DOMContentLoaded', async () => {
    const btnCreate = document.getElementById('btn-create-habitat');
    btnCreate.addEventListener('click', onOpenCreateHabitat);

    createModal = document.getElementById('create-habitat-modal');
    createModal.addEventListener('click', onCloseModal);

    document.getElementById('btn-valid-new-habitat').addEventListener('click', onCreateHabitat);

    modifyModal = document.getElementById('modify-habitat-modal');
    modifyModal.addEventListener('click', onCloseModal);

    deleteModal = document.getElementById('delete-habitat-modal');
    deleteModal.addEventListener('click', onCloseModal);

    document.getElementById("btn-valid-update-habitat").addEventListener('click', onUpdateHabitat);
    document.getElementById("btn-valid-delete-habitat").addEventListener('click', onDeleteHabitat);

    loadContent();
});

function onCreateHabitat() {
    const formData = new FormData();
    formData.append('name', document.getElementById('new-habitat-name').value);
    formData.append('description', document.getElementById('new-habitat-description').value);

    fetch('/habitat/create.php', {
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
    header_id.innerHTML = 'id d\'habitat';
    const header_name = document.createElement('div');
    header_name.innerHTML = 'name';
    const header_description = document.createElement('div');
    header_description.innerHTML = 'description'
    const header_actions = document.createElement('div');
    header_actions.innerHTML = 'actions';

    header.appendChild(header_id);
    header.appendChild(header_name);
    header.appendChild(header_description);
    header.appendChild(header_actions);

    list.appendChild(header);

    fetch('/habitat/getAll.php', { method: 'POST' })
        .then((response) => response.json())
        .then((habitats) => {
            habitats.data.forEach(habitat => {
                const container = document.createElement('div');
                container.className = 'data-infos';
                const id = document.createElement('div');
                id.innerHTML = habitat.id;
                const name = document.createElement('div');
                name.innerHTML = habitat.name;
                const description = document.createElement('div');
                description.innerHTML = habitat.description;

                const actions = document.createElement('div');
                const btnUpdate = document.createElement('button');
                btnUpdate.innerHTML = 'modifier';
                const btnDelete = document.createElement('button');
                btnDelete.innerHTML = 'supprimer';

                actions.appendChild(btnUpdate);
                actions.appendChild(btnDelete);


                container.appendChild(id);
                container.appendChild(name);
                container.appendChild(description);
                container.appendChild(actions);


                list.appendChild(container);

                btnUpdate.addEventListener('click', () => modifyInfos(habitat));
                btnDelete.addEventListener('click', () => deleteData(habitat));
            });
        });
}

function modifyInfos(habitatInfos) {
    modifyModal.setAttribute('show', '');
    editingData = habitatInfos;

    document.getElementById("update-habitat-name").value = habitatInfos.name;
    document.getElementById("update-habitat-description").value = habitatInfos.description;
}
function deleteData(habitatInfos) {
    deleteModal.setAttribute('show', '');
    editingData = habitatInfos;
}
function onDeleteHabitat() {
    if (editingData == null)
        return;

    const data = new FormData();
    data.append("habitat_id", editingData.id);
    fetch("/habitat/delete.php", {
        method: "POST",
        body: data
    }).then((response) => response.json())
        .then((result) => {
            if (result.success) {
                deleteModal.removeAttribute('show');
                loadContent();
            }
        });
}
function onUpdateHabitat() {
    const data = new FormData();
    data.append("id", editingData.id);
    data.append("name", document.getElementById("update-habitat-name").value);
    data.append("description", document.getElementById("update-habitat-description").value);

    fetch("/habitat/update.php", {
        method: "POST",
        body: data
    }).then((response) => response.json())
        .then((result) => {
            if (result.success) {
                modifyModal.removeAttribute('show');
                loadContent();
            }
        });
}
function onOpenCreateHabitat() {
    createModal.setAttribute('show', '');
}
function onCloseModal(evt) {
    if (createModal == evt.target) {
        createModal.removeAttribute('show');
        editingData = null;
    }
    if (modifyModal == evt.target) {
        modifyModal.removeAttribute('show');
        editingData = null;
    }
    if (deleteModal == evt.target) {
        deleteModal.removeAttribute('show');
        editingData = null;
    }
}
