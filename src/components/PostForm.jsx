import React, {useState} from 'react';
import Button from "./UI/Button/Button";
import "../styles/components/postform.scss";
import Textarea from "./UI/Textarea/Textarea";
import Avatar from "./UI/Avatar/Avatar";
import PostService from "../api/PostService";
import ErrorItem from "./error/ErrorItem";

const PostForm = ({borderStyle}) => {
    const [newPostValue, setNewPostValue] = useState("");
    const [isFilled, setIsFilled] = useState(true);
    const [errorStatus, setErrorStatus] = useState("");

    const createPost = async () => {
        if(newPostValue === ""){
            setIsFilled(false);
        } else {
            try{
                const post = {content: newPostValue};
                const response = await PostService.addPost(post);
                window.location.reload();
            } catch (error){
                setErrorStatus(error.message);
            }
        }
    }
    return (
        <div className="postform" style={borderStyle}>
            <div className="postform-inner">
                {errorStatus ? <ErrorItem message={errorStatus}/> :
                    <>
                        <div className="postform-body">
                            <div className="postform-body-avatar">
                                <Avatar />
                            </div>
                            <div className="postform-body-text">
                                <Textarea
                                    placeholder={
                                        isFilled
                                            ? "Расскажите что-нибудь..."
                                            : "Нужно что-нибудь написать!"
                                    }
                                    value={newPostValue}
                                    onChange={(e) => setNewPostValue(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="postform-bottom">
                            <Button onClick={createPost}>Опубликовать</Button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default PostForm;