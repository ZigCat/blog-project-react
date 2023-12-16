import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Registration from "../../pages/Registration";
import Login from "../../pages/Login";

const UnauthorizedAppRouter = () => {
    return (
        <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/registration" />}/>
        </Routes>
    );
};

export default UnauthorizedAppRouter;