import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    return (
        <div className="container">
            <h1>О нас</h1>
            <p>Добро пожаловать на нашу платформу, похожую на Twitter! Вот некоторая информация о нас.</p>
            <hr />
            <h2>Наша команда</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Роль</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Solomon Kazakpayev</td>
                    <td>Основатель</td>
                </tr>
                <tr>
                    <td>John Doe</td>
                    <td>Разработчик</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="2">Всего участников в команде: 2</td>
                </tr>
                </tfoot>
            </table>
            <br />
            <div className="row">
                <div className="col-md-6">
                    <h2>Адреса</h2>
                    <ul className="list-group">
                        <li className="list-group-item">г.Алматы, ул. Абая 52в</li>
                        <li className="list-group-item">г.Алматы, ул. Манаса 34/1</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <h2>Контакты</h2>
                    <ul className="list-group">
                        <li className="list-group-item">31552@iitu.edu.kz</li>
                        <li className="list-group-item"><a href="https://github.com/ZigCat/blog-project-react" target="_blank">GitHub</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;
