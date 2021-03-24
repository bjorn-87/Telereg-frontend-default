import React, {Component} from 'react';
import config from '../../config';
import PropTypes from 'prop-types';
import ShowConnectionTable from '../content/ShowConnectionTable';
import './ShowConnection.css';

class ShowConnection extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.url = `${config.baseUrl}connections?id=${this.id}&api_key=${config.apiKey}`;
        this.getContent = this.getContent.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            data: {
                head: [],
                line: []
            },
            error: "",
            isloaded: false,
            search: ""
        };
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
                        data: res.data,
                        isloaded: true
                    });
                } else {
                    this.setState({error: res});
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

    render() {
        const {data, isloaded} = this.state;

        if (!isloaded) {
            return <div className="loading"><h2>Loading data...</h2></div>;
        } else if (data.head.length === 0) {
            return <div className="notFound"><h1>404 Page not found</h1></div>;
        } else {
            return (
                <ShowConnectionTable data={data}/>
            );
        }
    }
}

ShowConnection.propTypes = {
    match: PropTypes.object.isRequired
};

export default ShowConnection;
