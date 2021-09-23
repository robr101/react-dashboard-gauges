import React from "react";

class InputSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 0};
    }

    async handleChange(evt) {
        // wait for setState to finish before changing the display value so that it's always reflective of state
        await this.setState({value: evt.target.value});  
        this.props.callback(this.state.value);
    }

    render() {
        return(
            <input type="range" value={this.state.value} onChange={this.handleChange.bind(this)} />
        )
    }

}

export default InputSlider;