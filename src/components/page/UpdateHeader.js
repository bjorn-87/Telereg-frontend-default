import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import config from '../../config';
import PropTypes from 'prop-types';
import Auth from '../auth/Auth';
import './UpdateHeader.css';
import './NavBar.css';
import '../content/Buttons.css';

class UpdateHeader extends Component {
    constructor(props) {
        super(props);

        this.user = Auth.GetUser();
        this.id = props.match.params.id;
        this.url = config.baseUrl;
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
        this.getContent(`${this.url}connections/${this.id}`);
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

    async submitHandler(event) {
        event.preventDefault();

        const {
            Address,
            Apptype,
            ApptypeTwo,
            Document,
            Drawing,
            Func,
            Id,
            Name,
            Number,
            Other } = this.state;

        const token = await Auth.GetToken();

        let payload = {
            id: Id,
            number: Number,
            name: Name,
            func: Func,
            address: Address,
            drawing: Drawing,
            apptype: Apptype,
            document: Document,
            userid: this.user.userName,
            apptypetwo: ApptypeTwo,
            userfullname: this.user.name,
            other: Other,
        };

        fetch(`${this.url}headers`, {
            method: 'PUT',
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
                } else {
                    let err;

                    switch (res.status) {
                        case 409:
                            err = "Numret är upptaget";
                            break;
                        case 400:
                            err = "Numret saknas";
                            break;
                        default:
                            err = "Något gick fel";
                            break;
                    }
                    this.setState({error: err});
                }
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
            redirect,
            error
        } = this.state;

        if (redirect) {
            return <Redirect to={`/connection/${this.id}`}/>;
        } else if (isLoaded && Id) {
            return (
                <main className="mainPage">
                    <div className="connectionNavBar">
                        <Link to={`/connection/${this.id}`} className="blue-button">
                            Tillbaka
                        </Link>
                    </div>
                    {error ? <h2>{error}</h2> : null}
                    <form className="headerDataHead" onSubmit={this.submitHandler}>
                        <div className="headerBlock">
                            <h5>Nummer:</h5>
                            <input
                                required
                                maxLength="50"
                                type="text"
                                name="Number"
                                value={this.state.Number}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Namn:</h5>
                            <input
                                maxLength="50"
                                type="text"
                                name="Name"
                                value={this.state.Name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Typ:</h5>
                            <input
                                maxLength="50"
                                type="text"
                                name="Apptype"
                                value={this.state.Apptype}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Typ2:</h5>
                            <input
                                maxLength="50"
                                type="text"
                                name="ApptypeTwo"
                                value={this.state.ApptypeTwo}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Document:</h5>
                            <input
                                maxLength="50"
                                type="text"
                                name="Document"
                                value={this.state.Document}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Ritning:</h5>
                            <input
                                maxLength="50"
                                type="text"
                                name="Drawing"
                                value={this.state.Drawing}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Funktion:</h5>
                            <input
                                maxLength="50"
                                type="text"
                                name="Func"
                                value={this.state.Func}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Adress:</h5>
                            <input
                                maxLength="50"
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
                                maxLength="100"
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
                            />
                        </div>
                    </form>
                    <div>
                        <table className="table table-stacked">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Notering</th>
                                    <th>Ställ</th>
                                    <th>Fält</th>
                                    <th>Nummer</th>
                                    <th>Uttag</th>
                                    <th>          </th>
                                    <th>Fält</th>
                                    <th>Nummer</th>
                                    <th>Uttag</th>
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
                                        <td className="comment"><p>{element.Comment}</p></td>
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

UpdateHeader.propTypes = {
    match: PropTypes.object.isRequired
};

export default UpdateHeader;
