import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
        }
        this.onRegistSubmit = this.onRegistSubmit.bind(this);

    }



    onRegistSubmit(event) {
        event.preventDefault();
        let name = event.target["name"].value;
        // let image = event.target["image"].files.item(0).name;
        let email = event.target["email"].value;
        let password = event.target["password"].value;
        let role = "user";

        let post = {
            name: name,
            // image: image,
            email: email,
            password: password,
            role: role
        }
        let postInJson = JSON.stringify(post);

        fetch("http://127.0.0.1:8000/api/auth/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: postInJson
        })
            .then((response) => {
                console.log(response);
            });
            alert(' Bạn đã đăng ký thành công!')
        this.props.history.push("/login");
    }
    updateUI(data) {
        this.setState({
            users: data
        })
    }
    render() {
        return (
            <div id="login">
                <form class="Login" onSubmit={this.onRegistSubmit}>
                    <h1>Đăng ký</h1>
                    <span class="hiddenFileInput">
                        {/* <input type="file" name="image"  id="image"/> */}
                    </span>
                    <input type="text" name="name" placeholder="Nhập họ và tên" required></input>
                    <input type="email" name="email" placeholder="Nhập email xxx@gmail.com" required></input>
                    <input type="password" name="password" required placeholder="Nhập mật khẩu"></input>
                    <button type='submit'>Đăng ký</button>
                    <p class="p-bottom-w3ls">
                        <span class="check-w3"><input type="checkbox" />Ghi nhớ</span>
                    </p>
                    <p class="p-bottom-w3ls1">Đã có tài khoản?<a class href="/login"> Đăng nhập</a></p>
                </form>

            </div>
        )
    }
}
export default withRouter(Register);