document.addEventListener('DOMContentLoaded', () => {
    fetch('/account/getAccesses.php').then(result => result.json())
        .then((pageList) => {
            const menu = document.getElementById('admin-menu');
            pageList.forEach(page => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${page.url}">${page.name}</a>`;

                menu.appendChild(li);
            });
        });
});