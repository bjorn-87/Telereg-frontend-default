import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './UpdateHead.css';
import config from '../../config';
import PropTypes from 'prop-types';
import Auth from '../auth/Auth';

class UpdateHead extends Component {
    constructor(props) {
        super(props);

        this.user = Auth.GetUser();
        this.id = props.match.params.id;
        this.url = `${config.baseUrl}connections?id=${this.id}`;
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
            search: "",
            redirect: false
        };
    }

    componentDidMount() {
        this.getContent(this.url);
    }

    async getContent(url) {
        const token = await Auth.GetToken();

        fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "authorization": token.accessToken
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    this.setState(res.data.head);
                    this.setState({
                        isLoaded: true,
                        line: res.data.line
                    });
                } else if (res.errors) {
                    this.setState({error: res.errors});
                }
            });
    }

    submitHandler(event) {
        event.preventDefault();
        console.log(this.user);
        this.setState({
            redirect: true
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const {
            line,
            isLoaded,
            Id,
            redirect
        } = this.state;

        if (redirect) {
            return <Redirect to={`/connection/${this.id}`}/>;
        } else if (isLoaded && Id) {
            return (
                <main className="mainPage">
                    <div className="headerDataHead">
                        <div className="headerBlock">
                            <h5>Nummer:</h5>
                            <p>{this.state.Number}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>Namn:</h5>
                            <input
                                type="text"
                                name="Name"
                                value={this.state.Name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Typ:</h5>
                            <input
                                type="text"
                                name="Apptype"
                                value={this.state.Apptype}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Typ2:</h5>
                            <input
                                type="text"
                                name="ApptypeTwo"
                                value={this.state.ApptypeTwo}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Document:</h5>
                            <input
                                type="text"
                                name="Document"
                                value={this.state.Document}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Ritning:</h5>
                            <input
                                type="text"
                                name="Drawing"
                                value={this.state.Drawing}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Funktion:</h5>
                            <input
                                type="text"
                                name="Func"
                                value={this.state.Func}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Address:</h5>
                            <input
                                type="text"
                                name="Address"
                                value={this.state.Address}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Användare:</h5>
                            <p>{this.state.UserFullName}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>AnvändarId:</h5>
                            <p>{this.state.UserId}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>Övrigt:</h5>
                            <textarea
                                type="text"
                                name="Other"
                                className="other"
                                value={this.state.Other}
                                onChange={this.handleChange}
                            ></textarea>
                        </div>
                        <div className="headerBlock">
                            <input
                                type="submit"
                                value="Spara"
                                onClick={this.submitHandler}
                            />
                        </div>
                    </div>
                    <div>
                        <table className="table table-scroll table-stacked">
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
                                        <td>--&gt;</td>
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
