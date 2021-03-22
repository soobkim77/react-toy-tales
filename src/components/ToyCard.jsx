import React, { Component } from 'react';

class ToyCard extends Component {
  // state = {
  //   likes: this.props.toy.likes
  // }
  

  render() {
    
    return (
      <div className="card" id={this.props.toy.id} >
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button onClick={event => this.props.onLike(event)} className="like-btn" >Like {'<3'}</button>
        <button onClick={this.props.onDel} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
