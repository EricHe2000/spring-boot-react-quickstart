import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class StatusButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStarted: false };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.isStarted) {
      fetch('/stop')
        .then(response => response.text())
        .then(message => {
          console.log(message);
          var msg = JSON.parse(message);
          console.log(msg.status);
          if (!msg.status) {
            this.props.parentCallback('Sample has been stopped')
            this.setState(prevState => ({
              isStarted: !prevState.isStarted
            }));
          }
          else {
            this.props.parentCallback('Failed to Start');

          }

        });
    }
    else {
      fetch('/start')
        .then(response => response.text())
        .then(message => {
          console.log(message);
          var msg = JSON.parse(message);
          console.log(msg.status);
          if (msg.status) {
            this.props.parentCallback('Sample has been started')
            this.setState(prevState => ({
              isStarted: !prevState.isStarted
            }));
          }
          else {
            this.props.parentCallback('Failed to Start');

          }

        });
    }
  }

  render() {
    const {
      variant,
      content,
      ...others
    } = this.props;
    return (
      <button className={variant} onClick={this.handleClick}>
        {this.state.isStarted ? 'Stop' : 'Start'}
      </button>
    );
  }
}

class MonitorButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    fetch('/monitor')
      .then(response => response.text())
      .then(message => {
        this.props.parentCallback('Monitor Count: ' + message);
      });
  }

  render() {
    const {
      variant,
      content,
      ...others
    } = this.props;
    return (
      <button className={variant} onClick={this.handleClick}>
        Monitor
            </button>
    );
  }
}

class App extends Component {
  state = {
    message: "Sample Status"
  }

  callbackFunction = (childData) => {
    this.setState({ message: childData })
  };

  render() {
    return (
      <div className="App">
        <h1 className="App-title">{this.state.message}</h1>
        <StatusButton parentCallback={this.callbackFunction} />
        <MonitorButton parentCallback={this.callbackFunction} variant="green" />
      </div>
    );
  }
}

export default App;