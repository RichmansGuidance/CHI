import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';

const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
                setCharacter(data);
            } catch (error) {
                setError('Error fetching character: ' + error.message);
            }
        };

        fetchCharacter();
    }, [id]);

    if (error) return <div>{error}</div>;
    if (!character) return <div>Loading...</div>;

    const { name, status, species, gender, origin, image } = character;

    return (
        <Card sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#424242' : '#fff' }}>
            <CardMedia
                component="img"
                alt={name}
                height="200"
                image={image}
            />
            <CardContent sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Status: {status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Species: {species}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Gender: {gender}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Origin: {origin.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CharacterDetail;
