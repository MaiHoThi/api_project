import React, { Component } from 'react';
import './style.css';
import { withRouter, Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
        var id = props.match.params.id;

        this.getDetail(id);
    }
    getDetail(id) {
        fetch("http://127.0.0.1:8000/api/home/" + id)
            .then(response => {
                response.json()
                    .then((data) => {
                        this.setState({
                            categories: data
                        })
                    });
            });
    }
    render() {
        return (
            <div class="content">
                <hr></hr>
                <div class="bd2">
                    {this.state.categories.map(item =>
                        <div id="product">
                            <div class="product_block">
                                <div class="product_image">
                                    <Link to={'/details/' + item.id}> <img src={"http://127.0.0.1:8000" + item.image}  /></Link>
                                </div>
                                <div class="product_content">
                                    <label >{item.name}</label>
                                </div>
                                <div class="product_price">
                                    <p ><span id="oldPrice"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} /></span><span id="price"><NumberFormat value={item.old_price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} /></span></p>
                                </div>
                                <div class="product_price">
                                    <p ><span id="code">{item.code}</span></p>

                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default withRouter(Category);