import React, {useState} from 'react';
import "../styles/components/commentrecord.scss";
import {useNavigate} from "react-router-dom";
import EditButton from "./UI/EditButton/EditButton";
import DeleteButton from "./UI/DeleteButton/DeleteButton";
import Textarea from "./UI/Textarea/Textarea";
import Button from "./UI/Button/Button";
import CommentService from "../api/CommentService";
import ErrorItem from "./error/ErrorItem";

const CommentRecord = ({comment, sessionUser}) => {
    const router = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [isFilled, setIsFilled] = useState(true);
    const [content, setContent] = useState(comment.content);
    const [errorStatus, setErrorStatus] = useState("");

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try{
            const res = await CommentService.delete(comment.id);
            window.location.reload();
        } catch (error){
            setErrorStatus(error.message);
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        try{
            if(content !== ""){
                const form = {
                    content: content
                };
                const res = await CommentService.update(form, comment.id);
                window.location.reload();
            } else {
                setIsFilled(false);
            }
        } catch (error){
            setErrorStatus(error.message);
        }
    }

    return (
        <div className="commentrecord">
            <div className="commentrecord-inner">
                {errorStatus ? <ErrorItem message={errorStatus}/> :
                <>
                    <div className="commentrecord-body">
                        <div className="commentrecord-body-top">
                            <div className="commentrecord-body-top-user" onClick={() => router("/user/"+comment.user.id)}>
                                <h4>{comment.user.nickname}</h4>
                                <h6>@{comment.user.username}</h6>
                                <span>{comment.creationDate}</span>
                            </div>
                            {comment.user.id === sessionUser.id || sessionUser.role === "ADMIN"
                                ? <DeleteButton onClick={handleDelete}/>
                                : ""
                            }
                        </div>
                        <div className="commentrecord-body-content">
                            {comment.user.id === sessionUser.id
                                ?
                                <>
                                    {isEdit
                                        ?
                                        <div className="commentrecord-body-content-edit">
                                            <Textarea
                                                placeholder={isFilled ? "" : "Нельзя оставить пустым!"}
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                            />
                                            <Button onClick={handleEdit}>Подтвердить</Button>
                                        </div>
                                        : <p>{comment.content}</p>
                                    }
                                    <EditButton onClick={handleIsEdit}/>
                                </>
                                : <p>{comment.content}</p>
                            }
                        </div>
                    </div>
                </>
                }
            </div>
        </div>
    );
};

export default CommentRecord;