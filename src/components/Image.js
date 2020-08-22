import React, { Component } from 'react';
import './style.css';
import { withRouter, Link } from 'react-router-dom';
import { FcLike } from "react-icons/fc";

class Product extends Component {
    constructor() {
        super();
        this.state = {
            images: [],
            currentPage: 1,
            todosPerPage: 6,
            search: '',
            sear:false
        }
        this.search = this.search.bind(this);
        this.onchange = this.onchange.bind(this);
        this.getData1();
        this.handleClick = this.handleClick.bind(this);
        this.xoa=this.xoa.bind(this);

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
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    onchange(event) {
        event.preventDefault();
        var search = event.target["search"].value;
        this.setState({
            search: search
        })
    }
    search() {
        const { search } = this.state;
        const filteredProducts = this.state.images.filter(item => {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        this.setState({
            images: filteredProducts,
            sear: true
        })
    }
    xoa(){
         window.location.reload();
     }
    render() {
        const { images, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = images.slice(indexOfFirstTodo, indexOfLastTodo);


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(images.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <button id='button_page'
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </button>
            );
        });
        return (
            <div class="content">
                <form onSubmit={this.onchange} className="search" method="post">
                    <input type="text" name="search" placeholder="Nhập từ khóa cần tìm"></input>
                    {this.state.sear==true? (<button onClick={this.xoa}>X</button>):null}
                    <button className='btn' id="icon" onClick={this.search}><i class="fas fa-search"></i></button>
                   

                </form>
                <hr></hr>
                <div><h1>Hình ảnh</h1></div>
                <div class="bd2">
                    {currentTodos.map(item =>
                        <div id="product">
                            <div class="product_block">
                                <div class="product_image">
                                    <Link to={'/details/' + item.id}> <img src={"http://127.0.0.1:8000" + item.image} alt="avata" /></Link>
                                </div>
                                <div class="product_content">
                                    <label >{item.name}</label>
                                </div>
                                <div class="product_price">
                                    <p ><span id="oldPrice">${item.price}</span><span id="price">${item.old_price}</span></p>
                                </div>
                                <div class="product_price">
                                    <p ><span id="code">Code:{item.code}</span><span>
                                    </span></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div id='page_number'>
                    {renderPageNumbers}
                </div>
            </div>
        );
    }
}
export default withRouter(Product);