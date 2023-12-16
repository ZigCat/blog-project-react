import React, {useEffect, useState} from 'react';
import "../styles/components/postitem.scss";
import PageAvatar from "./UI/PageAvatar/PageAvatar";
import EditButton from "./UI/EditButton/EditButton";
import Button from "./UI/Button/Button";
import Textarea from "./UI/Textarea/Textarea";
import PostService from "../api/PostService";
import DeleteButton from "./UI/DeleteButton/DeleteButton";
import {useNavigate} from "react-router-dom";

const PostItem = ({post, sessionUser}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [content, setContent] = useState(post.content);
    const router = useNavigate();

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        if(!isEmpty) {
            const form = {
                content: content
            }
            const res = await PostService.update(form, post.id);
            if(res.status === 200){
                window.location.reload();
            }
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const res = await PostService.delete(post.id);
        if(res.status === 200){
            router("/home");
        }
    }

    return (
        <div className="postitem">
            <div className="postitem-inner">
                <div className="postitem-title">
                    <h3>Пост</h3>
                </div>
                <div className="postitem-main">
                    <PageAvatar />
                    <div className="postitem-main-body">
                        <div className="postitem-main-body-top">
                            <div className="postitem-main-body-top-user" onClick={() => router("/user/"+post.user.id)}>
                                <h4>{post.user.nickname}</h4>
                                <h6>@{post.user.username}</h6>
                            </div>
                            <div className="postitem-main-body-top-delete">
                                {sessionUser.role === "ADMIN" || post.user.id === sessionUser.id
                                    ? <DeleteButton onClick={handleDelete}/>
                                    : ""
                                }
                            </div>
                        </div>
                        <div className="postitem-main-body-content">
                            {post.user.id === sessionUser.id
                                ?
                                <>
                                    {isEdit
                                        ?
                                        <div className="postitem-main-body-content-edit">
                                            <Textarea
                                                placeholder={!isEmpty ? "Ваши мысли..." : "Нужно что-нибудь написать!"}
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                            />
                                            <Button onClick={handleEdit}>Подтвердить</Button>
                                        </div>
                                        : <p>{post.content}</p>
                                    }
                                    <EditButton onClick={handleIsEdit}/>
                                </>
                                :
                                <p>{post.content}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;