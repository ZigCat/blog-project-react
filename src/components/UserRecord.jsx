import React from 'react';
import Avatar from "./UI/Avatar/Avatar";
import "../styles/components/userrecord.scss";
import {useNavigate} from "react-router-dom";

const UserRecord = ({user}) => {
    const router = useNavigate();

    return (
        <div className="userrecord">
            <div className="userrecord-inner" onClick={() => router("/user/"+user.id)}>
                <div className="userrecord-avatar">
                    <Avatar />
                </div>
                <div className="userrecord-info">
                    <h4>{user.nickname}</h4>
                    <h6>@{user.username}</h6>
                    {user.id == localStorage.getItem("id") ? <span>вы</span> : ""}
                </div>
            </div>
        </div>
    );
};

export default UserRecord;