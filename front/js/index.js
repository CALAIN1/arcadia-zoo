document.addEventListener('DOMContentLoaded', function () {
    let boxes = document.querySelectorAll(".box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', onBoxClick);
    }

    // Sélection du bouton
    const openFormButton = document.getElementById('open-form');
    if (openFormButton != null) {
        // Sélection du formulaire
        const reviewForm = document.getElementById('review-form');

        // Ajout d'un écouteur d'événement au clic sur le bouton
        openFormButton.addEventListener('click', function () {
            // Affichage du formulaire
            if (reviewForm.hasAttribute('show')) {
                reviewForm.removeAttribute('show');
            }
            else {
                reviewForm.setAttribute('show', '');
            }
        });
    }


    // Modal script/jungle/savane/marais
    const modal = document.getElementById("animalModal");
    if (modal != null) {
        var span = document.querySelector(".close");
        document.querySelectorAll('.card-animal-jungle,.card-animal-marais,.card-animal-savane').forEach(function (card) {
            console.log(card);
            card.addEventListener('click', function () {
                document.getElementById('animalName').textContent = card.dataset.name;
                document.getElementById('animalFood').textContent = card.dataset.food;
                document.getElementById('animalQuantity').textContent = card.dataset.quantity;
                document.getElementById('animalDate').textContent = card.dataset.date;
                document.getElementById('animalHealth').textContent = card.dataset.health;
                modal.style.display = "flex";

                const modalContent = document.querySelector('.modal-content');
                modalContent.style.backgroundImage = 'url(' + card.dataset.image + ')';
                modalContent.style.backgroundSize = 'cover';
                modalContent.style.backgroundPosition = 'center';
                modalContent.style.color = 'white'; // Ensures the text is readable
                modalContent.style.textShadow = '2px 2px 4px #000000'; // Adds shadow for better readability
            });
        });

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', onConnect);
    }
});


let lastButton = null;

function showText(button, textContent) {
    if (lastButton === button) {
        textContent.style.display = 'none';
        lastButton = null;
    } else {
        if (lastButton !== null) {
            lastButton.text.style.display = 'none';
        }
        textContent.style.display = 'block';
        lastButton = button;
        lastButton.text = textContent;
    }
}
function onBoxClick(e) {
    const button = e.currentTarget;
    let textContent = button.nextSibling;
    while (textContent && textContent.nodeType != 1) {
        textContent = textContent.nextSibling;
    }

    if (textContent) {
        showText(button, textContent);
    }
}

//Fonction qui s'exécute lors de la soumission du formulaire de connexion
function onConnect(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', document.getElementById('email').value);
    formData.append('password', document.getElementById('password').value);
    fetch('/authentication/connect.php', {
        method: 'POST',
        body: formData
    }).then((response) => response.json())
        .then((data) => {
            if (data.success == false) {
                alert(data.error);
            }
            else {
                window.location.href = data.redirect;
            }
        });
}

function showPasswordStep() {
    var username = document.getElementById('email').value;
    const reg = /[a-z0-9\.\-_]+@[a-z0-9\.\-\_]+\.[a-z]+/;
    if (reg.test(username)) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    } else {
        alert('Veuillez entrer votre adresse e-mail.');
    }
}

//menu déroulant 
document.addEventListener('DOMContentLoaded', function () {
    const toggler = document.querySelector('.navbar-toggler');
    const nav = document.querySelector('nav ul');

    toggler.addEventListener('click', function () {
        toggler.classList.toggle('active');
        if (toggler.classList.contains('active')) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });
});
