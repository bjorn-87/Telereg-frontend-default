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
            NrTo: "",
            NrFrom: "",
            error: "",
            isloaded: false,
            search: ""
        };
    }

    componentDidMount() {
        window.scrollTo({top: 0});
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
        const { Rack, Field, NrFrom, NrTo } = this.state;

        this.getContent(`${this.url}?rack=${Rack}&field=${Field}&nrfrom=${NrFrom}&nrto=${NrTo}`);
        event.preventDefault();
    }

    render() {
        const {data, isloaded} = this.state;

        let key = 0;

        return (
            <main className="mainPage">
                <div className="connectionNavBar">
                    <Link className="blue-button" to="/">Tillbaka</Link>
                    {isloaded && data.length > 0 ?
                        <Link to={
                            {
                                pathname: `/reportpdf`,
                                data: data
                            }
                        } className="blue-button">Skapa PDF</Link>
                        : null
                    }
                </div>
                <div className="reportContainer">
                    <h4>Nätbeläggningsrapport</h4>
                    <form autoComplete="off" className="reportForm" onSubmit={this.submitHandler}>
                        <label htmlFor="Rack">Ställ:</label>
                        <input
                            required
                            className="upper"
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
                            className="upper"
                            type="text"
                            name="Field"
                            placeholder="Sök fält"
                            value={this.state.Field}
                            onChange={this.changeHandler}
                        />
                        <label htmlFor="NrFrom">Från nummer:</label>
                        <input
                            id="NrFrom"
                            className="upper"
                            type="text"
                            name="NrFrom"
                            placeholder="Från"
                            value={this.state.NrFrom}
                            onChange={this.changeHandler}
                        />
                        <label htmlFor="NrTo">Till nummer:</label>
                        <input
                            id="NrTo"
                            className="upper"
                            type="text"
                            name="NrTo"
                            placeholder="Till"
                            value={this.state.NrTo}
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
                                <th>Förbindelse</th>
                                <th>Namn</th>
                                <th>Adress</th>
                                <th>Kommentar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map(element => (
                                <tr key={key++}>
                                    <td className="upper">{element.Rack}</td>
                                    <td className="upper">{element.Field}</td>
                                    <td className="upper">{element.Nr}</td>
                                    <td className="upper">{element.Kl}</td>
                                    <td className="upper">{element.Number}</td>
                                    <td>{element.Name}</td>
                                    <td>{element.Address}</td>
                                    <td className="comment"><p>{element.Comment}</p></td>
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
