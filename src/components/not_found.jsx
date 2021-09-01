import React, { Component } from 'react';

class NotFound extends Component {
    state = {  }
    render() { 
        console.log(this.props.location)
        // Buat dapetin location, tapi hanya berlaku ke komponen yg di dalem Switch (cek Switch file ini pada App.js)
        return (  
            <div>
                <h1>Error 404: Page Not Found</h1>
            </div>
        );
    }
}
 
export default NotFound;