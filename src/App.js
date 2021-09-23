
import React from 'react';
import './App.css';
import CircleGauge from './circle-gauge'
import InputSlider from './InputSlider';

class App extends React.Component {
  state = {circleGaugeVal: 0, circleGauge2Val: 0}

  sliderCallback = value => {
    this.setState({circleGaugeVal: value});
  }

  slider2Callback = value => {
    this.setState({circleGauge2Val: value});
  }

  render() {
    let circleGaugeConf = {
      "thickness": 30,
      "bg": 'rgba(0,0,0,0)',
      "color": '#00daff',
      "shiny": true,
      "size": 200,
      "label": true,
      "dashed": true,
    };

    let circleGauge2Conf = {
      "thickness": 5,
      "bg": '#ccc',
      "color": '#00ff00',
      "shiny": false,
      "size": 100,
      "label": true,
      "dashed": false,
    };

    return (
      <div className="App">
        <div className="gauge-slider">
            <CircleGauge value={this.state.circleGauge2Val} config={circleGauge2Conf}/>
            <InputSlider callback={this.slider2Callback} />
        </div>
        <div className="gauge-slider">
          <CircleGauge value={this.state.circleGaugeVal} config={circleGaugeConf}/>
          <InputSlider callback={this.sliderCallback} />
        </div>
        

        
        
      </div>
  
    );
  }

}

export default App;
