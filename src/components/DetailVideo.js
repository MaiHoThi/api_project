import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';
import { FcLike } from 'react-icons/fc';
class DetailVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      comments: [],
      lovesvideos: []
    }
    var id = props.match.params.id;

    this.getLike(id);
    this.getDetail(id);
    this.getComment(id);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onLovesSubmit = this.onLovesSubmit.bind(this);
  }
  getDetail(id) {
    fetch("http://127.0.0.1:8000/api/video/" + id + "/detail")
      .then(response => {
        response.json()
          .then((data) => {
            console.log(data);
            this.setState({
              videos: data
            })
          });
      });
  }
  getComment(id) {
    fetch("http://127.0.0.1:8000/api/video/" + id + "/comments")
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
    fetch("http://127.0.0.1:8000/api/video/"+id+"/loves")
      .then(response => {
        response.json().then((data) => {
          console.log(data);
          this.setState({
            lovesvideos: data
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
      video_id: id
    }
    let postInJson = JSON.stringify(post);
    fetch("http://127.0.0.1:8000/api/video/comments", {
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
  onLovesSubmit(event) {
    event.preventDefault();
    var user_id = localStorage.getItem('user_id');
    var id = this.props.match.params.id;
    if(user_id===null){
      alert("Bạn cần đăng nhập ");
      this.props.history.push("/login")
    }else{
    let loves = {
      user_id: user_id,
      video_id: id
    }
    let postInJson = JSON.stringify(loves);
    fetch("http://127.0.0.1:8000/api/video/loves", {
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
    var { videos } = this.state;
    let { comments } = this.state;
    let tong = comments.length;
    let { lovesvideos } = this.state;
    let thich = lovesvideos.length;
    console.log(thich);
    return (
      <div>
        {videos.map((item) =>
          <div>
            <h1>{item.name}</h1>
            <div class="detail">
              <div id="video"><video src={"http://127.0.0.1:8000" + item.video} controls atl="video" /></div>
              <div id="bodyvideo">
                <ul id="detail">
                  <li>Mã số:{item.code}</li>
                  <li class="old_price">Giá cũ:{item.old_price}</li>
                  <li class="price">Giá mới:{item.price}</li>
                  <li><button>Đặt hàng</button></li>
                  <li>{item.detail}</li>
                </ul>
              </div>
              <br></br>
              <p><b>{item.detail}</b></p>
            </div>
            <div id="comment">
              <form onSubmit={this.onCommentSubmit} method="post" className="comment">
                <span> <textarea name="comment" rows="1" placeholder="bình luận..." ></textarea>
                  <button type="submit">Đăng</button></span>
              </form>
              <div className="bar">
                <p className="count"><span>Gồm {thich} lướt thích
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
export default withRouter(DetailVideo);