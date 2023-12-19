import React, {useEffect, useState} from 'react';
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import UserService from "../api/UserService";
import {Buffer} from "buffer";
import ErrorItem from "../components/error/ErrorItem";

const Login = () => {
    const [correctForm, setCorrectForm] = useState(true);
    const [errorStatus, setErrorStatus] = useState("");
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const handleForm = (type, value) => {
        setForm({
            ...form,
            [type]: value,
        });
    };

    const checkFields = () => {
        return form.username !== ""
            && form.password !== "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Here 2");
        console.log(form);
        try{
            if(checkFields()){
                const authString = Buffer
                    .from(`${form.username}:${form.password}`)
                    .toString('base64');
                const response = await UserService.login(authString);
                let user = response.data;
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
            console.log("Here 1");
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
                                    {correctForm ? "Вход" : "Проверьте поля"}
                                </h1>
                            </div>
                            <div className="registration-body">
                                <form action="">
                                    <div className="registration-body-section">
                                        <div className="registration-body-el">
                                            <span>Имя пользователя:</span>
                                            <Input
                                                type="text"
                                                value={form.username}
                                                onChange={(e) => handleForm("username", e.target.value)}
                                            />
                                        </div>
                                        <div className="registration-body-el">
                                            <span>Пароль:</span>
                                            <Input
                                                type="password"
                                                value={form.password}
                                                onChange={(e) => handleForm("password", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="registration-body-buttons">
                                        <Button redirect="/registration">Зарегистрироваться</Button>
                                        <Button onClick={handleSubmit}>Войти</Button>
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

export default Login;