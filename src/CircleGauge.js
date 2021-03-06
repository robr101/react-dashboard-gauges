import React from 'react';

class CircleGauge extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.config;
        this.setState({mouseDown: false});
    }


    // canvas doesn't exist until the component is mounted
    componentDidMount() {
        var ctx = this.canvas.getContext('2d');
        this.draw(ctx);
    }

    // redraw the gauge when component gets updated with new props
    componentDidUpdate() {
        var ctx = this.canvas.getContext('2d');
        this.draw(ctx);
    }

    // utility function, map a value in one range to it's corresponding value in another
    mapRange(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    // map a value in the gauge's configured range to radians
    valueToRadians(value) {
        return this.mapRange(value, this.state.minValue, this.state.maxValue, 0, Math.PI * 2);
    }

    // map an angle in radians to the gauge's configured range
    radiansToValue(radians) {
        return this.mapRange(radians, 0, Math.PI * 2, this.state.minValue, this.state.maxValue);
    }


    // callback for onMouseMove event on canvas, need to check if the mouse is down to change value
    handleDragInput(event) {

        if (this.state.mouseDown) {
            // get the mouse position on click
            // https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const center = this.state.size / 2;
            
            // both the canvas api and Math object consider 0 radians as the positive x-axis,
            // ...so we have to add 1/2 pi radians to start at the top
            let angleToCenter = Math.atan2(y - center, x - center) + (Math.PI * 0.5);
            // ...then when we get to 1.5 pi radians, atan2 will go negative, so need to add 2pi radians
            if (angleToCenter < 0) {
                angleToCenter += (Math.PI * 2);
            }

            let newValue = Math.round(this.radiansToValue(angleToCenter));

            if (this.state.enableInput === true) {
                this.props.inputCallback(newValue);
            }
        }

    }

    // keep track if the mouse button is down, to track drags for input
    handleMouseDown(event) {
        this.setState({mouseDown: true});
    }

    handleMouseUp(event) {
        this.setState({mouseDown: false});
    }

    draw(ctx) {
        let GaugeTop = 2 * Math.PI * 0.75; // in canvas's arc function 0 rad starts at the positive x axis, 2rad * 3/4 gives you the top of the circle
        let center = this.state.size / 2;  // center of the canvas
        let baseRadius = (this.state.size * 0.5) - (this.state.thickness * 0.5); // radius to take up the full size of the canvas, given thickness provided

        // erase the canvas
        ctx.clearRect(0, 0, this.state.size, this.state.size);

        // draw background circle
        ctx.setLineDash([0]);
        ctx.strokeStyle = this.state.bg;
        ctx.lineWidth = this.state.thickness;
        ctx.beginPath();
        ctx.arc(center, center, baseRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // draw value circle
        ctx.fillStyle = this.state.color;
        ctx.font = "40px courier";
        ctx.beginPath();
        ctx.arc(center, center, baseRadius, GaugeTop, this.valueToRadians(this.props.value) + GaugeTop);
        ctx.strokeStyle = this.state.color;
        ctx.lineWidth = this.state.thickness;

        // overwrite the strokeStyle with a gradient that looks "shiny"
        if (this.state.shiny === true) {
            let outerRad = baseRadius + (this.state.thickness / 2);
            let innerRad = baseRadius - (this.state.thickness / 2);
            let gradient = ctx.createRadialGradient(center, center, innerRad, center, center, outerRad);
            gradient.addColorStop(0, this.state.color);
            gradient.addColorStop(0.25, this.state.color);
            gradient.addColorStop(0.4, '#ffffff');
            gradient.addColorStop(0.8, this.state.color);
            gradient.addColorStop(1, this.state.color);
            ctx.strokeStyle = gradient;
        }

        if (this.state.dashed === true)
        {
            // TODO: figure out the math for segmenting the circle into this.state.segments
            ctx.setLineDash([32, 2]);
        }

        // paint the circle
        ctx.stroke();

        if (this.state.label === true) {
            // TODO: add font property and calculate the width/height of the value as a string first so we can dead center the label
            ctx.fillText(this.props.value, this.state.size / 3, this.state.size / 2);
        }
    }

    render() {
        return (
            <div className="circle-gauge-container">
                <canvas ref={(canvas) => {this.canvas = canvas}} 
                        width={this.state.size} 
                        height={this.state.size}
                        onMouseMove={this.handleDragInput.bind(this)}
                        onMouseDown={this.handleMouseDown.bind(this)}
                        onMouseUp={this.handleMouseUp.bind(this)} />
            </div>
        )
    }


}

export default CircleGauge;