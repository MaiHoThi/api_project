import React, { Component } from 'react';
import Book from './Book';
class Loves extends Component {
    constructor() {
        super();
        this.state = {
            loves: [],
            users:[]
        }
        this.getData();
    }
    getData() {
        fetch("http://127.0.0.1:8000/api/loves")
            .then(response => {
                response.json().then((data) => {
                    this.setState({
                        loves: data
                    })
                });
            });
    }
   
    render() {
        return (
            <div>
            {details.map((item) =>
              <div class="body">
                <h1>{item.name}</h1>
                <div class="loves">
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
                      <li>{item.detail}</li>
                    </ul>
                  </div>
                  <div><Book></Book></div>
                  <br></br>
                  <p><b>{item.detail}</b></p>
                </div>
                <form class="comment" onSubmit={this.onCommentSubmit} method="post">
                  <textarea name="comment" id="comment" class="comment" rows="1" placeholder="bình luận..." ></textarea>
                  <button type="submit">Đăng</button>
                </form>
              </div>
            )}
             <div class="detail">
             {this.state.comments.map((item)=>
                  <p> {item.comment}</p>)}
                  </div>
          </div>
        );
    }
}
export default Loves;