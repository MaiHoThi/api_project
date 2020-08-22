import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';
import { Link } from 'react-router-dom';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      newsPerPage: 3
    }
    let user_id = localStorage.getItem('user_id');
    this.getUser(user_id);
    // this.onCommentSubmit = this.onCommentSubmit.bind(this);
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
            this.setState({
                users: data.user
              })
        });
      });
  }
  render() {
    return (
      <div>
          <div class="body">
            <h1>Profile</h1>
            <div class="detail">
              <div id="img"><img src={"http://127.0.0.1:8000" + this.state.users.image} atl="image" /></div>
              <div id="body">
                <ul id="detail">
                  <li>Tên(Name):{this.state.users.name}</li>
                  <li class="">Email:{this.state.users.email}</li>
                  <li>    <Link to = {'/order/' + this.state.users.id}> <button class="btn_addcart">Sửa</button></Link></li>
                </ul>
              </div>
              <br></br>
            </div>
          </div>
      </div>
    );
  }
}
export default withRouter(Profile);