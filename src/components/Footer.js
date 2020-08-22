import React, { Component } from 'react';
import './style.css';

class Footer extends Component {

    render() {
        return (
            <div id ="footer">
                <div id="footer1">
                    <ul class="f1">
                        <img src="bg7.jpg" alt="avatar1"/>
                    </ul>
                    <ul  class="f2">
                    <img src="bg1.jpg" alt="avatar1"/>
                    <img src="bg2.jpg" alt="avatar1"/>
                    <img src="bg3.jpg" alt="avatar1"/>
                    <img src="bg4.jpg" alt="avatar1"/>
                    <img src="bg5.jpg" alt="avatar1"/>
                    <img src="bg6.jpeg" alt="avatar1"/>
                    </ul>
                    <ul  class="f3">
                    <img src="bg8.png" alt="avatar1"/>
                    </ul>
                </div>
            <div class="Footer">
                <ul class="list1">
                    <h3>Hỗ trợ khách hàng</h3>
                    <li>Trung tâm bảo hành</li>
                    <li>Thanh toán và giao hàng</li>
                    <li>Dịch vụ sửa chữa và bảo trì</li>
                    <li>Thẻ ưu đãi</li>
                </ul>
                <ul class="list2">
                    <h3>Chính sách Mua hàng và Bảo hành</h3>
                    <li>Quy định chung</li>
                    <li>Chính sách bảo mật</li>
                    <li>Chính sách trả góp</li>
                    <li>Thẻ ưu đãi</li>
                </ul>
                <ul class="list1">
                    <h3>Email liên hệ</h3>
                    <li>Hỗ trợ khách hàng:</li>
                    <li>Liên hệ báo giá:</li>
                    <li>Dịch vụ sửa chữa và bảo trì</li>
                    <li>Hợp tác phát triển</li>
                </ul>
            </div>
            </div>
        )
    }
}
export default Footer;