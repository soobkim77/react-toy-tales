import React from 'react';
import ToyCard from './ToyCard'

export default class ToyContainer extends React.Component{
  render(){
    return(
      <div id="toy-collection">
        {this.props.toys.map(toy => <ToyCard toy={toy} onLike={this.props.onLike} onDel={this.props.handleDel}/>)}
     </div>
    ) 
  }
}

// const ToyContainer = () => {
//   return(
//     <div id="toy-collection">
      
//     </div>
//   );
// }

// export default ToyContainer;
