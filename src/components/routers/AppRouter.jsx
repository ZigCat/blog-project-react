import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import Home from "../../pages/Home";
import Explore from "../../pages/Explore";
import Users from "../../pages/Users";
import About from "../../pages/About";
import PostPage from "../../pages/post/post[id]";
import UserPage from "../../pages/user/user[id]";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/users" element={<Users />} />
            <Route path="/about" element={<About />} />
            <Route exact path="/post/:id" element={<PostPage />} />
            <Route exact path="/user/:id" element={<UserPage />} />
            <Route path="*" element={<Navigate to="/home" />}/>
        </Routes>
    );
}
 
export default AppRouter;