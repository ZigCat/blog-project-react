import React from 'react';
import "../styles/components/postmodal.scss";
import PostForm from "./PostForm";

const PostModal = ({closeModal}) => {
    return (
        <div className="postmodal">
            <div className="postmodal-inner">
                <div className="postmodal-cross">
                    <img src="../cross.svg" alt="" onClick={() => closeModal()}/>
                </div>
                <PostForm borderStyle={{border: 'none'}}/>
            </div>
        </div>
    );
};

export default PostModal;