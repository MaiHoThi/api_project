import React, {Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
class Header extends Component{
    constructor() {
        super();
        this.state = {
            categories:[]
        }
        this.getData();
    }
    getData() {
        fetch("http://127.0.0.1:8000/api/home/categories")
            .then(response => {
                response.json().then((data) => {
                    console.log(data);
                    this.updateUI(data);
                });
            });
    }
    updateUI(data) {
        this.setState({
            categories: data
        })
    }
    
render(){
    return(
<div class="bd1">
        <div id="categories">
          <ul>
            <li class="cate">MENU</li>

            {this.state.categories.map((item,index)=>
                  <li> <a href={"/home/"+item.id}>{item.name}</a></li>
            )}
          </ul>
        </div>
        <div class="slide">
        <img src="f1.jpg"></img>
        </div>
      </div>
    );
}
}
export default withRouter(Header);