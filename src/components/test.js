import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';
import NumberFormat from 'react-number-format';
class DetailImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      colors:[],
      sizes:[]
    }
    var id = props.match.params.id;
    this.getDetail(id);
    this.getData();
    this.getData1();


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

  render() {
    var { details } = this.state;
    var { colors } = this.state;

    return (
      <div>
         {details.map((item)=>
      <div>      
          <h1>{item.name}</h1>
        <div class="detail">
          <div id="img"><img src={"http://127.0.0.1:8000" + item.image} atl="image" /></div>
          <div id="body">
            <ul id="detail">
              <li>Mã số:{item.code}</li>
              <li class="old_price">Giá cũ:{item.old_price}</li>
              <li class="price">Giá mới:{item.price}</li>
              <li>Chọn size: <select>{this.state.sizes.map((size) => <option>{size.name}</option>)}</select>
              </li>
              <li>Chọn Màu sắc:<select value={colors} > 
                <option value={item.id}>{item.name}</option>
            </select>
              </li>
              <li><button>Đặt hàng</button></li>
              <li>{item.detail}</li>
            </ul>
          </div>
          <br></br>
          <p><b>{item.detail}</b></p>
        </div>
      </div>
         )}
         </div>

    );
  }
}
export default withRouter(DetailImage);