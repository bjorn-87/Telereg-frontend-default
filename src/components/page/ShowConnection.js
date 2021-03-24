import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ShowConnection.css';
import DateFormatter from '../content/DateFormatter';
import config from '../../config';
import PropTypes from 'prop-types';

class ShowConnection extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.url = `${config.baseUrl}connections?id=${this.id}&api_key=${config.apiKey}`;
        this.getContent = this.getContent.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        // this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            data: {
                head: [],
                line: []
            },
            error: "",
            isloaded: false,
            search: ""
        };
    }

    componentDidMount() {
        this.getContent(this.url);
    }

    getContent(url) {
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    // console.log(res.data);
                    this.setState({
                        data: res.data,
                        isloaded: true
                    });
                } else {
                    this.setState({error: res});
                }
            });
    }

    changeHandler(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const {data, isloaded} = this.state;

        if (!isloaded) {
            return <div className="loading"><h2>Loading data...</h2></div>;
        } else if (data.head.length === 0) {
            console.log(data);
            return <div className="notFound"><h1>404 Page not found</h1></div>;
        } else {
            console.log(data);
            return (
                <main className="mainPage">
                    <div className="connectionNavBar">
                        <Link
                            to={`/update/head/${encodeURIComponent(data.head.Id)}`}
                        >Redigera huvud</Link>
                        <Link
                            to={`/update/line/${encodeURIComponent(data.head.Id)}`}
                        >Redigera Linje</Link>
                        <Link
                            to={`/delete/connection/${encodeURIComponent(data.head.Id)}`}
                        >Radera Kopplingskort</Link>
                    </div>
                    <div className="headerData">
                        <p><b>Nummer:</b> {data.head.Number}</p>
                        <p><b>Namn:</b> {data.head.Name}</p>
                        <p><b>Funktion:</b> {data.head.Func}</p>
                        <p><b>Address:</b> {data.head.Address}</p>
                        <p>
                            <b>Skapad: </b>
                            <DateFormatter input={data.head.Created} type={"created"} />
                        </p>
                        <p>
                            <b>Uppdaterad: </b>
                            <DateFormatter input={data.head.Updated} type={"updated"} />
                        </p>
                        <p><b>Apptyp: </b>{data.head.Apptype}</p>
                        <p><b>Apptyp2: </b>{data.head.ApptypeTwo}</p>
                        <p><b>Användarnamn: </b>{data.head.UserId}</p>
                        <p><b>Användare: </b>{data.head.UserFullName}</p>
                        <p><b>Ritning: </b>{data.head.Drawing}</p>
                        <p><b>Dokument: </b>{data.head.Document}</p>
                        <p><b>Dokument: </b>{data.head.Comment}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Notering</th>
                                <th>Ställ</th>
                                <th>Från fält</th>
                                <th>Från nummer</th>
                                <th>Från uttag</th>
                                <th>          </th>
                                <th>Till fält</th>
                                <th>Till nummer</th>
                                <th>Till uttag</th>
                                <th>Kommentar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.line ? data.line.map(element => (
                                <tr key={element.Id}>
                                    <td>{element.Position}</td>
                                    <td>{element.Note}</td>
                                    <td>{element.Rack}</td>
                                    <td>{element.FieldFrom}</td>
                                    <td>{element.NrFrom}</td>
                                    <td>{element.KlFrom}</td>
                                    <td>----&gt;</td>
                                    <td>{element.FieldTo}</td>
                                    <td>{element.NrTo}</td>
                                    <td>{element.KlTo}</td>
                                    <td>{element.Comment}</td>
                                </tr>
                            )) : null}
                        </tbody>
                    </table>
                </main>
            );
        }
    }
}

ShowConnection.propTypes = {
    match: PropTypes.object.isRequired
};

export default ShowConnection;
