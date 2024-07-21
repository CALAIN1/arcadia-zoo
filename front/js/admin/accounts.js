let createAccountModal, modifyAccountModal, deleteAccountModal;
let currentEditingAnimal;

document.addEventListener('DOMContentLoaded', () => {
    const btnCreate = document.getElementById('btn-create-account');
    btnCreate.addEventListener('click', onOpenCreateAccount);

    createAccountModal = document.getElementById('create-account-modal');
    createAccountModal.addEventListener('click', onCloseModal);

    document.getElementById('btn-valid-new-account').addEventListener('click', onCreateAccount);

    modifyAccountModal = document.getElementById('modify-account-modal');
    modifyAccountModal.addEventListener('click', onCloseModal);

    deleteAccountModal = document.getElementById('delete-account-modal');
    deleteAccountModal.addEventListener('click', onCloseModal);

    document.getElementById("btn-valid-update-account").addEventListener('click', onUpdateAccount);
    document.getElementById("btn-valid-delete-account").addEventListener('click', onDeleteAccount);

    loadContent();
});

function onCreateAccount() {
    const formData = new FormData();
    formData.append('username', document.getElementById('new-account-email').value);
    formData.append('password', document.getElementById('new-account-password').value);
    formData.append('role', document.getElementById('new-account-role').value);
    formData.append('firstname', document.getElementById('new-account-firstname').value);
    formData.append('lastname', document.getElementById('new-account-lastname').value);

    fetch('/account/create.php', {
        method: "POST",
        body: formData
    }).then((response) => response.json())
        .then((result) => {
            createAccountModal.removeAttribute("show");
            loadContent();
        });
}


function loadContent() {
    const list = document.getElementById('data-list');
    list.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'data-infos header';
    const header_id = document.createElement('div');
    header_id.innerHTML = 'id d\'utilisateur';
    const header_name = document.createElement('div');
    header_name.innerHTML = 'nom - prénom';
    const header_username = document.createElement('div');
    header_username.innerHTML = 'nom d\'utilisateur'
    const header_role = document.createElement('div');
    header_role.innerHTML = 'role';
    const header_actions = document.createElement('div');
    header_actions.innerHTML = 'actions';

    header.appendChild(header_id);
    header.appendChild(header_name);
    header.appendChild(header_username);
    header.appendChild(header_role);
    header.appendChild(header_actions);

    list.appendChild(header);

    fetch('/account/getAll.php', { method: 'POST' })
        .then((response) => response.json())
        .then((accounts) => {
            accounts.data.forEach(account => {
                const container = document.createElement('div');
                container.className = 'data-infos';
                const id = document.createElement('div');
                id.innerHTML = account.id;
                const name = document.createElement('div');
                name.innerHTML = account.nom.toUpperCase() + ' ' + account.prenom;
                const username = document.createElement('div');
                username.innerHTML = account.username;
                const role = document.createElement('div');
                switch (account.role) {
                    case 1:
                        role.innerHTML = "Admin";
                        break;
                    case 2:
                        role.innerHTML = "Employé";
                        break;
                    case 3:
                        role.innerHTML = "Vétérinaire";
                        break;
                }

                const actions = document.createElement('div');
                const btnUpdate = document.createElement('button');
                btnUpdate.innerHTML = 'modifier';
                const btnDelete = document.createElement('button');
                btnDelete.innerHTML = 'supprimer';

                actions.appendChild(btnUpdate);
                actions.appendChild(btnDelete);


                container.appendChild(id);
                container.appendChild(name);
                container.appendChild(username);
                container.appendChild(role);
                container.appendChild(actions);


                list.appendChild(container);

                btnUpdate.addEventListener('click', () => modifyInfos(account));
                btnDelete.addEventListener('click', () => deleteData(account));
            });
        });
}

function modifyInfos(userInfos) {
    modifyAccountModal.setAttribute('show', '');
    editingData = userInfos;

    document.getElementById("update-account-firstname").value = userInfos.nom;
    document.getElementById("update-account-lastname").value = userInfos.prenom;
    document.getElementById("update-account-email").value = userInfos.username;
    document.getElementById("update-account-password").value = '';
    document.getElementById("update-account-password-confirm").value = '';
    document.getElementById("update-account-role").value = userInfos.role;
}
function deleteData(userInfos) {
    deleteAccountModal.setAttribute('show', '');
    editingData = userInfos;
}
function onDeleteAccount() {
    if (editingData == null)
        return;

    const data = new FormData();
    data.append("user_id", editingData.id);
    fetch("/account/delete.php", {
        method: "POST",
        body: data
    }).then((response) => response.json())
        .then((result) => {
            if (result.success) {
                deleteAccountModal.removeAttribute('show');
                loadContent();
            }
        });
}
function onUpdateAccount() {
    if (editingData == null ||
        document.getElementById("update-account-password").value != document.getElementById("update-account-password-confirm").value
    )
        return;

    const data = new FormData();
    data.append("id", editingData.id);
    data.append("nom", document.getElementById("update-account-firstname").value);
    data.append("prenom", document.getElementById("update-account-lastname").value);
    data.append("username", document.getElementById("update-account-email").value);
    data.append("password", document.getElementById("update-account-password").value);
    data.append("role", document.getElementById("update-account-role").value);

    fetch("/account/update.php", {
        method: "POST",
        body: data
    }).then((response) => response.json())
        .then((result) => {
            if (result.success) {
                modifyAccountModal.removeAttribute('show');
                loadContent();
            }
        });
}
function onOpenCreateAccount() {
    createAccountModal.setAttribute('show', '');
}
function onCloseModal(evt) {
    if (createAccountModal == evt.target) {
        createAccountModal.removeAttribute('show');
        editingData = null;
    }
    if (modifyAccountModal == evt.target) {
        modifyAccountModal.removeAttribute('show');
        editingData = null;
    }
    if (deleteAccountModal == evt.target) {
        deleteAccountModal.removeAttribute('show');
        editingData = null;
    }
}
