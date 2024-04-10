import { Box, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AllUsers from '../../components/AllUsers'
import axios from 'axios';

const Home = () => {
  const [usersFromDb, setUsersFromDb] = useState([]);

  const fetchUsersFromDb = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/users`);
      
      setUsersFromDb(res.data.users);
      localStorage.setItem('users', JSON.stringify(res.data.users)); // Convert to JSON format
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsersFromDb();
  }, [])

  return (
    <Box margin={"auto"}>
      <Box backgroundColor={"grey"}>
        <Text textAlign={"center"} padding={"20px"} fontSize={"2rem"} >Cointab SE-ASSIGNMENT.</Text>
      </Box>
      <AllUsers />
    </Box>
  )
}

export default Home
