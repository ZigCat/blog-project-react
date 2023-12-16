import React, {useState} from 'react';
import Avatar from "./UI/Avatar/Avatar";
import Textarea from "./UI/Textarea/Textarea";
import Button from "./UI/Button/Button";
import "../styles/components/commentform.scss";
import CommentService from "../api/CommentService";
import ErrorItem from "./error/ErrorItem";

const CommentForm = ({post}) => {
    const [isFilled, setIsFilled] = useState(true);
    const [newCommentValue, setNewCommentValue] = useState("");
    const [errorStatus, setErrorStatus] = useState("");

    const createComment = async () => {
        try{
            if(newCommentValue){
                const form = {
                    content: newCommentValue,
                    post: post.id
                }
                const res = await CommentService.addComment(form);
                window.location.reload();
            } else {
                setIsFilled(false);
            }
        } catch (error){
            setErrorStatus(error.message);
        }
    }
    return (
        <div className="commentform">
            <div className="commentform-inner">
                {errorStatus ? <ErrorItem message={errorStatus}/> :
                <>
                    <div className="commentform-body">
                        <div className="commentform-body-avatar">
                            <Avatar />
                        </div>
                        <div className="commentform-body-text">
                            <Textarea
                                placeholder={
                                    isFilled
                                        ? "Ваше мнение:"
                                        : "Нужно что-нибудь написать!"
                                }
                                value={newCommentValue}
                                onChange={(e) => setNewCommentValue(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="commentform-bottom">
                        <Button onClick={createComment}>Опубликовать</Button>
                    </div>
                </>
                }
            </div>
        </div>
    );
};

export default CommentForm;