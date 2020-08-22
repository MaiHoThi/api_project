import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            isLoggedIn:false
        }
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.handleLogInClick = this.handleLogInClick.bind(this);

    }

    handleLogInClick() {
        this.setState({ isLoggedIn: true });
    
      }

    onLoginSubmit(event) {
        event.preventDefault();
        let email = event.target["email"].value;
        let password = event.target["password"].value;
        let post = {
            email: email,
            password: password
        }
        let postInJson = JSON.stringify(post);

        fetch(" http://127.0.0.1:8000/api/auth/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: postInJson
        })
            .then(response => {
                response.json()
                    .then(response => {
                        localStorage.setItem("user_id", response.user_id);
                        alert("Bạn đã đăng nhập thành công");
                        this.props.history.push("/home")//chuyển trang
                        window.location.reload();
                    });
            });
    }

    render() {
        return (
            <div id="login">
                <form class="Login" onSubmit={this.onLoginSubmit}>
                    <h1>Đăng nhập</h1>
                    <input type="email" name="email" placeholder="Nhập email xxx@gmail.com" required></input>
                    <input type="password" name="password" required placeholder="Nhập mật khẩu"></input>
                    <button type="submit" onClick={this.handleLogInClick}>Đăng nhập</button>
                    <p class="p-bottom-w3ls">Quên mất khẩu?<a class href="#">  Click here</a></p>
                    <p class="p-bottom-w3ls1">Tạo tài khoản?<a class href="/register"> Đăng ký</a></p>
                </form>

            </div>
        )
    }
}
export default withRouter(Login);