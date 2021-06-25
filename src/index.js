import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

// const App = () => {
  
//     window.navigator.geolocation.getCurrentPosition(
//       position => console.log(position), 
//       (err) => console.log(err)  
//     );
//     return (<div> Latitude: </div>)
// };

/*after entire process occurs to get the location, the actual data appears. Rendering process takes time, this can be solved y using class components, i.e. states. Rerender and updating the content is*/

/* with state system we create js object that containes relevant data to a component, updating state on a component makes instant rerender which is not the case in functional components
*/
class App extends React.Component {
// it is not requried by react, in JS , state initialization 

  state = {lat: null,
          errorMesage: ''}; // we don't have to call constructor babel do it for us

  // things we wanna do ONE time when the component shows up, initial data loading
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({lat: position.coords.latitude}), 
      err => this.setState({errorMesage: err.message})
    );
  };
  // this method will ber endered anytime component gets an update with setState(), rerender the state
  componentDidUpdate() {

  };
  // good place to clean up non-React stuff
  componentWillUnmount(){

  };

  renderContent() {
    if(this.state.errorMesage && !this.state.lat){
      return <div>Error:{ this.state.errorMesage}</div>
    }
    if(!this.state.errorMesage && this.state.lat){
      return <SeasonDisplay lat = {this.state.lat}/>
    }
    return <Spinner message = "Please accept location"/>
};
// react says we need to define it  
render(){
  return (<div>
    {this.renderContent()}
  </div>);
  } 
};

ReactDOM.render(<App/>, document.querySelector('#root'));


if (module.hot) {
    module.hot.accept();
  }
