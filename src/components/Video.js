import React, { Component } from 'react';
import './style.css';
import { withRouter, Link } from 'react-router-dom';
import {  FcLike } from "react-icons/fc";
import { MdCode } from 'react-icons/md';

class Product extends Component {
    constructor() {
        super();
        this.state = {
            videos: []
        }
        this.getData();
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
                <hr></hr>
                <div><h1>Video</h1></div>
                <div class="bd2">
                    {this.state.videos.map(item =>
                        <div id="product">
                            <div class="product_block">
                                <div class="product_video">
                                <Link to = {'/videos/' + item.id}>    <video src={"http://127.0.0.1:8000" + item.video} controls alt="avata" /></Link>
                                </div>
                                <div class="product_content">
                                    <label >{item.name}</label>
                                </div>
                                <div class="product_price">
                                    <p ><span id="oldPrice">${item.price}</span><span id="price">${item.old_price}</span></p>
                                </div>
                                <div class="product_price">
                                    <p ><span id="code">Code:{item.code}</span><span><button className="tim" type="submit" onClick><FcLike/></button></span></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default withRouter(Product);