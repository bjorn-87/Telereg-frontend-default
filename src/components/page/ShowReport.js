import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import Auth from '../auth/Auth';
import './Table.css';
import './ShowReport.css';

class Showreport extends Component {
    constructor(props) {
        super(props);
        this.url = `${config.baseUrl}connections/report`;
        this.getContent = this.getContent.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            data: [],
            Field: "",
            Rack: "",
            error: "",
            isloaded: false,
            search: ""
        };
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
                    this.setState({
                        data: res.data,
                        isloaded: true
                    });
                } else if (res.errors) {
                    this.setState({error: res.errors});
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

    submitHandler(event) {
        const { Rack, Field } = this.state;

        console.log(Rack);
        console.log(Field);

        this.getContent(`${this.url}?rack=${Rack}&field=${Field}`);
        event.preventDefault();
    }

    render() {
        const {data, isloaded} = this.state;

        let key = 0;

        console.log(data);
        console.log(isloaded);

        return (
            <main className="mainPage">
                <div className="backButton">
                    <Link className="blue-button" to="/">Tillbaka</Link>
                </div>
                <div className="reportContainer">
                    <h4>Nätbeläggningsrapport</h4>
                    <form className="reportForm" onSubmit={this.submitHandler}>
                        <label htmlFor="Rack">Ställ:</label>
                        <input
                            required
                            id="Rack"
                            type="text"
                            name="Rack"
                            placeholder="Sök ställ"
                            value={this.state.Rack}
                            onChange={this.changeHandler}
                        />
                        <label htmlFor="Field">Fält:</label>
                        <input
                            required
                            id="Field"
                            type="text"
                            name="Field"
                            placeholder="Sök fält"
                            value={this.state.Field}
                            onChange={this.changeHandler}
                        />
                        <input
                            className="createButton"
                            type="submit"
                            value="Sök"
                        />
                    </form>
                </div>
                {isloaded ?
                    <table className="reportTable table-stacked">
                        <thead>
                            <tr>
                                <th>Ställ</th>
                                <th>Fält</th>
                                <th>Nr</th>
                                <th>Uttag</th>
                                <th>Nummer</th>
                                <th>Namn</th>
                                <th>Adress</th>
                                <th>Kommentar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map(element => (
                                <tr key={key++}>
                                    <td>{element.Rack}</td>
                                    <td>{element.Field}</td>
                                    <td>{element.Nr}</td>
                                    <td>{element.Kl}</td>
                                    <td>{element.Number}</td>
                                    <td>{element.Name}</td>
                                    <td>{element.Address}</td>
                                    <td>{element.Other}</td>
                                </tr>
                            )) : null}
                        </tbody>
                    </table>
                    : null}
            </main>
        );
    }
}

export default Showreport;
