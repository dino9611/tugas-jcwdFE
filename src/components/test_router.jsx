import React, { Component } from 'react';
import {Switch, Route, Link} from "react-router-dom";

class TestSub01 extends Component {
    state = {  }
    render() { 
        return ( 
            <h2>Ini Test Subpage 01</h2>
         );
    }
}

class TestSub02 extends Component {
    state = {  }
    render() { 
        console.log(this.props.match.params)
        return ( 
            <h3>Ini Test {this.props.match.params.sub02}</h3>
            // sub02 berasal dari apa yg kita tulis setelah : pada Route dibawah
         );
    }
}

class TestRouter extends Component {
    state = {  }
    render() { 
        return (  
            <div>
                <h1><em>Ini Halaman Untuk Test React Router DOM</em></h1>
                <Switch>
                    <Route path="/test-router-page/sub01" component={TestSub01} />
                    <Route path="/test-router-page/:sub02" component={TestSub02} />
                </Switch>
                <Link to="/test-router-page/sub01">
                <button>Subpage01</button>
                </Link>
                <Link to="/test-router-page/sub02">
                <button>Subpage02</button>
                </Link>
                <Link to="/test-router-page/breadcrumb">
                <button>Breadcrumb</button>
                </Link>
                <Link to="/test-router-page">
                <button>Refresh</button>
                </Link>
            </div>
            
        );
    }
}
 
export default TestRouter;