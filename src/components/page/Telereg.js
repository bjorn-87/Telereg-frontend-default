import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DateFormatter from '../content/DateFormatter';
import config from '../../config';
import Auth from '../auth/Auth';
import ReactPaginate from 'react-paginate';
import './Telereg.css';

class Telereg extends Component {
    constructor(props) {
        super(props);
        this.baseUrl = config.baseUrl;
        this.getContent = this.getContent.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.resetClick = this.resetClick.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);

        this.state = {
            data: {},
            error: "",
            pageCount: 0,
            limit: 50,
            offset: 0,
            isloaded: false,
            fetchType: "",
            total: 0,
            search: "",
            selectValue: "number",
            hasSearched: false
        };
    }

    componentDidMount() {
        this.getContent("default");
    }

    async getContent(type) {
        const token = await Auth.GetToken();

        let url;

        if (type === "paginate") {
            url = `${this.baseUrl}headers?offset=${this.state.offset}&limit=${this.state.limit}`;
        } else if (type === "search") {
            url = `${this.baseUrl}headers/search?search=${this.state.search}` +
                `&type=${this.state.selectValue}`;
        } else {
            url = `${this.baseUrl}headers`;
        }

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
                        pageCount: res.total ? Math.ceil(res.total / this.state.limit) : 0,
                        total: res.total ? res.total : 0,
                        fetchType: type,
                        isloaded: true
                    });
                } else if (res.errors) {
                    this.setState({error: res.errors});
                }
            });
    }

    submitHandler(event) {
        let type = "";

        if (this.state.search) {
            type = "search";
            this.setState({hasSearched: true});
        } else {
            type = "default";
            this.setState({hasSearched: false});
        }

        this.getContent(type);
        event.preventDefault();
    }

    resetClick(event) {
        this.setState({
            search: "",
            hasSearched: false
        });

        this.getContent("default");
        event.preventDefault();
    }

    handlePageClick(data) {
        let selected = data.selected;

        let offset = Math.ceil(selected * this.state.limit);

        this.setState({ offset: offset, search: "" }, () => {
            this.getContent("paginate");
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

    render() {
        const {data, isloaded, total, fetchType, hasSearched} = this.state;

        if (!isloaded) {
            return (
                <main className="mainPage">
                    <h3 className="loading">Läser in data...</h3>
                </main>
            );
        } else {
            return (
                <main className="mainPage">
                    <div className="startPage">
                        <div className="searchBox">
                            <form onSubmit={this.submitHandler}>
                                <select name="selectValue" value={this.state.selectValue}
                                    onChange={this.changeHandler}
                                    className="searchSelect"
                                >
                                    <option value="number">Nummer</option>
                                    <option value="name">Namn</option>
                                    <option value="function">Funktion</option>
                                    <option value="address">Adress</option>
                                </select>
                                <input
                                    id="text"
                                    className="searchField"
                                    type="text"
                                    name="search"
                                    placeholder="Sök kopplingskort"
                                    value={this.state.search}
                                    onChange={this.changeHandler}
                                />
                                <input type="submit" className="searchFieldSubmit" value="Sök"/>
                            </form>
                            {hasSearched ?
                                <button
                                    className="clearSearch"
                                    onClick={this.resetClick}
                                >
                                    Rensa sökning
                                </button>
                                : null
                            }
                            {fetchType === "search" ?
                                <p>{data.length} Sökresultat (Visas max: 100)</p> :
                                <div className="paginateContainer">
                                    <ReactPaginate
                                        previousLabel={'<'}
                                        nextLabel={'>'}
                                        breakLabel={'...'}
                                        previousLinkClassName={'previousLink'}
                                        nextLinkClassName={'nextLink'}
                                        breakClassName={'break-me'}
                                        pageCount={this.state.pageCount}
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={2}
                                        onPageChange={this.handlePageClick}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
                                    <p>Totalt: {total} Rader</p>
                                </div>}
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
