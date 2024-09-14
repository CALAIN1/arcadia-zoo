let lastButton = null;

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
            card.addEventListener('click', function (e) {
                if (e.target.className.includes('fa-heart'))
                    return;

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

    const reviewForm = document.getElementById('review-form');
    if (reviewForm != null) {
        reviewForm.addEventListener('submit', onSubmitReview);

        let setNoteTimeout;
        let selectedNote = 0;
        const stars = reviewForm.querySelectorAll('.fa-star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                setStarsCount(stars, index + 1);
                selectedNote = index + 1;

                document.getElementById('note-input').value = selectedNote;
            });
            star.addEventListener('mouseenter', () => {
                clearTimeout(setNoteTimeout);
                setStarsCount(stars, index + 1);
            });
            star.addEventListener('mouseleave', () => {
                setNoteTimeout = setTimeout(setStarsCount, 150, stars, selectedNote);
            });
        });
    }

    const allReviewsContainer = document.getElementById('allReviews');
    if (allReviewsContainer) {
        loadReviews(allReviewsContainer);
    }

    document.querySelectorAll('.hearts').forEach((element) => {
        element.addEventListener('click', function () {
            // Envoi de la requête POST pour incrémenter les "likes"
            fetch(`/animal/like.php?animal=5&like=true`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Mise à jour de l'interface utilisateur avec le nouveau nombre de likes
                        const likeCounter = this.querySelector('.like-counter');
                        if (likeCounter) {
                            likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
                        }
                    }
                })
                .catch(error => console.error('Erreur:', error));
        });
    });
});

function setStarsCount(stars, note) {
    for (let i = 0; i < note && i < stars.length; i++) {
        stars[i].style.color = null;
    }

    for (let i = note; i < stars.length; i++) {
        stars[i].style.color = 'gray';
    }
}

function loadReviews(container) {
    fetch('/avis/getVisibleReviews.php')
        .then((response) => response.json())
        .then(result => {
            result.data.forEach(reviewData => {
                const review = document.createElement('div');
                reviewData.commentaire = reviewData.commentaire.replace(/(\r\n|\r|\n)/g, '<br>');
                review.className = 'review';
                review.innerHTML += `<span>${reviewData.pseudo}</span><br/>`;
                review.innerHTML += `${reviewData.commentaire}<br/>`;

                const starsContainer = document.createElement('div');
                starsContainer.className = 'stars';
                review.appendChild(starsContainer);

                const stars = [];
                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('i');
                    star.className = 'fa-star fa-solid';
                    stars.push(star);

                    starsContainer.appendChild(star);
                }

                setStarsCount(stars, reviewData.note);
                container.appendChild(review);
            });
        });
}
function onSubmitReview(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('pseudo', document.getElementById('client_name').value);
    formData.append('commentaire', document.getElementById('comment').value);
    formData.append('note', document.getElementById('note-input').value);

    fetch('/avis/create.php', {
        method: 'POST',
        body: formData
    }).then((response) => response.json())
        .then(result => {
            if (result.success) {
                alert('Votre avis a bien été soumis, il est en attente de validation');
                const reviewForm = document.getElementById('review-form');
                reviewForm.removeAttribute('show');
            }
            else {
                alert(result.error);
            }

        });
}

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
