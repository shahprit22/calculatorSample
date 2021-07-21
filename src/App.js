import { Component } from 'react';
import './App.css';

class App extends Component {

  state= {
    numbers : [0,1,2,3,4,5,6,7,8,9],
    print : '',
    operations : ['+','-','*','/'],
    history: false,
    data:[]
  }
  componentDidMount() {
    localStorage.setItem("history",[])
  }

  handleClick = (i) => {
    let printOld = this.state.print
    let print = printOld+i
    this.setState({print})
  }

  clearScreen = () => {
    this.setState({print:''})
  }

  clearnum2 = () => {
    let printOld = this.state.print
    let print = '';
    if(printOld.includes('+')){
      const plus = printOld.indexOf('+')
      let num2 = printOld.slice(plus+1)
      print = printOld.replace(num2,"")
      
    }
  if(printOld.includes('-')){
    const minus = printOld.indexOf('-')
    let num2 = printOld.slice(minus+1)
    print = printOld.replace(num2,"")
  }
  if(printOld.includes('*')){
    const multi = printOld.indexOf('*')
    let num2 = printOld.slice(multi+1)
    print = printOld.replace(num2,"")
  }
  if(printOld.includes('/')){
    const div = printOld.indexOf('/')
    let num2 = printOld.slice(div+1)
    print = printOld.replace(num2,"")
  }
  this.setState({print})
  }

  delete = () => {
    const printOld = this.state.print
    const length = printOld.length
    const print = printOld.slice(0,length-1)
    this.setState({print})
  }

  handleClickOperation = () => {
    let printOld = this.state.print
    let print = 0;
      if(printOld.includes('+')){
        const plus = printOld.indexOf('+')
        let num1 = printOld.slice(0,plus)
        let num2 = printOld.slice(plus)
        print = parseInt(num1)+parseInt(num2);
      }
    if(printOld.includes('-')){
      const minus = printOld.indexOf('-')
      let num1 = printOld.slice(0,minus)
      let num2 = printOld.slice(minus+1)
      print = parseInt(num1)-parseInt(num2);
    }
    if(printOld.includes('*')){
      const multi = printOld.indexOf('*')
      let num1 = printOld.slice(0,multi)
      let num2 = printOld.slice(multi+1)
      print = parseInt(num1)*parseInt(num2);
    }
    if(printOld.includes('/')){
      const div = printOld.indexOf('/')
      let num1 = printOld.slice(0,div)
      let num2 = printOld.slice(div+1)
      print = parseInt(num1)/parseInt(num2);
    }
    const item = localStorage.getItem("history")
    printOld = printOld+" = "+ print
    const new_item = [item, printOld]
    localStorage.setItem("history", new_item)
    this.setState({print})
  }

  handleHistory = () => {
    
    const data = localStorage.getItem("history")
    const arr = data.split(",")
    this.setState({history:true,data:arr})
  }

  render() {
    const {numbers, print, operations, history, data} = this.state
    const back = "<-"
    return (
      <div className="App">
        <input type="text" value={print} readOnly />
        <br/>
         {numbers.map(i => <button key={i} onClick={() => this.handleClick(i)}>{i}</button>
          )}
        <br/>
         {operations.map(op => <button key={op} onClick={() => this.handleClick(op)}>{op}</button>
          )}
        <br/>
        <button onClick = {this.handleClickOperation}>=</button>
        <br/>
        <button onClick= {this.clearScreen}>C</button>
        <button onClick= {this.clearnum2}>CE</button>
        <button onClick={this.delete}>{back}</button>
        <br/>
        <button onClick={this.handleHistory}>History</button>
        {history &&
        
            data.map(dat => <li key={dat}>{dat}</li>)
        }

      </div>
    );
  }
}

export default App;
