import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../../config';
import Auth from '../auth/Auth';
import './UpdateHeader.css';
import '../content/Buttons.css';
import './CreateDelete.css';

class DeleteConnection extends Component {
    constructor(props) {
        super(props);

        this.url = `${config.baseUrl}connections`;
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            Id: props.match.params.id,
            redirect: false
        };
    }

    async submitHandler(event) {
        event.preventDefault();
        const token = await Auth.GetToken();

        let payload = {
            id: this.state.Id
        };

        fetch(this.url, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                "authorization": token.accessToken
            },
            body: JSON.stringify(payload)
        })
            .then((response) => response)
            .then((res) => {
                if (res.ok) {
                    this.setState({
                        redirect: true
                    });
                }
            });
    }

    render() {
        const {
            redirect,
            Id,
        } = this.state;

        if (redirect) {
            return <Redirect to={`/`}/>;
        } else {
            return (
                <main>
                    <div className="backButton">
                        <Link to={`/connection/${Id}`}>Tillbaka</Link>
                    </div>
                    <div className="confirmationBox">
                        <h2>Är du säker?</h2>
                        <button
                            className="deleteButton red-button"
                            onClick={this.submitHandler}
                        >Radera
                        </button>
                    </div>
                </main>
            );
        }
    }
}

DeleteConnection.propTypes = {
    match: PropTypes.object.isRequired
};

export default DeleteConnection;
