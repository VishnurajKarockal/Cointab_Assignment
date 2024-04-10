import { Box, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate} from 'react-router-dom';

const Usercard = (ele) => {
    const [userFromDb, setUserFromDb] = useState(JSON.parse(localStorage.getItem('users') || '[]'));
    const [isUserAdded, setIsUserAdded] = useState(false);
    const navigate = useNavigate();
    const user = {
        id: ele.id,
        name: ele.name,
        email: ele.email,
        phone: ele.phone,
        website: ele.website,
        city: ele.address.city,
        company: ele.company.name
    };

    useEffect(() => {
        setIsUserAdded(userFromDb && userFromDb.some(user => user.id === ele.id));
    }, [userFromDb, ele.id]);

    const handleAddUserToDb = async () => {
        try {
            // Send a POST request to add the user to the database
            const res = await axios.post(`http://localhost:8080/users`, user);
            console.log(res);
    
            // Update local storage
            const updatedData = [...userFromDb, user];
            localStorage.setItem('users', JSON.stringify(updatedData));
            setUserFromDb(updatedData);
        } catch (error) {
            console.error('Error adding user to database:', error);
        }
    };
    

    return (
        <Box margin={'10px'} padding={'20px'} borderWidth="1px" borderRadius="lg" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" mb={2}>Name: {ele.name}</Text>
        <Text>Email: {ele.email}</Text>
        <Text>Phone: {ele.phone}</Text>
        <Text>Website: {ele.website}</Text>
        <Text>City: {ele.address.city}</Text>
        <Text>Company: {ele.company.name}</Text>
        {isUserAdded ? (
            <Button mt={4} colorScheme="blue" onClick={() => navigate("/post",{ state: ele })}>Open</Button>
        ) : (
            <Button mt={4} colorScheme="green" onClick={handleAddUserToDb}>Add</Button>
        )}
    </Box>
    );
};

export default Usercard;
