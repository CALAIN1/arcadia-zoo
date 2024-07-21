let createFoodModal, modifyFoodModal, deleteFoodModal;
let currentEditingAnimal;

document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});


function loadContent() {
    const list = document.getElementById('data-list');
    list.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'data-infos header';
    const header_name = document.createElement('div');
    header_name.innerHTML = 'Nom de l\'animal';
    const header_food = document.createElement('div');
    header_food.innerHTML = 'Nourriture';
    const header_qte = document.createElement('div');
    header_qte.innerHTML = 'Quantité';
    const header_date = document.createElement('div');
    header_date.innerHTML = 'Date du dernier rapport';
    const header_veto = document.createElement('div');
    header_veto.innerHTML = 'Nom du vétérinaire';

    header.appendChild(header_name);
    header.appendChild(header_food);
    header.appendChild(header_qte);
    header.appendChild(header_date);
    header.appendChild(header_veto);

    list.appendChild(header);

    fetch('/food/getAll.php', { method: 'POST' })
        .then((response) => response.json())
        .then((foods) => {
            foods.data.forEach(food => {
                const container = document.createElement('div');
                container.className = 'data-infos';

                const animalName = document.createElement('div');
                animalName.innerHTML = food.animal;
                const foodType = document.createElement('div');
                foodType.innerHTML = food.food;
                const foodQte = document.createElement('div');
                foodQte.innerHTML = (food.qty_food / 1000) + 'kg';
                const lastReportDate = document.createElement('div');
                lastReportDate.innerHTML = food.date;
                const veto = document.createElement('div');
                veto.innerHTML = food.utilisateur;

                container.appendChild(animalName);
                container.appendChild(foodType);
                container.appendChild(foodQte);
                container.appendChild(lastReportDate);
                container.appendChild(veto);

                list.appendChild(container);
            });
        });
}
