import React, {useState} from 'react';
import PageAvatar from "./UI/PageAvatar/PageAvatar";
import "../styles/components/useritem.scss";
import Button from "./UI/Button/Button";
import Input from "./UI/Input/Input";
import {useNavigate} from "react-router-dom";
import UserService from "../api/UserService";
import EditButton from "./UI/EditButton/EditButton";
import ErrorItem from "./error/ErrorItem";

const UserItem = ({user, sessionUser, setIsEdit}) => {
    const [isDelete, setIsDelete] = useState(false);
    const [email, setEmail] = useState("");
    const [errorStatus, setErrorStatus] = useState("");
    const router = useNavigate();

    const handleIsDelete = () => {
        setIsDelete(!isDelete);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(email === user.email){
                const res = await UserService.delete(user.id);
                if(user.id !== sessionUser.id){
                    router("/home");
                } else {
                    localStorage.clear();
                    window.location.reload();
                }
            }
        } catch (error){
            setErrorStatus(error.message);
        }
    }

    return (
        <div className="useritem">
            <div className="useritem-inner">
                {errorStatus ? <ErrorItem message={errorStatus}/> :
                <>
                    <div className="useritem-banner"></div>
                    <div className="useritem-info">
                        <div className="useritem-info-top">
                            <PageAvatar />
                        </div>
                        <div className="useritem-info-main">
                            <div className="useritem-info-main-head">
                                <h2>{user.nickname}</h2>
                                {user.id === sessionUser.id || sessionUser.role === "ADMIN"
                                    ? <EditButton onClick={setIsEdit} />
                                    : <></>
                                }
                            </div>
                            <h4>@{user.username}</h4>
                            <span>
                                <img src="../calendar.svg" alt=""/>
                                <span>Зарегистрировался {user.creationDate}</span>
                            </span>
                            {sessionUser.id === user.id || sessionUser.role === "ADMIN"
                                ?
                                <div className="useritem-info-main-delete">
                                    <Button onClick={handleIsDelete} color={{backgroundColor: '#F15959'}}>Удалить аккаунт</Button>
                                    {isDelete
                                        ?
                                        <div className="useritem-info-main-delete-confirm">
                                            <span>Напишите для подтверждения email аккаунта</span>
                                            <div className="useritem-info-main-delete-confirm-field">
                                                <Input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <Button onClick={handleSubmit} color={{backgroundColor: '#F15959'}}>Подтвердить</Button>
                                            </div>
                                        </div>
                                        : ""
                                    }
                                </div>
                                : ""
                            }
                        </div>
                    </div>
                </>
                }
            </div>
        </div>
    );
};

export default UserItem;