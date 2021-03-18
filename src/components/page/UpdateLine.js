import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './UpdateLine.css';
import './Table.css';
import config from '../../config';

class UpdateLine extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.url = `${config.baseUrl}connections?id=${this.id}&api_key=${config.apiKey}`;
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
        }
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

                this.setState({
                    isLoaded: true,
                    head: res.data.head,
                    line: res.data.line
                });
            } else {
                this.setState({error: res});
            }
        });
    }

    submitHandler(event) {
        // this.state.line.find()
        console.log(event);
        // const target = event.target;
        // const value = target.value;
        // console.log(target);
        // console.log(value);
        // this.getContent(`${this.baseUrl}`);
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
        console.log(value);
        console.log(name);
    }

    handleClick(event) {
        const target = event.target;
        const value = parseInt(target.value);
        // console.log(target);
        // console.log(value);
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
        // console.log(this.state);
        event.preventDefault();
    }

    render () {
        const {
            line, 
            isLoaded
        } = this.state;
        const Id = this.state.head.Id;

        if (isLoaded && Id) {
            return (
                <div>
                    <div className="headerData">
                        <p><b>Nummer:</b> {this.state.head.Number}</p>
                        <p><b>Namn:</b> {this.state.head.Name}</p>
                        <p><b>Adress:</b> {this.state.head.Address}</p>
                        <p><b>Funktion:</b> {this.state.head.Func}</p>
                        <p><b>Ritning:</b> {this.state.head.Drawing}</p>
                        <p><b>Apptyp:</b> {this.state.head.Apptype}</p>
                        <p><b>Användare:</b> {this.state.head.UserFullName}</p>
                        <p><b>Dokument:</b> {this.state.head.Document}</p>
                        <p><b>Apptyp2:</b> {this.state.head.ApptypeTwo}</p>
                        <p><b>AnvändarId:</b> {this.state.head.UserId}</p>
                        <p><b>Övrigt:</b> {this.state.head.Other}</p>
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
                                {this.state.clickId === element.Id && this.state.clicked === true ?
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
                                        <input 
                                            type="text"
                                            name="Note"
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
                                    <td>----&gt;</td>
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
                                        <input 
                                            type="text"
                                            name="Comment"
                                            value={element.Comment}
                                             onChange={this.handleChange(idx)}
                                        />
                                    </td>
                                    <td>
                                        <input type="submit" value="Spara" onClick={this.submitHandler}/>
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
                                    <td>----&gt;</td>
                                    <td>{element.FieldTo}</td>
                                    <td>{element.NrTo}</td>
                                    <td>{element.KlTo}</td>
                                    <td>{element.Comment}</td>
                                    <td> 
                                        <button value={element.Id} onClick={this.handleClick}>Redigera</button>
                                    </td>

                                    </tr>}
                            </tbody>
                        )) : null}
                        </table>
                    </div>
                </div>
            );
        } else if (isLoaded && !Id) {
            return <div className="PageNotFound"><h2>404 PageNotFound</h2></div>;           
        } else {
            return <div className="loading"><h2>Loading data...</h2></div>;
        }
    };
}

export default UpdateLine;