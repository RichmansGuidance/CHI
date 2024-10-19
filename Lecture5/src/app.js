import React, { useEffect, useState, useCallback } from 'react'; //useEffect für Nebeneffekte, useState für Memoisierung,useState für Zustand
import axios from 'axios';
import './styles.css';

const API_URL = 'https://rickandmortyapi.com/api/character';

const Character = React.memo(({ name, image, status }) => ( // мемоізація щоб не ререндерити персонажів при переході на поперед сторінку
    <div className="character">
        <h3>{name}</h3>
        <img src={image} alt={name} />
        <p>{status}</p>
    </div>
));

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const fetchCharacters = useCallback(async (page) => { //використав хук useCallback для того щоб не створювалась нова фція при ререндері App
        setLoading(true);
        setError(null);

        try {
            const { data } = await axios.get(`${API_URL}?page=${page}`);
            setCharacters(data.results);
            setTotalPages(data.info.pages);
        } catch (error) {
            setError("Error fetching characters");
            console.error("Error fetching characters:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage, fetchCharacters]);

    const handlePagination = (direction) => {
        setCurrentPage((prev) => Math.min(Math.max(prev + direction, 1), totalPages));
    };

    return (
        <div>
            <h1>Персонажі Rick & Morty</h1>
            {loading && <div id="loading">Loading…</div>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
                <div id="characters">
                    {characters.map((character) => (
                        <Character key={character.id} {...character} />
                    ))}
                </div>
            )}
            <div className="pagination">
                <button 
                    className="button1" 
                    onClick={() => handlePagination(-1)} 
                    disabled={currentPage === 1}
                >
                    Previous
                    <span>Tap Me ;)</span>
                </button>
                
                <span>{currentPage} / {totalPages}</span>
                
                <button 
                    className="button1" 
                    onClick={() => handlePagination(1)} 
                    disabled={currentPage === totalPages}
                >
                    Next
                    <span>Tap Me ;)</span>
                </button>
            </div>
        </div>
    );
};

export default App;
