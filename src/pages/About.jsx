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
                    {/* Добавьте еще контента или компонентов Bootstrap */}
                </div>
                <div className="col-md-6">
                    {/* Добавьте еще контента или компонентов Bootstrap */}
                </div>
            </div>
        </div>
    );
};

export default About;
