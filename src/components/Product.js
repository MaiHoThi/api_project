import React, { Component } from 'react';
import './style.css';
import { withRouter, Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Image from './Image';
import Video from './Video';
class Product extends Component {
    constructor() {
        super();
        this.state = {
            images: [],
            videos: []
        }
        this.getData1();
        this.getData();
    }
    getData1() {
        fetch("http://127.0.0.1:8000/api/home/image")
            .then(response => {
                response.json().then((data) => {
                    console.log(data);
                    this.updateUI1(data);
                });
            });
    }
    updateUI1(data) {
        this.setState({
            images: data
        })
    }

    getData() {
        fetch("http://127.0.0.1:8000/api/home/video")
            .then(response => {
                response.json().then((data) => {
                    console.log(data);
                    this.updateUI(data);
                });
            });
    }
    updateUI(data) {
        this.setState({
            videos: data
        })
    }
    render() {
        return (
            <div class="content">
               <Image/>
                <Video/>
            </div>
        );
    }
}
export default withRouter(Product);