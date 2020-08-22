import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';
import { Link } from 'react-router-dom';
import Book from './Book';
import { FcLike } from 'react-icons/fc';
class DetailImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      colors: [],
      sizes: [],
      comments: [],
      loves:[]
    }
    var id = props.match.params.id;

    this.getDetail(id);
    this.getData();
    this.getData1();
    this.getComment(id);
    this.getLike(id);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onLovesSubmit = this.onLovesSubmit.bind(this);
  }

  getComment(id) {
    fetch("http://127.0.0.1:8000/api/image/" + id + "/comments")
      .then(response => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            comments: data
          })
        });
      });
  }
  getLike(id) {
    fetch("http://127.0.0.1:8000/api/image/" + id + "/loves")
      .then(response => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            loves: data
          })
        });
      });
  }

  getDetail(id) {
    fetch("http://127.0.0.1:8000/api/image/" + id + "/detail")
      .then(response => {
        response.json()
          .then((data) => {
            console.log(data);
            this.setState({
              details: data
            })
          });
      });
  }

  getData() {
    fetch("http://127.0.0.1:8000/api/home/color")
      .then(response => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            colors: data
          })
        });
      });
  }
  getData1() {
    fetch("http://127.0.0.1:8000/api/home/size")
      .then(response => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            sizes: data
          })
        });
      });
  }
  onCommentSubmit(event) {
    event.preventDefault();
    let comment = event.target["comment"].value;
    var user_id = localStorage.getItem('user_id');
    var id = this.props.match.params.id;
if(user_id===null){
  alert("Bạn cần đăng nhập để bình luận");
  this.props.history.push("/login")
}else{
    let post = {
      comment: comment,
      user_id: user_id,
      image_id: id
    }
    let postInJson = JSON.stringify(post);
    fetch("http://127.0.0.1:8000/api/image/comments", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: postInJson
    })
    .then(response => {
      window.location.reload();
  });
    }  }

  onLovesSubmit(event) {
    event.preventDefault();
    var user_id = localStorage.getItem('user_id');
    var id = this.props.match.params.id;
    if(user_id===null){
      alert("Bạn cần đăng nhập");
      this.props.history.push("/login")
    }else{
    let loves = {
      user_id: user_id,
      image_id: id
    }
    let postInJson = JSON.stringify(loves);
    fetch("http://127.0.0.1:8000/api/image/loves", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: postInJson
    })
    .then(response => {
      window.location.reload();
  }); 
}
  }
  render() {
    var { details } = this.state;
    let { comments } = this.state;
    let tong = comments.length;
    let { loves } = this.state;
    let yeu = loves.length;
    return (
      <div>
        {details.map((item) =>
          <div class="body">
            <h1>{item.name}</h1>
            <div class="detail">
              <div id="img"><img src={"http://127.0.0.1:8000" + item.image} atl="image" /></div>
              <div id="body">
                <ul id="detail">
                  <li>Mã số:{item.code}</li>
                  <li class="old_price">Giá cũ:{item.old_price}</li>
                  <li class="price">Giá mới:{item.price}</li>
                  <li>Chọn size: <select>{this.state.sizes.map((size) => <option>{size.size}</option>)}</select>
                  </li>
                  <li>Chọn Màu sắc:<select  >
                    {this.state.colors.map((color) => <option>{color.color}</option>)}
                  </select>
                  </li>
                  <li>    <Link to={'/order/' + item.id}> <button class="btn_addcart">Đặt hàng</button></Link></li>
                  <li>{item.detail}</li>
                </ul>
              </div>
              <div><Book></Book></div>
              <br></br>
              <p><b>{item.detail}</b></p>
            </div>
            <div id="comment">
            <form  onSubmit={this.onCommentSubmit} method="post" className="comment">
             <span> <textarea name="comment"  rows="1" placeholder="bình luận..." ></textarea>
              <button type="submit">Đăng</button></span>
            </form>
            <div className="bar">
            <p className="count"><span>Gồm {yeu} lướt thích
              <p><button className="tim" type="submit" onClick={this.onLovesSubmit}><FcLike />Thích</button></p></span>
          <span className="bl">Gồm {tong} bình luận<p><i class="fa fa-comment" aria-hidden="true"></i>bình luận</p></span></p>
          </div>
            </div>
          </div>
        )}
        <div class="viewcomment">
          {this.state.comments.map((item) =>
            <p> {item.comment}</p>)}
        </div>
      </div>
    );
  }
}
export default withRouter(DetailImage);