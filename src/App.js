
import React from 'react';
import './App.css';
import CircleGauge from './CircleGauge'
import InputSlider from './InputSlider';

class App extends React.Component {
  state = {circleGaugeVal: 0, circleGauge2Val: 0}

  sliderCallback = value => {
    this.setState({circleGaugeVal: value});
  }

  slider2Callback = value => {
    this.setState({circleGauge2Val: value});
  }

  gaugeInputCallback = value => {
    this.setState({circleGaugeVal: value});
  }

  gauge2InputCallback = value => {
    this.setState({circleGauge2Val: value});
  }

  render() {
    let circleGaugeConf = {
      "thickness": 30,
      "bg": '#000',
      "color": '#00daff',
      "shiny": true,
      "size": 200,
      "label": false,
      "dashed": true,
      "minValue": 0,
      "maxValue": 100,
      "enableInput": true,
    };

    let circleGauge2Conf = {
      "thickness": 5,
      "bg": '#ccc',
      "color": '#00ff00',
      "shiny": false,
      "size": 300,
      "label": false,
      "dashed": false,
      "minValue": 0,
      "maxValue": 100,
      "enableInput": false,
    };

    return (
      <div className="App">
        <div className="gauge-slider">
            <CircleGauge value={this.state.circleGauge2Val} config={circleGauge2Conf} inputCallback={this.gauge2InputCallback}/>
            <InputSlider callback={this.slider2Callback} />
        </div>
        <div className="gauge-slider">
          <CircleGauge value={this.state.circleGaugeVal} config={circleGaugeConf} inputCallback={this.gaugeInputCallback}/>
        </div>
        

        
        
      </div>
  
    );
  }

}

export default App;
