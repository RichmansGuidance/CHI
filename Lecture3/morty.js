const charactersDiv = document.getElementById('characters');
const paginationDiv = document.querySelector('.pagination');
const pageNumber = document.getElementById('page-number');
const loadingDiv = document.getElementById('loading');

const API_URL = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;
let totalPages = 1;

const characterCache = {}; // об'єкт який я буду використовувати для кешування даних щоб уникнути повторних API-колів якщо я вернусь на  попередню сторінку

const renderCharacters = (characters) => {
    const fragment = document.createDocumentFragment(); // По суті використав відро під назвою фрагмент щоб зменшити к-сть перемальовування DOM
    characters.forEach(({ name, image, status }) => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character';
        characterDiv.innerHTML = `
            <h3>${name}</h3>
            <img src="${image}" alt="${name}" />
            <p>${status}</p>
        `;
        fragment.appendChild(characterDiv);
    });
    charactersDiv.innerHTML = '';
    charactersDiv.appendChild(fragment);
};

const updatePaginationButtons = (nextAvailable) => {
    paginationDiv.querySelector('#prev').disabled = currentPage === 1;
    paginationDiv.querySelector('#next').disabled = !nextAvailable; 
    pageNumber.textContent = `${currentPage} / ${totalPages}`;
};

const showError = (message) => {
    charactersDiv.innerHTML = `<p style="color: red;">${message}</p>`; //тригернеьься якщо наприклад не зможе найти якусь змінну 
};

const fetchCharacters = async (page) => { // використав асинхронні фції впринципі асинхронність наскіки я знаю використовують для уникнення callback hell
    loadingDiv.style.display = 'block';
    try {
        if (characterCache[page]) {
            renderCharacters(characterCache[page]); //кешуються тільки уже проглянуті сторінки а не всі дані сразу
            updatePaginationButtons(page < totalPages);
            loadingDiv.style.display = 'none';
            return;
        }

        const response = await fetch(`${API_URL}?page=${page}`);
        if (!response.ok) throw new Error('Не вдалося завантажити персонажів'); // при ошибке 404 або 500 затригериться

        const data = await response.json();
        totalPages = data.info.pages;
        currentPage = page;

        characterCache[page] = data.results;
        renderCharacters(data.results);
        updatePaginationButtons(data.info.next !== null); 
    } catch (error) {
        showError(error.message);
    } finally {
        loadingDiv.style.display = 'none';
    }
};

const handlePagination = (increment) => { 
    const newPage = currentPage + increment;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage; 
        fetchCharacters(newPage);
    }
};

paginationDiv.addEventListener('click', (event) => { //event delegation обробник тільки для батьківського paginationDiv
    if (event.target.closest('#prev')) {
        handlePagination(-1);
    } else if (event.target.closest('#next')) {
        handlePagination(1);
    }
});

document.addEventListener('keydown', (event) => { // перехід за допомогою стрілочок + так набагато проще добратись до ласт сторінки зажавши стрілочку щоб перевірити чи працює disable ніж клікати весь час
        if (event.key === 'ArrowLeft') handlePagination(-1);
        else if (event.key === 'ArrowRight') handlePagination(1);
});

fetchCharacters(currentPage);
