import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../../config';
import PropTypes from 'prop-types';
import Auth from '../auth/Auth';
import './UpdateLine.css';
import './Table.css';


class UpdateLine extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.url = `${config.baseUrl}connections/${this.id}`;
        this.getContent = this.getContent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            head: {
                Id: ""
            },
            clicked: false,
            clickId: 1,
            line: [],
            error: "",
            isLoaded: false,
            search: ""
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
                    this.setState({
                        isLoaded: true,
                        head: res.data.head,
                        line: res.data.line
                    });
                } else if (res.errors) {
                    this.setState({error: res.errors});
                }
            });
    }

    submitHandler(event) {
        const target = event.target;
        const value = target.value;
        const found = this.state.line.find(element => element.Id == value);

        console.log(found);

        this.setState({
            clickId: "",
            clicked: false
        });
        event.preventDefault();
    }

    handleChange = idx => event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const newLine = this.state.line.map((line, lidx) => {
            if (idx !== lidx) {
                return line;
            }
            return {...line, [name]: value };
        });

        this.setState({
            line: newLine
        });
    }

    handleClick(event) {
        const target = event.target;
        const value = parseInt(target.value);

        if (this.state.clicked === true && this.state.clickId !== value) {
            this.setState({
                clickId: value
            });
        } else {
            this.setState(state => ({
                clicked: !state.clicked,
                clickId: value
            }));
        }
        event.preventDefault();
    }

    render() {
        const {
            line,
            isLoaded
        } = this.state;
        const Id = this.state.head.Id;

        if (isLoaded && Id) {
            return (
                <main className="mainPage">
                    <div className="headerDataLine">
                        <div className="headerBlock">
                            <h5>Nummer:</h5><p>{this.state.head.Number}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>Namn:</h5><p>{this.state.head.Name}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>Adress:</h5><p>{this.state.head.Address}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>Funktion:</h5><p>{this.state.head.Func}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>Ritning:</h5><p>{this.state.head.Drawing}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>Apptyp:</h5><p>{this.state.head.Apptype}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>Användare:</h5><p>{this.state.head.UserFullName}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>Dokument:</h5><p>{this.state.head.Document}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>Apptyp2:</h5><p>{this.state.head.ApptypeTwo}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>AnvändarId:</h5><p>{this.state.head.UserId}</p>
                        </div>
                        <div className="headerBlock">
                            <h5>Övrigt:</h5><p>{this.state.head.Other}</p>
                        </div>
                    </div>
                    <div>
                        <table className="table table-scroll table-stacked">
                            <thead>
                                <tr>
                                    <th>Rad</th>
                                    <th>Notering</th>
                                    <th>Ställ</th>
                                    <th>Från fält</th>
                                    <th>Från position</th>
                                    <th>Från uttag</th>
                                    <th>          </th>
                                    <th>Till fält</th>
                                    <th>Till position</th>
                                    <th>Till uttag</th>
                                    <th>Kommentar</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            {line ? line.map((element, idx) => (
                                <tbody key={element.Id}>
                                    {this.state.clickId === element.Id
                                        && this.state.clicked === true
                                        ?
                                        <tr>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="Position"
                                                    value={element.Position}
                                                    onChange={this.handleChange(idx)}
                                                />
                                            </td>
                                            <td>
                                                <textarea
                                                    type="text"
                                                    name="Note"
                                                    className="commentInput"
                                                    value={element.Note}
                                                    onChange={this.handleChange(idx)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="Rack"
                                                    value={element.Rack}
                                                    onChange={this.handleChange(idx)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="FieldFrom"
                                                    value={element.FieldFrom}
                                                    onChange={this.handleChange(idx)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="NrFrom"
                                                    value={element.NrFrom}
                                                    onChange={this.handleChange(idx)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="KlFrom"
                                                    value={element.KlFrom}
                                                    onChange={this.handleChange(idx)}
                                                />
                                            </td>
                                            <td className="arrow">--&gt;</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="FieldTo"
                                                    value={element.FieldTo}
                                                    onChange={this.handleChange(idx)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="NrTo"
                                                    value={element.NrTo}
                                                    onChange={this.handleChange(idx)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="KlTo"
                                                    value={element.KlTo}
                                                    onChange={this.handleChange(idx)}
                                                />
                                            </td>
                                            <td>
                                                <textarea
                                                    name="Comment"
                                                    className="commentInput"
                                                    value={element.Comment}
                                                    onChange={this.handleChange(idx)}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className="saveButton"
                                                    value={element.Id}
                                                    onClick={this.submitHandler}
                                                >Spara</button>
                                            </td>
                                            <td>
                                                <Link to="#">Radera</Link>
                                            </td>
                                        </tr>
                                        :
                                        <tr>
                                            <td>{element.Position}</td>
                                            <td>{element.Note}</td>
                                            <td>{element.Rack}</td>
                                            <td>{element.FieldFrom}</td>
                                            <td>{element.NrFrom}</td>
                                            <td>{element.KlFrom}</td>
                                            <td className="arrow">--&gt;</td>
                                            <td>{element.FieldTo}</td>
                                            <td>{element.NrTo}</td>
                                            <td>{element.KlTo}</td>
                                            <td className="comment">
                                                <p>
                                                    {element.Comment}
                                                </p>
                                            </td>
                                            <td>
                                                <button
                                                    value={element.Id}
                                                    className="editButton"
                                                    onClick={this.handleClick}
                                                >Redigera
                                                </button>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            )) : null}
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

UpdateLine.propTypes = {
    match: PropTypes.object.isRequired
};

export default UpdateLine;
