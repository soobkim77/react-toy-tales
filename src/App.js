import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'



class App extends React.Component{

  state = {
    display: false,
    data: []
  }

  getData(){
    fetch('http://localhost:3000/toys')
    .then(r => r.json())
    .then(toys => {
      this.setState({
        data: toys
      })
    })
  }

  patchLikes = (e) => {
    const parentDiv = e.target.parentElement
    const id = parentDiv.id
    let likeAmount = parentDiv.querySelector("p")
    likeAmount = likeAmount.textContent.split(" ")
    let likeValue = parseInt(likeAmount[0])
    const likeURL = `http://localhost:3000/toys/${id}`
    let newLikeCount = likeValue + 1
    fetch(likeURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"likes": newLikeCount})
    })
    .then(r => r.json())
    .then(data => {
        this.getData()
    })
  }

  componentDidMount(){
    this.getData();
  }
  
  handleForm = (event) => {
    event.preventDefault();
    let form = document.querySelector("form")
    const name = form.querySelector("input")
    const imgs = form.querySelectorAll("input")
    
    let newToy = {name: name.value, image: imgs[1].value}
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
      },
      body: JSON.stringify(newToy)
    })
    .then(r => r.json())
    .then(toy => {
      this.setState({data: [...this.state.data, toy]})
    })
  }
  
  handleDelete = (event) => {
    const parentDiv = event.target.parentElement
    const id = parentDiv.id
    const URL = `http://localhost:3000/toys/${id}`
    fetch(URL, {
      method: "DELETE"
    }).then(r => r.json())
    .then(toy => 
      parentDiv.remove()
    )
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleSubmit={this.handleForm}  />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.data} onLike={this.patchLikes} handleDel={this.handleDelete}/>
      </>
    );
  }

}

export default App;
