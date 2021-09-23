import React from 'react';

class CircleGauge extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.config;
        // console.log(this.state);
    }

    componentDidMount() {
        var ctx = this.canvas.getContext('2d');
        this.drawGauge(ctx);
    }

    componentDidUpdate() {
        var ctx = this.canvas.getContext('2d');
        this.drawGauge(ctx);
    }

    valueToRadians(value) {
        let inmin = 0;
        let inmax = 100;
        let outmax = 2 * Math.PI;
        let outmin = 0;
        return (value - inmin) * (outmax - outmin) / (inmax - inmin) + outmin;
    }

    drawGauge(ctx) {
        // console.log(this.state);

        let GaugeTop = 2 * Math.PI * 0.75; // in canvas's arc function 0 rad starts at the positive x axis, 2rad * 3/4 gives you the top of the circle
        let center = this.state.size / 2;  // center of the canvas
        let baseRadius = (this.state.size * 0.5) - (this.state.thickness * 0.5); // radius to take up the full size of the canvas, given thickness provided

        ctx.clearRect(0, 0, this.state.size, this.state.size);

        // background circle
        ctx.setLineDash([0]);
        ctx.strokeStyle = this.state.bg;
        ctx.lineWidth = this.state.thickness;
        ctx.beginPath();
        ctx.arc(center, center, baseRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // value circle
        ctx.fillStyle = this.state.color;
        ctx.font = "40px courier";
        ctx.beginPath();
        ctx.arc(center, center, baseRadius, GaugeTop, this.valueToRadians(this.props.value) + GaugeTop);
        ctx.strokeStyle = this.state.color;
        ctx.lineWidth = this.state.thickness;

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
            ctx.setLineDash([32, 2]);
        }

        // paint the circle
        ctx.stroke();

        if (this.state.label === true) {
            ctx.fillText(this.props.value, this.state.size / 3, this.state.size / 2);
        }
    }

    render() {
        return (
            <div className="circle-gauge-container">
                <canvas ref={(canvas) => {this.canvas = canvas}} width={this.state.size} height={this.state.size} />
            </div>
        )
    }


}

export default CircleGauge;