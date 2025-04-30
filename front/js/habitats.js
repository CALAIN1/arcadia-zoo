document.addEventListener('DOMContentLoaded', () => {
    fetch("/habitat/getAll.php")
        .then(response => response.json())
        .then((result) => {
            result.data.forEach(createHabitat);
        });
});

function createHabitat(habitatInfos) {
    const habitatContainer = document.createElement("div");
    const container = document.createElement("div");
    const link = document.createElement("a");
    const img = new Image();
    const p = document.createElement("p");

    habitatContainer.className = "row";
    container.className = habitatInfos.name.toLowerCase();
    link.href = habitatInfos.name + '.html';
    img.src = habitatInfos.photos[0].url;

    p.innerHTML = habitatInfos.name.toUpperCase();//mettre en majuscule

    habitatContainer.appendChild(container);
    container.appendChild(link);
    container.appendChild(p);
    link.appendChild(img);

    document.body.querySelector('.content').appendChild(habitatContainer);
}