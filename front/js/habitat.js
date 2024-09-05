let boxCard;
let especes, races;
let modal;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('toggleAudio').addEventListener('click', toggleAudio);

    // Modal script
    modal = document.getElementById("animalModal");

    document.getElementsByClassName("close")[0].onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    boxCard = document.getElementById('animals-card');
    const habitat = boxCard.getAttribute('data-habitat');

    fetch('/habitat/getAnimals.php?habitat=' + habitat)
        .then(response => response.json())
        .then(async (result) => {
            if (!result.success)
                return;


            await getRaces();
            let currentContainer = null;
            result.data.forEach((animal, i) => {
                if ((i % 2) == 0) {
                    currentContainer = document.createElement('div');
                    currentContainer.className = 'animals_zoo';
                    boxCard.appendChild(currentContainer);
                }


                const cardAnimal = document.createElement('div');
                cardAnimal.className = 'card-animal-' + habitat;
                const img = new Image();
                img.className = "pictures";
                if (animal.images.length > 0) {
                    img.src = animal.images[0].url;
                }

                const [infoHeart, heart] = createInfoHeart(animal);

                cardAnimal.appendChild(img);
                cardAnimal.appendChild(infoHeart);
                currentContainer.appendChild(cardAnimal);
                cardAnimal.addEventListener('click', (event) => {
                    if (event.target != heart) {
                        openCard(animal);
                    }
                    else {
                        like(animal);
                        alert('Merci d\'avoir aimé ' + animal.name + ' !');
                    }
                });
            });
        });
});
function openCard(card) {
    fetch('/report/getLast.php?animal=' + card.id)
        .then(response => response.json())
        .then(result => {
            if (result.data.date != '-') {
                result.data.date = new Date(result.data.date);
            }
            document.getElementById('animalName').textContent = card.name;
            document.getElementById('animalFood').textContent = result.data.food;
            document.getElementById('animalQuantity').textContent = result.data.qty_food + "gr";
            document.getElementById('animalDate').textContent = result.data.date.toLocaleString();
            document.getElementById('animalHealth').textContent = result.data.etat;
            modal.style.display = "block";
            document.querySelector('.modal-content').style.backgroundImage = 'url(' + card.images[0].url + ')';
            document.querySelector('.modal-content').style.backgroundSize = 'cover';
            document.querySelector('.modal-content').style.backgroundPosition = 'center';
            document.querySelector('.modal-content').style.color = 'white'; // Ensures the text is readable
            document.querySelector('.modal-content').style.textShadow = '2px 2px 4px #000000'; // Adds shadow for better readability
        });
}
function like(animal) {
    fetch('/animal/like.php?animal=' + animal.id);
}
function createInfoHeart(animal) {
    let race;
    for (let i = 0; i < races.length; i++) {
        if (races[i].id == animal.race) {
            race = races[i];
            break;
        }
    }

    const infoHeart = document.createElement('div');
    infoHeart.className = "info-hearts";

    const info = document.createElement('div');
    info.className = 'info';
    info.innerHTML = `<div class="info">
        <p class="name">${animal.name}</p>
        <p class="espèce">${race.espece_name}</p>
        <p class="race">${race.name}</p>
    </div>`

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = `<i class="fa-regular whiteheart fa-heart"></i>
        <i class="fa-solid colorheart fa-heart"></i>`;

    infoHeart.appendChild(info);
    infoHeart.appendChild(heart);

    return [infoHeart, heart];
}

async function getRaces() {
    races = (await fetch('/race/getAll.php')
        .then(response => response.json())).data;
}
function toggleAudio() {
    var audio = document.getElementById('audio');
    var button = document.getElementById('toggleAudio');
    var icon = button.querySelector('i');
    if (audio.paused) {
        audio.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}