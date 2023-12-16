import React, { Component } from 'react';
import ErrorItem from './ErrorItem';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Произошла ошибка:', error);
        console.error('Информация об ошибке:', errorInfo);
        this.setState({ message: 'Произошла ошибка' });
    }

    render() {
        const { message } = this.state;
        const { children } = this.props;

        if (message) {
            return (
                <div className="errorbound">
                    <div className="errorbound-inner">
                        <ErrorItem message={message}/>
                    </div>
                </div>
            );
        }

        return children;
    }
}

export default ErrorBoundary;