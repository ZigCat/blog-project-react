import React, {useEffect, useState} from 'react';
import {Buffer} from 'buffer';
import UserService from "../api/UserService";
import "../styles/pages/registration.scss";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import ErrorItem from "../components/error/ErrorItem";

const Registration = () => {
    const [correctForm, setCorrectForm] = useState(true);
    const [errorStatus, setErrorStatus] = useState("");
    const [form, setForm] = useState({
        username: "",
        nickname: "",
        email: "",
        password: "",
        role: "USER"
    })

    const handleForm = (type, value) => {
        setForm({
            ...form,
            [type]: value,
        });
    };

    const checkFields = () => {
        return form.username !== ""
            && form.email !== ""
            && form.password !== ""
            && form.nickname !== "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(checkFields()){
                const response = await UserService.addUser(form);
                let user = response.data;
                const authString = Buffer
                    .from(`${form.username}:${form.password}`)
                    .toString('base64');
                localStorage.clear();
                localStorage.setItem("id", user.id);
                localStorage.setItem("auth", authString);
                window.location.reload();
            } else {
                setCorrectForm(false);
            }
        } catch (e){
            setErrorStatus(e.message);
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            handleSubmit(e);
        }
    }

    useEffect(() => {
        const onKeyDown = (e) => handleKeyPress(e);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [form]);

    return (
        <div className="registration">
            <div className="container">
                <div className="registration-inner">
                    {errorStatus ? <ErrorItem message={errorStatus}/> :
                        <>
                            <div className="registration-title">
                                <h1>
                                    {correctForm ? "Регистрация" : "Проверьте поля"}
                                </h1>
                            </div>
                            <div className="registration-body">
                                <form action="">
                                    <div className="registration-body-section">
                                        <div className="registration-body-item">
                                            <span>Ваш псевдоним:</span>
                                            <Input
                                                type="text"
                                                value={form.nickname}
                                                onChange={(e) => handleForm("nickname", e.target.value)}
                                            />
                                        </div>
                                        <div className="registration-body-item">
                                            <span>Имя пользователя:</span>
                                            <Input
                                                type="text"
                                                value={form.username}
                                                onChange={(e) => handleForm("username", e.target.value)}
                                            />
                                        </div>
                                        <div className="registration-body-item">
                                            <span>Email:</span>
                                            <Input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => handleForm("email", e.target.value)}
                                            />
                                        </div>
                                        <div className="registration-body-item">
                                            <span>Пароль:</span>
                                            <Input
                                                type="password"
                                                value={form.password}
                                                onChange={(e) => handleForm("password", e.target.value)}
                                            />
                                        </div>
                                        <div className="registration-body-item">
                                            <input type="checkbox" id="checkbox" />
                                            <label htmlFor="checkbox">Согласен с условиями лицензионного соглашения</label>
                                        </div>
                                    </div>
                                    <div className="registration-body-buttons">
                                        <Button onClick={handleSubmit}>Зарегистрироваться</Button>
                                        <Button redirect="/login">Войти</Button>
                                    </div>
                                </form>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Registration;