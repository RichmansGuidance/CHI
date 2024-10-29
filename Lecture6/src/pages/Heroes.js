import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import CharacterList from '../components/CharacterList';
import '../styles/styles.css';

const Heroes = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleRowClick = useCallback((id) => {
        navigate(`/heroes/${id}`); //UseCallback  для оптимізації рендерингу. Це запобігає створенню нової функції при кожному рендері
    }, [navigate]);

    useEffect(() => {
        if (id) {
            navigate(`/heroes/${id}`); 
        }
    }, [id, navigate]);

    return (
        <div className="heroes-container">
            <div className="heroes-list">
                <h1>Heroes List</h1>
                <CharacterList onRowClick={handleRowClick} />
            </div>
            <div className={`character-detail ${id ? 'show' : ''}`}>
                <Outlet />
            </div>
        </div>
    );
};

export default Heroes;
