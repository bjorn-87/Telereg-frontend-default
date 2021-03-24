import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './UpdateHead.css';
import config from '../../config';
import PropTypes from 'prop-types';

class UpdateHead extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        console.log(this.id);
        this.url = `${config.baseUrl}connections?id=${this.id}&api_key=${config.apiKey}`;
        this.getContent = this.getContent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            Address: "",
            Apptype: "",
            ApptypeTwo: "",
            Created: "",
            Deleted: "",
            Document: "",
            Drawing: "",
            Func: "",
            Id: "",
            Name: "",
            Number: "",
            Other: "",
            Updated: "",
            UserFullName: "",
            UserId: "",
            head: {},
            line: {},
            error: "",
            isLoaded: false,
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
                    console.log(res.data);

                    this.setState(res.data.head);
                    this.setState({
                        isLoaded: true,
                        line: res.data.line
                    });
                    console.log(this.state);
                } else {
                    this.setState({error: res});
                }
            });
    }

    submitHandler(event) {
        console.log(this.state);
        // this.getContent(`${this.baseUrl}`);
        event.preventDefault();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log(value);
        console.log(name);

        this.setState({
            [name]: value
        });
    }

    render() {
        const {
            line,
            isLoaded,
            Id,
        } = this.state;

        if (isLoaded && Id) {
            return (
                <main className="mainPage">
                    <div>
                        <form className="headerForm" onSubmit={this.submitHandler}>
                            Namn:<input
                                type="text"
                                name="Name"
                                value={this.state.Name}
                                onChange={this.handleChange}
                            />
                            Nummer:<input
                                type="text"
                                name="Number"
                                value={this.state.Number}
                                onChange={this.handleChange}
                            />
                            Typ:<input
                                type="text"
                                name="Apptype"
                                value={this.state.Apptype}
                                onChange={this.handleChange}
                            />
                            Typ2:<input
                                type="text"
                                name="ApptypeTwo"
                                value={this.state.ApptypeTwo}
                                onChange={this.handleChange}
                            />
                            Document:<input
                                type="text"
                                name="Document"
                                value={this.state.Document}
                                onChange={this.handleChange}
                            />
                            Ritning:<input
                                type="text"
                                name="Drawing"
                                value={this.state.Drawing}
                                onChange={this.handleChange}
                            />
                            Funktion:<input
                                type="text"
                                name="Func"
                                value={this.state.Func}
                                onChange={this.handleChange}
                            />
                            Address:<input
                                type="text"
                                name="Address"
                                value={this.state.Address}
                                onChange={this.handleChange}
                            />
                            Användare:<input
                                type="text"
                                name="UserFullName"
                                value={this.state.UserFullName}
                                onChange={this.handleChange}
                            />
                            AnvändarId:<input
                                type="text"
                                name="UserId"
                                value={this.state.UserId}
                                onChange={this.handleChange}
                            />
                            Övrigt:<input
                                type="text"
                                name="Other"
                                className="other"
                                value={this.state.Other}
                                onChange={this.handleChange}
                            />
                            <input
                                type="submit"
                                value="Skicka"
                            />
                        </form>
                    </div>
                    <div>
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
                                {line ? line.map(element => (
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
                                        <td className="comment">{element.Comment}</td>
                                    </tr>
                                )) : null}
                            </tbody>
                        </table>
                    </div>
                </main>
            );
        } else if (isLoaded && !Id) {
            return <div className="PageNotFound"><h2>404 PageNotFound</h2></div>;
        } else {
            return <div className="loading"><h2>Loading data...</h2></div>;
        }
    }
}

UpdateHead.propTypes = {
    match: PropTypes.object.isRequired
};

export default UpdateHead;
