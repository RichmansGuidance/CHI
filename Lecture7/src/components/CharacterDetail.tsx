import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import { fetchCharacterById } from '../api/characterApi';

const CharacterDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data: character, error, loading, run } = useRequest(() => fetchCharacterById(Number(id)), {
        manual: true, 
    });

    useEffect(() => {
        if (id) run();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching character: {error.message || "Unknown error"}</div>;
    if (!character) return <div>No character found.</div>;

    const { name, status, species, gender, origin, image } = character;

    return (
        <Card sx={{ bgcolor: theme => theme.palette.background.paper }}>
            <CardMedia component="img" alt={name} height="200" image={image} />
            <CardContent sx={{ color: theme => theme.palette.text.primary }}>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body2" color="text.secondary">Status: {status}</Typography>
                <Typography variant="body2" color="text.secondary">Species: {species}</Typography>
                <Typography variant="body2" color="text.secondary">Gender: {gender}</Typography>
                <Typography variant="body2" color="text.secondary">Origin: {origin?.name || "Unknown"}</Typography>
            </CardContent>
        </Card>
    );
};

export default CharacterDetail;
