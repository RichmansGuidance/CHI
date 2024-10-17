const charactersDiv = document.getElementById('characters');
const loadingDiv = document.getElementById('loading');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalStatus = document.getElementById('modal-status');
const closeModalButton = document.getElementById('close-modal');

const API_URL = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;
let allCharactersLoaded = false;

const createCharacterElement = ({ id, name, image, status }) => {
    const characterDiv = document.createElement('div');
    characterDiv.className = 'character';
    characterDiv.dataset.id = id;
    characterDiv.innerHTML = `
        <h3>${name}</h3>
        <img src="${image}" alt="${name}" />
        <p>${status}</p>
    `;
    return characterDiv;
};

const renderCharacters = (characters) => {
    const fragment = document.createDocumentFragment();
    characters.forEach(character => fragment.appendChild(createCharacterElement(character)));
    charactersDiv.appendChild(fragment);
};

const showError = (message) => {
    charactersDiv.innerHTML = `<p style="color: red;">${message}</p>`;
};

const fetchCharacters = async () => {
    if (allCharactersLoaded) return;
    loadingDiv.style.display = 'block';

    try {
        const response = await fetch(`${API_URL}?page=${currentPage}`);
        if (!response.ok) throw new Error('Не вдалося завантажити персонажів');

        const { results } = await response.json();
        if (results.length) {
            renderCharacters(results);
            currentPage++;
            if (results.length < 20) allCharactersLoaded = true;
        } 
    } catch (error) {
        showError(error.message);
    } finally {
        loadingDiv.style.display = 'none';
    }
};

const openModal = async (id) => {
    loadingDiv.style.display = 'block';
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Не вдалося завантажити інформацію про персонажа');

        const character = await response.json();
        modalImage.src = character.image;
        modalName.textContent = character.name;
        modalStatus.textContent = character.status;
        modal.style.display = 'flex';
    } catch (error) {
        showError(error.message);
    } finally {
        loadingDiv.style.display = 'none';
    }
};

const closeModal = () => {
    modal.style.display = 'none';
};

const handleCharacterClick = (event) => {
    const characterDiv = event.target.closest('.character');
    if (characterDiv){
        openModal(characterDiv.dataset.id);
        event.stopPropagation();
    } 
};

const handleScroll = () => {
    if (!allCharactersLoaded && (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100)) {
        fetchCharacters();
    }
};

document.addEventListener('click', (event) => {
    handleCharacterClick(event);
    
    if (event.target === closeModalButton || event.target === modal) {
        closeModal(event);
    }
});

window.addEventListener('scroll', handleScroll);

fetchCharacters();
