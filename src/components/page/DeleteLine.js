import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../../config';
import Auth from '../auth/Auth';
import './CreateDelete.css';

class DeleteLine extends Component {
    constructor(props) {
        super(props);

        this.url = `${config.baseUrl}lines`;
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            Id: props.match.params.id,
            back: props.match.params.back,
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
            back,
        } = this.state;

        if (redirect) {
            return <Redirect to={`/update/line/${back}`}/>;
        } else {
            return (
                <main>
                    <div className="backButton">
                        <Link to={`/update/line/${back}`}>Tillbaka</Link>
                    </div>
                    <div className="confirmationBox">
                        <h2>Är du säker?</h2>
                        <button
                            className="deleteButton red-button" onClick={this.submitHandler}
                        >Radera
                        </button>
                    </div>
                </main>
            );
        }
    }
}

DeleteLine.propTypes = {
    match: PropTypes.object.isRequired
};

export default DeleteLine;
