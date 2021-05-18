import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../../config';
import Auth from '../auth/Auth';
import './CreateDelete.css';

class NewLine extends Component {
    constructor(props) {
        super(props);

        this.url = `${config.baseUrl}lines`;
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            Id: props.match.params.id,
            redirect: false
        };
    }

    componentDidMount() {
        this.submitHandler();
    }

    async submitHandler() {
        const token = await Auth.GetToken();

        let payload = {
            teleregid: this.state.Id
        };

        fetch(this.url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "authorization": token.accessToken
            },
            body: JSON.stringify(payload)
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
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
            return <Redirect to={`/update/line/${Id}`}/>;
        } else {
            return (
                <main className="mainPage">
                    <h3 className="loading">Läser in data...</h3>
                </main>
            );
        }
    }
}

NewLine.propTypes = {
    match: PropTypes.object.isRequired
};

export default NewLine;
