import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DateFormatter from '../content/DateFormatter';
import config from '../../config';
import Auth from '../auth/Auth';
import ReactPaginate from 'react-paginate';
import './Telereg.css';

/**
 * Class to display front page with all Posts in Telereg
 */
class Telereg extends Component {
    constructor(props) {
        super(props);
        this.baseUrl = config.baseUrl;
        this.getContent = this.getContent.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.resetClick = this.resetClick.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.pagination = this.pagination.bind(this);

        this.state = {
            data: {},
            error: "",
            pageCount: 0,
            limit: 50,
            offset: 0,
            isloaded: false,
            total: 0,
            search: "",
            selectValue: "number",
            hasSearched: false
        };
    }

    componentDidMount() {
        window.scrollTo({top: 0});
        this.getContent("default");
    }

    /**
     * Method to get content from API
     * @param {string} type Decides wich url to fetch from
     */
    async getContent(type) {
        const token = await Auth.GetToken();

        let url;

        if (type === "paginate") {
            url = `${this.baseUrl}headers?offset=${this.state.offset}&limit=${this.state.limit}`;
        } else if (type === "search") {
            url = `${this.baseUrl}headers/search?search=${this.state.search}` +
                `&type=${this.state.selectValue}` +
                `&offset=${this.state.offset}&limit=${this.state.limit}`;
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
                        isloaded: true
                    });
                } else if (res.errors) {
                    this.setState({error: res.errors});
                }
            });
    }


    /**
     * Handles submit from searchfield
     * @param {*} event
     */
    submitHandler(event) {
        let type = "";

        if (this.state.search) {
            type = "search";
            this.setState({hasSearched: true, offset: 0});
        } else {
            type = "default";
            this.setState({hasSearched: false, offset: 0});
        }

        this.getContent(type);
        event.preventDefault();
    }

    /**
     * Method to clear previous search
     * @param {*} event
     */
    resetClick(event) {
        this.setState({
            search: "",
            hasSearched: false,
            offset: 0
        });

        this.getContent("default");
        event.preventDefault();
    }

    /**
     * Method to Handle pagination click
     * @param {*} data Data from the react-pagination module.
     */
    handlePageClick(data) {
        let selected = data.selected;

        let offset = Math.ceil(selected * this.state.limit);

        if (this.state.hasSearched) {
            this.setState({ offset: offset }, () => {
                this.getContent("search");
            });
        } else {
            this.setState({ offset: offset, search: "" }, () => {
                this.getContent("paginate");
            });
        }
    }

    /**
     * Handles changes from inputfield
     * @param {*} event
     */
    changeHandler(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    /**
     *
     * @returns Pagination from react-pagainate module
     */
    pagination() {
        return (
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
        );
    }

    /**
     *
     * @returns Renders the page
     */
    render() {
        const {data, isloaded, total, hasSearched} = this.state;

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
                            <form autoComplete="off" onSubmit={this.submitHandler}>
                                <select name="selectValue" value={this.state.selectValue}
                                    onChange={this.changeHandler}
                                    className="searchSelect"
                                >
                                    <option value="number">Förbindelse</option>
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
                            <div className="paginateContainer">
                                {this.pagination()}
                                <p>Totalt: {total} Poster</p>
                            </div>
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
                                            <h5>Förbindelse</h5>
                                            <p className="upper">{element.Number}</p>
                                        </div>
                                        <div className="columnDiv">
                                            <h5>Namn</h5>
                                            <p>{element.Name ? element.Name : "n/a"}</p>
                                        </div>
                                        <div className="columnDiv">
                                            <h5>Adress</h5>
                                            <p>{element.Address ? element.Address : "n/a"}</p>
                                        </div>
                                        <div className="columnDiv">
                                            <h5>Funktion</h5>
                                            <p>{element.Func ? element.Func : "n/a"}</p>
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
