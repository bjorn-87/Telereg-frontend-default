import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import App from './App';
import { authProvider } from './authProvider';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <AzureAD provider={authProvider} forceLogin={true}>
            {
                ({authenticationState, error}) => {
                    switch (authenticationState) {
                        case AuthenticationState.Authenticated:
                            return (
                                <App />
                            );
                        case AuthenticationState.Unauthenticated:
                            return (
                                <div>
                                    {error && <p>
                                        <span className="spanStyle">
                                            Behörighet saknas för denna applikation.
                                        </span>
                                    </p>}
                                </div>
                            );
                        case AuthenticationState.InProgress:
                            return (<p>Autentiserar...</p>);
                    }
                }
            }
        </AzureAD>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
