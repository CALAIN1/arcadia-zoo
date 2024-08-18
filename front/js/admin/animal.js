let createAnimalModal, modifyAnimalModal, deleteAnimalModal;
let editingData;

let habitatList = [];
let raceList = [];

document.addEventListener('DOMContentLoaded', async () => {
    const btnCreate = document.getElementById('btn-create-animal');
    btnCreate.addEventListener('click', onOpenCreateAnimal);

    createAnimalModal = document.getElementById('create-animal-modal');
    createAnimalModal.addEventListener('click', onCloseModal);

    document.getElementById('btn-valid-new-animal').addEventListener('click', onCreateAnimal);

    modifyAnimalModal = document.getElementById('modify-animal-modal');
    modifyAnimalModal.addEventListener('click', onCloseModal);

    deleteAnimalModal = document.getElementById('delete-animal-modal');
    deleteAnimalModal.addEventListener('click', onCloseModal);

    document.getElementById("btn-valid-update-animal").addEventListener('click', onUpdateAnimal);
    document.getElementById("btn-valid-delete-animal").addEventListener('click', onDeleteAnimal);

    await Promise.all([loadRaces(), loadHabitats()]);
    loadContent();
});

function onCreateAnimal() {
    const formData = new FormData();
    formData.append('name', document.getElementById('new-animal-name').value);
    formData.append('race', document.getElementById('new-animal-race').value);
    formData.append('habitat', document.getElementById('new-animal-habitat').value);

    fetch('/animal/create.php', {
        method: "POST",
        body: formData
    }).then((response) => response.json())
        .then((result) => {
            createAnimalModal.removeAttribute("show");
            loadContent();
        });
}

function loadRaces() {
    return new Promise((resolve) => {
        fetch("/race/getAll.php", { method: "POST" })
            .then((response) => response.json())
            .then((result) => {
                races = result.data;
                const updateSelect = document.getElementById('update-animal-race');
                const createSelect = document.getElementById('new-animal-race');
                races.forEach(race => {
                    updateSelect.innerHTML += `<option value="${race.id}">${race.name}</option>`;
                    createSelect.innerHTML += `<option value="${race.id}">${race.name}</option>`;
                });

                resolve(result);
            });
    });
}
function loadHabitats() {
    return new Promise((resolve) => {
        fetch("/habitat/getAll.php", { method: "POST" })
            .then((response) => response.json())
            .then((result) => {
                habitats = result.data;
                const updateSelect = document.getElementById('update-animal-habitat');
                const createSelect = document.getElementById('new-animal-habitat');
                habitats.forEach(habitat => {
                    updateSelect.innerHTML += `<option value="${habitat.id}">${habitat.name}</option>`;
                    createSelect.innerHTML += `<option value="${habitat.id}">${habitat.name}</option>`;
                });

                resolve(result);
            });
    });
}
function loadContent() {
    const list = document.getElementById('data-list');
    list.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'data-infos header';
    const header_id = document.createElement('div');
    header_id.innerHTML = 'id d\'animal';
    const header_images = document.createElement('div');
    header_images.innerHTML = 'photos';
    header_images.style.flex = 2;
    const header_name = document.createElement('div');
    header_name.innerHTML = 'name';
    const header_espece = document.createElement('div');
    header_espece.innerHTML = 'espèce d\'animal'
    const header_race = document.createElement('div');
    header_race.innerHTML = 'race';
    const header_habitat = document.createElement('div');
    header_habitat.innerHTML = 'habitat';
    const header_view = document.createElement('div');
    header_view.innerHTML = 'Stats';
    const header_actions = document.createElement('div');
    header_actions.innerHTML = 'actions';

    header.appendChild(header_id);
    header.appendChild(header_images);
    header.appendChild(header_name);
    header.appendChild(header_espece);
    header.appendChild(header_race);
    header.appendChild(header_habitat);
    header.appendChild(header_view);
    header.appendChild(header_actions);

    list.appendChild(header);

    fetch('/animal/getAll.php', { method: 'POST' })
        .then((response) => response.json())
        .then((animals) => {
            animals.data.forEach(animal => {
                const container = document.createElement('div');
                container.className = 'data-infos';
                const id = document.createElement('div');
                id.innerHTML = animal.id;
                const photos = document.createElement('div');
                photos.className = 'photos';
                const btnAddPhoto = document.createElement('input');
                const lblAddPhoto = document.createElement('label');
                const inputId = generateRandomID();
                lblAddPhoto.setAttribute('for', inputId);
                btnAddPhoto.id = inputId;

                lblAddPhoto.innerHTML = '+';
                btnAddPhoto.type = 'file';
                btnAddPhoto.accept = 'image/png,image/jpeg,image/webp';

                photos.appendChild(btnAddPhoto);
                photos.appendChild(lblAddPhoto);
                animal.photos.forEach(img => {
                    const imgContainer = document.createElement('div');
                    imgContainer.className = "img-container";
                    imgContainer.innerHTML = `<img src="${img.url}"/>`;
                    photos.appendChild(imgContainer);
                });

                const name = document.createElement('div');
                name.innerHTML = animal.name;
                const race = document.createElement('div');
                const espece = document.createElement('div');
                const animalRace = races.filter(x => x.id == animal.race)[0];
                race.innerHTML = animalRace.name;
                espece.innerHTML = animalRace.espece_name;
                const habitat = document.createElement('div');
                habitat.innerHTML = habitats.filter(x => x.id == animal.habitat)[0].name;

                const view = document.createElement('div');
                if (animal.view_data) {
                    view.innerHTML = animal.view_data.vues + ' <i class="fa-solid fa-eye"></i>, ' + animal.view_data.likes + ' <i class="fa-solid fa-heart"></i>';
                }
                else {
                    view.innerHTML = '0 <i class="fa-solid fa-eye"></i>, 0 <i class="fa-solid fa-heart"></i>';
                }

                const actions = document.createElement('div');
                const btnUpdate = document.createElement('button');
                btnUpdate.innerHTML = 'modifier';
                const btnDelete = document.createElement('button');
                btnDelete.innerHTML = 'supprimer';

                actions.appendChild(btnUpdate);
                actions.appendChild(btnDelete);


                container.appendChild(id);
                container.appendChild(photos);
                container.appendChild(name);
                container.appendChild(espece);
                container.appendChild(race);
                container.appendChild(habitat);
                container.appendChild(view);
                container.appendChild(actions);


                list.appendChild(container);

                btnUpdate.addEventListener('click', () => modifyInfos(animal));
                btnDelete.addEventListener('click', () => deleteData(animal));
                btnAddPhoto.addEventListener('change', async () => {
                    const result = await addAnimalImage(animal, btnAddPhoto.files);
                    if (result.success) {
                        const imgContainer = document.createElement('div');
                        imgContainer.className = "img-container";
                        imgContainer.innerHTML = `<img src="${result.data.url}"/>`;
                        photos.appendChild(imgContainer);
                    }
                });
            });
        });
}

