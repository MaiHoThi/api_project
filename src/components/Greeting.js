import React, {Component} from 'react';

class Greeting extends Component{
    constructor(props){
        super(props);
       
    }
    Greeting() {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
          return <App />;
        }
        return <Product />;
      }
    render(){
        return(
          <div><Greeting></Greeting></div>
        );
    }
}
export default Greeting;