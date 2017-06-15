var React = require('react');
var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;

class Home extends React.Component{
  render(){
    return(
       <div className='home-container'>
          <h1>Githu Battle: Battle your friends...and stuff</h1>
          <Link className = 'button' to = "/battle">
            Battle
          </Link>
        </div>
    );
  }
}

module.exports = Home;