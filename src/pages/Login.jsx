import React, {useState} from 'react';
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import UserService from "../api/UserService";
import {Buffer} from "buffer";

const Login = () => {
    const [correctForm, setCorrectForm] = useState(true);
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
        if(checkFields()){
            const authString = Buffer
                .from(`${form.username}:${form.password}`)
                .toString('base64');
            const response = await UserService.login(authString);
            console.log(form);
            if(response.status === 200){
                let user = response.data;
                console.log(user);
                localStorage.clear();
                localStorage.setItem("id", user.id);
                localStorage.setItem("auth", authString);
                window.location.reload();
            } else {
                console.log("Ошибка сервера");
            }
        } else {
            setCorrectForm(false);
        }
    }

    return (
        <div className="registration">
            <div className="container">
                <div className="registration-inner">
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
                </div>
            </div>
        </div>
    );
};

export default Login;