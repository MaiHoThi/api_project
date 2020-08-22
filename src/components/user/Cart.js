import React, { Component } from 'react';
class Cart extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
        this.getData();
    }
    getData() {
        fetch("http://127.0.0.1:8000/api/order")
            .then(response => {
                response.json().then((data) => {
                    this.setState({
                        orders: data
                    })
                });
            });
    }
    render() {
        return (
            <div id="body">
                         <h1>ĐƠN HÀNG</h1>
                <table class="mama">
                    <hr></hr>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên khách hàng</th>
                                <th>ngày đám cưới</th>
                                <th>Địa chỉ</th>
                                <th>số điện thoại riêng</th>
                                <th>số điện thoại nhà</th>
                                <th>user</th>
                                <th>sản phẩm</th>
                                <th>Xác nhận </th>
                                <th>Huỷ </th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.map(item=>
                                <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
                                <td>{item.address}</td>
                                <td>{item.phone}</td>
                                <td>{item.phone1}</td>
                                <td>{item.user_id}</td>

                                <td>{item.image_id}</td>
                                <td>
                                    <button type="submit" >Xác nhận</button>
                                </td>
                                <td>
                                    <button type="submit" >Hủy</button>
                                </td>
                            </tr>
                            )}
                        </tbody>
    </table>
            </div>
        );
    }
}
export default Cart;