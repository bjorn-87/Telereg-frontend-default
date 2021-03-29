import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DateFormatter from '../content/DateFormatter';
import config from '../../config';
import Auth from '../auth/Auth';
import './Telereg.css';

class Telereg extends Component {
    constructor(props) {
        super(props);
        this.baseUrl = config.baseUrl;
        this.getContent = this.getContent.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);

        this.state = {
            data: {},
            error: "",
            isloaded: false,
            search: ""
        };
    }

    componentDidMount() {
        this.getContent(`${this.baseUrl}headers`);
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

    submitHandler(event) {
        let url = "";

        if (this.state.search) {
            url = `${this.baseUrl}headers/search?search=${this.state.search}`;
        } else {
            url = `${this.baseUrl}headers/`;
        }
        this.getContent(url);
        event.preventDefault();
    }

    clickHandler(event) {
        let url = `${this.baseUrl}headers`;

        this.setState({
            search: ""
        });

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

    render() {
        const {data, isloaded} = this.state;

        if (!isloaded) {
            return <div>Loading data...</div>;
        } else {
            return (
                <main className="mainPage">
                    <div className="startPage">
                        <div className="searchBox">
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
                                <input type="submit" className="searchFieldSubmit" value="Sök"/>
                            </form>
                        </div>
                        <div className="startPage">
                            {data.length > 0 ? data.map(element => (
                                <Link
                                    key={element.Id}
                                    to={`/connection/${encodeURIComponent(element.Id)}`}
                                    className="linkDiv"
                                >
                                    <div className="rowDiv">
                                        <div className="columnDiv">
                                            <h5>Nummer</h5>
                                            <p>{element.Number}</p>
                                        </div>
                                        <div className="columnDiv">
                                            <h5>Namn</h5>
                                            <p>{element.Name ? element.Name : "n/a"}</p>
                                        </div>
                                        <div className="columnDiv">
                                            <h5>Funktion</h5>
                                            <p>{element.Func ? element.Func : "n/a"}</p>
                                        </div>
                                        <div className="columnDiv">
                                            <h5>Adress</h5>
                                            <p>{element.Address ? element.Address : "n/a"}</p>
                                        </div>
                                        <div className="columnDiv">
                                            <h5>Skapad</h5>
                                            <p>
                                                <DateFormatter input={element.Created}
                                                    type={"created"}
                                                />
                                            </p>
                                        </div>
                                        <div className="columnDiv">
                                            <h5>Uppdaterad</h5>
                                            <p>
                                                {element.Updated ?
                                                    <DateFormatter input={element.Updated}
                                                        type={"updated"}
                                                    /> : "n/a"}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                                :
                                <div>
                                    <h3 className="noResult">Inga resultat</h3>
                                    <p
                                        className="clearSearch"
                                        onClick={this.clickHandler}
                                    >
                                        Rensa sökning
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                </main>
            );
        }
    }
}

export default Telereg;
