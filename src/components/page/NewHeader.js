import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import './UpdateHeader.css';
import config from '../../config';
import Auth from '../auth/Auth';
import '../content/Buttons.css';

class NewHeader extends Component {
    constructor(props) {
        super(props);

        this.user = Auth.GetUser();
        this.url = `${config.baseUrl}headers`;
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            Id: "",
            Number: "",
            Name: "",
            Address: "",
            Apptype: "",
            ApptypeTwo: "",
            Document: "",
            Drawing: "",
            Func: "",
            UserFullName: this.user.name,
            UserId: this.user.userName,
            Contact: "",
            Other: "",
            errors: "",
            search: "",
            redirect: false
        };
    }

    componentDidMount() {
        window.scrollTo({top: 0});
    }

    async submitHandler(event) {
        event.preventDefault();
        const token = await Auth.GetToken();

        const {Number,
            Name,
            Address,
            Apptype,
            ApptypeTwo,
            Document,
            Drawing,
            Func,
            UserFullName,
            Contact,
            UserId,
            Other} = this.state;

        let payload = {
            number: Number,
            name: Name,
            address: Address,
            apptype: Apptype,
            apptypetwo: ApptypeTwo,
            document: Document,
            drawing: Drawing,
            func: Func,
            userfullname: UserFullName,
            contact: Contact,
            userid: UserId,
            other: Other
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
                        Id: res.data.id,
                        redirect: true
                    });
                } else if (res.errors) {
                    let err = "";

                    switch (res.errors.status) {
                        case 409:
                            err = "Förbindelsen är upptagen";
                            break;
                        case 400:
                            err = "Förbindelsen saknas";
                            break;
                        default:
                            err = "Något gick fel";
                            break;
                    }
                    this.setState({errors: err});
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
            redirect,
            errors,
            Id,
        } = this.state;

        if (redirect) {
            return <Redirect to={`/connection/${Id}`}/>;
        } else {
            return (
                <main className="mainPage">
                    <div className="error">
                        {errors ? <h3>{errors}</h3> : null}
                    </div>
                    <div className="backButton">
                        <Link to="/" className="blue-button">Tillbaka</Link>
                    </div>
                    <form
                        autoComplete="off"
                        className="headerDataHead"
                        onSubmit={this.submitHandler}
                    >
                        <div className="headerBlock">
                            <h5>Förbindelse:</h5>
                            <input
                                required
                                className="upper"
                                placeholder="Förbindelse krävs"
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
                                placeholder="Optionellt"
                                type="text"
                                name="Name"
                                value={this.state.Name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Adress:</h5>
                            <input
                                maxLength="50"
                                placeholder="Optionellt"
                                type="text"
                                name="Address"
                                value={this.state.Address}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Funktion:</h5>
                            <input
                                maxLength="50"
                                placeholder="Optionellt"
                                type="text"
                                name="Func"
                                value={this.state.Func}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Dokument:</h5>
                            <input
                                maxLength="50"
                                placeholder="Optionellt"
                                type="text"
                                name="Document"
                                value={this.state.Document}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Typ:</h5>
                            <input
                                maxLength="50"
                                placeholder="Optionellt"
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
                                placeholder="Optionellt"
                                type="text"
                                name="ApptypeTwo"
                                value={this.state.ApptypeTwo}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Ritning:</h5>
                            <input
                                maxLength="50"
                                placeholder="Optionellt"
                                type="text"
                                name="Drawing"
                                value={this.state.Drawing}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Användare:</h5>
                            <input
                                readOnly
                                className="grayedOut"
                                type="text"
                                value={this.state.UserFullName}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>AnvändarId:</h5>
                            <input
                                readOnly
                                className="grayedOut"
                                type="text"
                                value={this.state.UserId}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Kontaktperson:</h5>
                            <input
                                maxLength="50"
                                placeholder="Optionellt"
                                type="text"
                                name="Contact"
                                value={this.state.Contact}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="headerBlock">
                            <h5>Övrigt:</h5>
                            <textarea
                                maxLength="100"
                                placeholder="Optionellt"
                                type="text"
                                name="Other"
                                className="other"
                                value={this.state.Other}
                                onChange={this.handleChange}
                            ></textarea>
                        </div>
                        <div className="headerBlock">
                            <input
                                className="saveButton blue-button headerButton"
                                type="submit"
                                value="Spara"
                            />
                        </div>
                    </form>
                </main>
            );
        }
    }
}

export default NewHeader;
