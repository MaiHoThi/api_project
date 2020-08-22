import React, { Component } from 'react';
import './style.css';
import { withRouter, Link } from 'react-router-dom';
class Book extends Component {
    constructor() {
        super();
        this.state = {
            books: []
        }
        this.onBookSubmit=this.onBookSubmit.bind(this);
    }
 
    onBookSubmit(event) {
        event.preventDefault();
        let name = event.target["name"].value;
        let date = event.target["date"].value;
        let address = event.target["address"].value;
        let phone = event.target["phone"].value;
        let phone1 = event.target["phone1"].value;

        var user_id = localStorage.getItem('user_id');
        var id = this.props.match.params.id;
    
        let book = {
            name: name,
            date: date,
            address: address,
            phone: phone,
            phone1: phone1,
          user_id: user_id,
          image_id: id
        }
        let postInJson = JSON.stringify(book);
        fetch("http://127.0.0.1:8000/api/image/book", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: postInJson
        })
        .then(response => {
            alert('Đặt hàng thành công');
            window.location.reload();
        }); 
      }

    render() {
        return (
            <div class="body">
                <hr></hr>
                <div><h1>Mẫu thông tin </h1></div>
                <form method="POST" class="insert" onSubmit={this.onBookSubmit }>
                    <div id="insert">
                        <span> *Họ và tên
                            <input type="text" name="name" placeholder="Nhập họ và tên" required />
                        </span>
                        <span>*Nhập ngày cưới
                        <input type="date" name="date" placeholder="Nhập ngày đám cưới" required />
                        </span>
                        <span>*Địa chỉ
                        <input type="text" name="address" placeholder="Nhập đầy đủ địa chỉ" required />
                        </span>
                        <span>*Số điện thoại gia đình
                        <input type="text" name="phone" placeholder="Nhập đầy số điện thoại 1" required />
                        </span>
                        <span>*Số điện thoại riêng
                        <input type="text" name="phone1" placeholder="Nhập đầy số điện thoại 2" required />
                        </span>
                    </div>
                    <button type="submit" >Đặt</button>
                </form>
            </div>
        );
    }
}
export default withRouter(Book);