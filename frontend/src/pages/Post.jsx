import { Box, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
const Post = () => {
    const location = useLocation();
    const [postsFromJson, setPostsFromJson] = useState([]);
    const [postsFromDb, setPostFromDb] = useState([]);
    const [userPosts,setUserPosts] = useState([]);
    const { state } = location;
    const { id, name, company } = state;
    
    const userPostsFromJson = async () => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
            setPostsFromJson(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const userPostsFromDb = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/posts`);
            setPostFromDb(res.data.posts);

        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllPostFromUser = async() => {
      try {
        const res = await axios.get(`http://localhost:8080/posts/${id}`);
        setUserPosts(res.data.posts);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
        userPostsFromJson();
        userPostsFromDb();
        fetchAllPostFromUser()
    }, []);

    console.log("fromDb", postsFromDb);
    console.log("fromJson", postsFromJson);

    const handleButtonClick = async() => {
        {postsFromJson.map(async(ele) => {
          try {
            await axios.post(`http://localhost:8080/posts`,{id:ele.id,userId:id,title:ele.title,body:ele.body})
          } catch (error) {
            console.log(error);
          }
        })}
    };
    const handleExcel = async() => {
      const data = userPosts.map(post => ({
        Id: post.id,
        UserId: post.userId,
        Title: post.title,
        Body: post.body
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserPosts");
    XLSX.writeFile(wb, "UserPosts.xlsx");
    }

    // Check if any post from postsFromJson has the same userId as the current user's id
    const userHasPosts = postsFromJson.some(post => postsFromDb.some(dbPost => dbPost.userId === post.userId));

    return (
      <Box textAlign="center">
      {userHasPosts ? (
          <Button onClick={handleExcel} colorScheme="blue" mt={4}>
              Download In Excel
          </Button>
      ) : (
          <Button onClick={handleButtonClick} colorScheme="green" mt={4}>
              Bulk Add
          </Button>
      )}

      {postsFromJson.map((ele, i) => (
          <Box key={i} textAlign="start" width="60%" margin="auto" padding="20px" borderWidth="1px" borderRadius="lg" boxShadow="md" marginBottom="10px">
              <Text fontSize="xl" fontWeight="bold" mb={2}>Name: {name}</Text>
              <Text>Title: {ele.title}</Text>
              <Text>Body: {ele.body}</Text>
              <Text>Company: {company.name}</Text>
          </Box>
      ))}
  </Box>
    );
};

export default Post;
