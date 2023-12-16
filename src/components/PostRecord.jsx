import React from 'react';
import "../styles/components/postrecord.scss";
import {useNavigate} from "react-router-dom";
import Avatar from "./UI/Avatar/Avatar";

const PostRecord = ({post}) => {
    const router = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation();
        router("/user/"+post.user.id);
    }

    return (
        <div className="post">
            <div className="post-inner" onClick={() => router("/post/"+post.id)}>
                <Avatar userId={post.user.id}/>
                <div className="post-body">
                    <div className="post-body-user" onClick={(event) => handleClick(event)}>
                        <h4>{post.user.nickname}</h4>
                        <h6>@{post.user.username}</h6>
                        <span>{post.creationDate}</span>
                    </div>
                    <div className="post-body-content">
                        <p>{post.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostRecord;