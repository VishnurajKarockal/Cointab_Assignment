import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Usercard from './Usercard';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const handleFetchUsers = async () => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    
  
    

    return (
        <Box width={"40%"} margin={"auto"}>
            <Box textAlign={"center"}>
                {/* Pass a reference to handleFetchUsers, don't call it */}
                <Button onClick={handleFetchUsers}>All Users</Button>
            </Box>
            <Box>
                {/* Render user cards only if users array is not empty */}
                {users.length > 0 && users.map((ele, i) => (
                    <Usercard key={i} {...ele} />
                ))}
            </Box>
        </Box>
    );
};

export default AllUsers;
