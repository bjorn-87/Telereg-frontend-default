import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../../config';
import PropTypes from 'prop-types';
import Auth from '../auth/Auth';
import './UpdateLine.css';
import './Table.css';
import '../content/Buttons.css';


class UpdateLine extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.url = config.baseUrl;
        this.getContent = this.getContent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.tableInputTextArea = this.tableInputTextArea.bind(this);
        this.tableInput = this.tableInput.bind(this);

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

    async submitHandler(event) {
        event.preventDefault();

        const target = event.target;
        const value = target.value;
        const found = await this.state.line.find(element => element.Id == value);
        const token = await Auth.GetToken();

        let url = `${this.url}lines`;

        let payload = {
            id: found.Id,
            position: found.Position,
            note: found.Note,
            rack: found.Rack,
            fieldfrom: found.FieldFrom,
            nrfrom: found.NrFrom,
            klfrom: found.KlFrom,
            fieldto: found.FieldTo,
            nrto: found.NrTo,
            klto: found.KlTo,
            comment: found.Comment
        };

        fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
                "authorization": token.accessToken
            },
            body: JSON.stringify(payload)
        })
            .then((response) => response)
            .then(() => {
                this.getContent(`${this.url}connections/${this.id}`);
            });

        this.setState({
            clickId: "",
            clicked: false
        });
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

    tableInputTextArea(name, element, idx) {
        return (
            <div className="tableContainer">
                <textarea
                    maxLength="100"
                    name={name}
                    className="commentInput"
                    value={element}
                    onChange={this.handleChange(idx)}
                />
            </div>
        );
    }

    tableInput(name, element, idx) {
        return (
            <div className="tableContainer">
                <input
                    maxLength="50"
                    type="text"
                    name={name}
                    value={element}
                    onChange={this.handleChange(idx)}
                />
            </div>
        );
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
                    <div className="connectionNavBar">
                        <Link
                            to={`/connection/${encodeURIComponent(this.id)}`}
                            className="blue-button"
                        >Tillbaka
                        </Link>
                        <Link
                            to={`/new/line/${encodeURIComponent(this.id)}`}
                            className="blue-button"
                        >Ny linje
                        </Link>
                    </div>
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
                                    <th>Fält</th>
                                    <th>Position</th>
                                    <th>Uttag</th>
                                    <th>          </th>
                                    <th>Fält</th>
                                    <th>Position</th>
                                    <th>Uttag</th>
                                    <th>Kommentar</th>
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
                                                <div className="tableContaier">
                                                    <input
                                                        className="rowNumber"
                                                        min="0"
                                                        type="number"
                                                        name="Position"
                                                        value={element.Position}
                                                        onChange={this.handleChange(idx)}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                {this.tableInputTextArea(
                                                    "Note", element.Note, idx
                                                )}
                                                {/* <div className="tableContaier">
                                                    <textarea
                                                        maxLength="100"
                                                        type="text"
                                                        name="Note"
                                                        className="commentInput"
                                                        value={element.Note}
                                                        onChange={this.handleChange(idx)}
                                                    />
                                                </div> */}
                                            </td>
                                            <td>
                                                <div className="tableContainer">
                                                    <input
                                                        maxLength="50"
                                                        type="text"
                                                        name="Rack"
                                                        value={element.Rack}
                                                        onChange={this.handleChange(idx)}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="tableContainer">
                                                    <input
                                                        maxLength="50"
                                                        type="text"
                                                        name="FieldFrom"
                                                        value={element.FieldFrom}
                                                        onChange={this.handleChange(idx)}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="tableContainer">
                                                    <input
                                                        maxLength="50"
                                                        type="text"
                                                        name="NrFrom"
                                                        value={element.NrFrom}
                                                        onChange={this.handleChange(idx)}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="tableContainer">
                                                    <input
                                                        maxLength="50"
                                                        type="text"
                                                        name="KlFrom"
                                                        value={element.KlFrom}
                                                        onChange={this.handleChange(idx)}
                                                    />
                                                </div>
                                            </td>
                                            <td className="arrow">--&gt;</td>
                                            <td>
                                                <div className="tableContainer">
                                                    <input
                                                        maxLength="50"
                                                        type="text"
                                                        name="FieldTo"
                                                        value={element.FieldTo}
                                                        onChange={this.handleChange(idx)}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="tableContainer">
                                                    <input
                                                        maxLength="50"
                                                        type="text"
                                                        name="NrTo"
                                                        value={element.NrTo}
                                                        onChange={this.handleChange(idx)}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="tableContainer">
                                                    <input
                                                        maxLength="50"
                                                        type="text"
                                                        name="KlTo"
                                                        value={element.KlTo}
                                                        onChange={this.handleChange(idx)}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                {this.tableInputTextArea(
                                                    "Comment", element.Comment, idx
                                                )}
                                                {/* <div className="tableContainer">
                                                    <textarea
                                                        maxLength="100"
                                                        name="Comment"
                                                        className="commentInput"
                                                        value={element.Comment}
                                                        onChange={this.handleChange(idx)}
                                                    />
                                                </div> */}
                                            </td>
                                            <td>
                                                <button
                                                    className="saveButton blue-button"
                                                    value={element.Id}
                                                    onClick={this.submitHandler}
                                                >Spara</button>
                                            </td>
                                            <td>
                                                <div className="smallDeleteButton">
                                                    <Link
                                                        to={
                                                            `/delete/line/${element.Id}/${this.id}`
                                                        }
                                                    >Radera</Link>
                                                </div>
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
                                                    className="editButton blue-button"
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
