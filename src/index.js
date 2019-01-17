import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const TODOAPI = 'https://blooming-peak-52963.herokuapp.com';

class App extends Component {
  constructor(){
    super();
    this.state={
      todos:null,
      text:''
    }
  }
  getAll = () => {
    fetch(TODOAPI).then(j=>j.json()).then(a=>this.setState({todos:a}));
  }
  add = ()=>{
    const {text } = this.state;
    fetch(TODOAPI+'/add?title='+text);
    this.getAll();
    this.setState({text:''});
  }
  componentDidMount(){
    this.getAll();
  }
  render() {
    const {todos,text}= this.state;
    return (
      <div className="App">
      <span><input value={text} onChange={t=>this.setState({text:t.target.value})}/><button onClick={this.add}>Add</button><button onClick={()=>{fetch(TODOAPI+'/deleteall');this.getAll()}}>DeleteAll</button></span>
      <ul>
        {todos&& todos.map(i=><li key={i['_id']}>{i.title+'--------------'}<button onClick={()=>{fetch(TODOAPI+'/delete?id='+i['_id']);this.getAll()}}>X</button></li>)}
      </ul>
      {(todos===null || todos.length===0) &&<div>Todo list is empty</div>}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