function generateRandomID() {
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += String.fromCharCode(random(97, 122));
    }
    return result;
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function addAnimalImage(animalInfos, files) {
    return new Promise((resolve) => {
        const formData = new FormData();
        formData.append('animal', animalInfos.id);
        formData.append('file', files[0]);

        fetch('/animal/addImage.php', {
            method: 'POST',
            body: formData
        }).then((response) => response.json())
            .then(resolve);
    });
}
function modifyInfos(animalInfos) {
    modifyAnimalModal.setAttribute('show', '');
    editingData = animalInfos;

    document.getElementById("update-animal-name").value = animalInfos.name;
    document.getElementById("update-animal-race").value = animalInfos.race;
    document.getElementById("update-animal-habitat").value = animalInfos.habitat;
}
function deleteData(userInfos) {
    deleteAnimalModal.setAttribute('show', '');
    editingData = userInfos;
}
function onDeleteAnimal() {
    if (editingData == null)
        return;

    const data = new FormData();
    data.append("animal_id", editingData.id);
    fetch("/animal/delete.php", {
        method: "POST",
        body: data
    }).then((response) => response.json())
        .then((result) => {
            if (result.success) {
                deleteAnimalModal.removeAttribute('show');
                loadContent();
            }
        });
}
function onUpdateAnimal() {
    const data = new FormData();
    data.append("id", editingData.id);
    data.append("name", document.getElementById("update-animal-name").value);
    data.append("race", document.getElementById("update-animal-race").value);
    data.append("habitat", document.getElementById("update-animal-habitat").value);

    fetch("/animal/update.php", {
        method: "POST",
        body: data
    }).then((response) => response.json())
        .then((result) => {
            if (result.success) {
                modifyAnimalModal.removeAttribute('show');
                loadContent();
            }
        });
}
function onOpenCreateAnimal() {
    createAnimalModal.setAttribute('show', '');
}
function onCloseModal(evt) {
    if (createAnimalModal == evt.target) {
        createAnimalModal.removeAttribute('show');
        editingData = null;
    }
    if (modifyAnimalModal == evt.target) {
        modifyAnimalModal.removeAttribute('show');
        editingData = null;
    }
    if (deleteAnimalModal == evt.target) {
        deleteAnimalModal.removeAttribute('show');
        editingData = null;
    }
}
