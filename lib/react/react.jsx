import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Test extends React.Component{
  render(){
    return <h1>Hello World</h1>
  }
}

const root = document.querySelector('#root')
ReactDOM.render(<Test />, root)