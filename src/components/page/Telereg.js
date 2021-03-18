import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DateFormatter from '../content/DateFormatter';
import './Telereg.css';
import config from '../../config';

class Telereg extends Component {
    constructor(props) {
        super(props);
        this.baseUrl = config.baseUrl;
        this.getContent = this.getContent.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            data: {},
            error: "",
            isloaded: false,
            search: ""
        }
    }

    componentDidMount() {
        this.getContent(`${this.baseUrl}all`);
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
                // console.log(res.data);
                this.setState({
                    data: res.data,
                    isloaded: true
                });
            } else {
                this.setState({error: res});
            }
        });
    }

    submitHandler(event) {
        // console.log(this.state.search);
        let url = "";
        if (this.state.search) {
            url = `${this.baseUrl}search?search=${this.state.search}`
        } else {
            url = `${this.baseUrl}all`;
        }
        this.getContent(url);
        event.preventDefault();
    }

    changeHandler(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render () {
        const {data, isloaded} = this.state;
        // console.log(data);
        if (!isloaded) {
            return <div>Loading data...</div>
        } else {
            return ( 
                <div className="startPage">
                    <form onSubmit={this.submitHandler}>
                        <input
                        id="text"
                        className="searchField"
                        type="text"
                        name="search"
                        placeholder="Sök Nummer/namn"
                        value={this.state.search}
                        onChange={this.changeHandler}
                        />
                    </form>
                    <table className="tableStartPage">
                        <thead className="tableHead">
                            <tr className="trHeader">
                                <th>Nummer</th>
                                <th>Namn</th>
                                <th>Funktion</th>
                                <th>Adress</th>
                                <th>Skapad</th>
                                <th>Uppdaterad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data ? data.map(element => (
                            <tr key={element.Id} className="tableRow">
                                <td><Link to={`/connection/${encodeURIComponent(element.Id)}`} className="linkDiv">{element.Number}</Link></td>
                                <td>{element.Name}</td>
                                <td>{element.Func}</td>
                                <td>{element.Address}</td>
                                <td><DateFormatter input={element.Created} type={"created"} /></td>
                                <td><DateFormatter input={element.Updated} type={"updated"} /></td>
                            </tr>
                            
                            )) : null}
                        </tbody>
                    </table>
                </div>
            );
        }
    };
}

export default Telereg;