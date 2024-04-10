
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Post from '../pages/Post';
const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/post' element={<Post />}/>
    </Routes>
  )
}

export default AllRoutes