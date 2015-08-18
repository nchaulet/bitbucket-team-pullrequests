import React from 'react';

class Loader extends React.Component {
  render() {
    const loaderStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      fontSize: '40px',
      margin: '-100px -100px'
    };

    return (
      <div style={loaderStyle}>Loading <i className="fa fa-spinner fa-pulse"></i></div>
    );
  }
}

export default Loader;
