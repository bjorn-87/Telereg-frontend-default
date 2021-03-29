import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './UpdateHeader.css';
import config from '../../config';
import Auth from '../auth/Auth';

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
            Other: "",
            errors: "",
            search: "",
            redirect: false
        };
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
            userid: UserId,
            other: Other
        };

        // console.log(payload);

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
                    console.log(res);
                    this.setState({
                        Id: res.data.id,
                        redirect: true
                    });
                } else if (res.errors) {
                    let err = "";

                    switch (res.errors.status) {
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
                            <h5>Address:</h5>
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
                </main>
            );
        }
    }
}

export default NewHeader;
