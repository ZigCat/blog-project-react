import React, { Component } from 'react';
import "../styles/components/userform.scss";
import PageAvatar from "./UI/PageAvatar/PageAvatar";
import Input from "./UI/Input/Input";
import Button from "./UI/Button/Button";
import UserService from "../api/UserService";
import ErrorItem from "./error/ErrorItem";
import {Buffer} from "buffer";

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                nickname: props.user.nickname,
                username: props.user.username,
                email: props.user.email,
                role: props.user.role
            },
            password: "",
            orPassword: "",
            correctForm: true,
            editPwd: false,
            errorStatus: "",
            newUser: {}
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user, sessionUser, setIsEdit } = this.props;
            const { form, password, orPassword, editPwd, newUser } = this.state;

            if (editPwd) {
                if (orPassword !== "" && orPassword === password) {
                    const res = await UserService.updatePwd({ password }, user.id);
                    const authString = Buffer
                        .from(`${res.data.username}:${password}`)
                        .toString('base64');
                    localStorage.clear();
                    localStorage.setItem("id", res.data.id);
                    localStorage.setItem("auth", authString);
                    this.setState({newUser: res.data}, () => {
                        setIsEdit();
                    });
                } else {
                    this.setState({ correctForm: false });
                }
            } else if (
                (sessionUser.role === "ADMIN" && user.id !== sessionUser.id && form.role !== "") ||
                this.checkFields()
            ) {
                const res = await UserService.update(form, user.id);
                this.setState({newUser: res.data}, () => {
                    setIsEdit();
                });
            } else {
                this.setState({ correctForm: false });
            }
        } catch (error) {
            this.setState({ errorStatus: error.message });
        }
    };

    checkFields = () => {
        const { form } = this.state;
        return (
            form.username !== "" &&
            form.email !== "" &&
            form.nickname !== "" &&
            form.role !== ""
        );
    };

    handleForm = (type, value) => {
        this.setState({
            form: {
                ...this.state.form,
                [type]: value
            }
        });
    };

    handleEditPwd = (e) => {
        e.preventDefault();
        this.setState({ editPwd: !this.state.editPwd });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.editPwd !== this.state.editPwd){
            this.setState({form: {
                    nickname: this.props.user.nickname,
                    username: this.props.user.username,
                    email: this.props.user.email,
                    role: this.props.user.role
                }, password: "", orPassword: ""});

        }
    }

    componentWillUnmount() {
        if(this.props.user.id === this.props.sessionUser.id
            && Object.keys(this.state.newUser).length > 0){
            this.props.setUser(this.state.newUser);
        }
    }

    render() {
        const { user, sessionUser, setIsEdit } = this.props;
        const {
            form,
            password,
            orPassword,
            correctForm,
            editPwd,
            errorStatus
        } = this.state;

        return (
            <div className="useredit">
                <div className="useredit-inner">
                    {errorStatus ? (
                        <ErrorItem message={errorStatus} />
                    ) : (
                        <>
                            <div className="useredit-banner"></div>
                            <div className="useredit-info">
                                <div className="useredit-info-top">
                                    <PageAvatar />
                                </div>
                                <form className="useredit-info-main">
                                    <div className="useredit-info-main-title">
                                        <h2>{correctForm ? "Изменить страницу" : "Проверьте поля"}</h2>
                                        {sessionUser.id === user.id ? (
                                            <Button onClick={(e) => this.handleEditPwd(e)}>
                                                {editPwd ? "Вернуться" : "Изменить пароль"}
                                            </Button>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    {editPwd ? (
                                        <>
                                            <div className="useredit-info-main-item">
                                                <span>Новый пароль: </span>
                                                <Input
                                                    type="password"
                                                    value={orPassword}
                                                    onChange={(e) => this.setState({ orPassword: e.target.value })}
                                                />
                                            </div>
                                            <div className="useredit-info-main-item">
                                                <span>Подтвердите пароль: </span>
                                                <Input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => this.setState({ password: e.target.value })}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {user.id === sessionUser.id ? (
                                                <>
                                                    <div className="useredit-info-main-item">
                                                        <span>Ваш псевдоним: </span>
                                                        <Input
                                                            type="text"
                                                            value={form.nickname}
                                                            onChange={(e) => this.handleForm("nickname", e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="useredit-info-main-item">
                                                        <span>Имя пользователя: </span>
                                                        <Input
                                                            type="text"
                                                            value={form.username}
                                                            onChange={(e) => this.handleForm("username", e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="useredit-info-main-item">
                                                        <span>Email: </span>
                                                        <Input
                                                            type="email"
                                                            value={form.email}
                                                            onChange={(e) => this.handleForm("email", e.target.value)}
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                            {sessionUser.role === "ADMIN" ? (
                                                <>
                                                    <div className="useredit-info-main-item">
                                                        <span>Роль: </span>
                                                        <Input
                                                            type="text"
                                                            value={form.role}
                                                            onChange={(e) => this.handleForm("role", e.target.value)}
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </>
                                    )}
                                    <div className="useredit-info-main-buttons">
                                        <Button onClick={this.handleSubmit}>Подтвердить</Button>
                                        <Button onClick={setIsEdit}>Отмена</Button>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default UserForm;
