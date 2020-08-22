import React, { Component } from 'react';
import './App.css';
import Footer from './components/Footer';
import Product from './components/Product';
import Category from './components/Category';
import Header from './components/Header';
import Video from './components/Video';
import Image from './components/Image';
// import Greeting from './components/Greeting';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { FcHome, FcApproval, FcInspection, FcLike, FcCameraAddon, FcClapperboard } from "react-icons/fc";
import Login from './components/Login';
import { MdAddShoppingCart } from "react-icons/md";
import Register from './components/user/Register';
import Cart from './components/user/Cart';
import DetailImage from './components/DetailImage';
import DetailVideo from './components/DetailVideo';
import Book from './components/Book';
import Profile from './components/Profile';

class App extends Component {
  constructor(props) {
    super(props);
    let user_id = localStorage.getItem('user_id');
    this.state = {
      users: [],
      user: user_id,
      isLoggedIn: false
    }
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLogInClick = this.handleLogInClick.bind(this);
this.OnSearchClick=this.OnSearchClick.bind(this);
    this.getUser(user_id);

  }

  handleLogInClick() {
    let user_id = localStorage.getItem('user_id');

    this.setState({ isLoggedIn: true, user: user_id });

  }

  handleLogoutClick() {
    localStorage.removeItem('user_id');
    this.setState({ isLoggedIn: false, user: [] }

    );
    window.location.reload();
  }

  getUser(id) {
    fetch('http://127.0.0.1:8000/api/profile', {
      method: "get",
      headers: {
        "Authorization": id
      },
    })
      .then(response => {
        response.json().then((data) => {
          this.updateUI(data);
        });
      });
  }
  updateUI(data) {
    this.setState({
      users: data.user
    })
  }
  OnSearchClick(event) {
    event.preventDefault();
    let search = event.target["search"].value;
    let post = {
      search: search
    }
    let postInJson = JSON.stringify(post);

    fetch(" http://127.0.0.1:8000/api/image/search", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: postInJson
    })
  
  }
  render() {
    const user = this.state.user;

    return (
      <div className="App">
        <header id="menu">

          <ul>
            <li><a href="/home"><FcHome className="icon" /><p>Trang Chủ</p></a></li>
            <li><a href="/video"><FcClapperboard className="icon" /><p>Videos</p></a></li>
            <li><a href="/image"><FcCameraAddon className="icon" /><p>Ảnh cưới</p></a></li>
            <li><form onSubmit={this.OnSearchClick} method="post">
              <input type="text" name="search" placeholder="Nhập từ khóa cần tìm"></input>
            </form></li>
            <li><a href="#"><FcApproval className="icon" /><p>Khuyến mãi</p></a></li>
            <li><a href="/order"><FcInspection className="icon " /><p>Đơn hàng</p></a></li>
            <li><div className="dropdown"> <div className="hiddenUser dropbtn">
              <p>
                <div className="dropdown-content">
                  {user ? (<div><a href="/profile">Tài khoản</a><button onClick={this.handleLogoutClick} type="submit">Logout</button></div>) :
                    (<div ><a href="/login" onClick={this.handleLogInClick}>Đăng nhập</a>
                      <a href="/register">Đăng Ký </a> </div>)}
                </div>
              </p></div>
            </div></li>
            <li><a href="/book"><FcLike /><p>Yêu thích</p></a></li>
          </ul>
          <h1>
            {this.state.users.name}
          </h1>
        </header>

        <Router>
          <Header />
          <Switch>
            <Route path="/home" exact><Product /></Route>
            <Route path={'/home/:id'}><Category /></Route>
            <Route path={'/details/:id'}><DetailImage /></Route>
            <Route path="/book/:id"><Book /></Route>
            <Route path={'/videos/:id'}><DetailVideo /></Route>
            <Route path="/image" ><Image /></Route>
            <Route path="/video" ><Video /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/register"><Register /></Route>
            <Route path="/profile" exact><Profile /></Route>
            <Route path="/order" exact><Cart /></Route>
          </Switch>
        </Router>
        <Footer />
      </div >
    );

  }
}

export default App;
