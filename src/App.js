import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Layout from './layout/DefaultLayout';
import AppRouter from "./components/routers/AppRouter";
import "./styles/all.scss";
import UnauthorizedAppRouter from "./components/routers/UnauthorizedAppRouter";
import ErrorBoundary from "./components/error/ErrorBoundary";

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("id")){
            setIsAuth(false);
        } else {
            setIsAuth(true);
        }
        console.log(isAuth);
    }, []);

    return (
        <BrowserRouter>
            <ErrorBoundary>
                {isAuth ? (
                    <UnauthorizedAppRouter />
                ) : (
                    <Layout>
                        <AppRouter />
                    </Layout>
                )}
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default App;
