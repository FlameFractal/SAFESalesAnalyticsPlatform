import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import * as d3 from 'd3';
import {
    scaleLinear as d3ScaleLinear
} from 'd3-scale';
import {
    axisBottom as d3AxisBottom,
    axisLeft as d3AxisLeft,
} from 'd3-axis';
import { extent as d3ArrayExtent } from 'd3-array';


export default class ScatterPlotLine extends Component {
    render() {
        const { primaryData, secondaryData, primaryLabel, secondaryLabel, highlightStates, uxCallback, dimensions } = this.props;


        const margin = {
            bottom: 35,
            top: 15,
            left: 45,
            right: 20
        },
            buffer = 0.1,
            tickSize = 4,
            radius = 4,
            labelOffset = 30,
            width = dimensions.width,
            height = dimensions.height;

            /*
        const width = 600,
        height = 400;
*/
        const Scatter = styled.div`
                width: ${width + "px"};
                height: ${height + "px"};
                margin: auto auto;
                font-family: CustomFont;`;

        const SVG = styled.svg`
            width: ${width + "px"};
            height: ${height + "px"};`;

        const LabelText = styled.text`
              text-anchor: middle;`;

        const NormalBubble = styled.circle`
            stroke: #000;
            fill: #000;`;

        const HighlightBubble = styled.circle`
            fill: #d299fd;
            stroke: #000;`;

        const GrayBubble = styled.circle`
            stroke:  #c5c5c5;
            stroke-width: 2;
            fill: #c5c5c5;`;

        const Title = styled.span`
        width: 100%;
        font-size: 0.9em;
        text-align: center;
        float: left;`;


        const StatenameDiv = styled.div`
        text-align: center;
        font-size: 1em;
        color: #fff;`

        const HorizontalLine = styled.div`
        height: 0px;
        width: 90%;
        margin-top: 2px;
        margin-bottom: 4px;

        border-bottom: solid 1px #fff;
        color: #fff;
        margin-left: auto;
        margin-right: auto;`

        const ValueSpan = styled.span`
        text-align: center;
        font-size: 1.8em;
        color: #fff;`;

        const NumformatSpan = styled.span`
        font-size: 0.5em;`

        const LabelSpan = styled.span`
        padding-left: 0.7em;
        text-align: center;
        font-size: 0.7em;
        color: #fff;
        margin-bottom: 0.3em;`;


        var circles = [];

        if (primaryData && secondaryData) {
            console.log(primaryData, secondaryData);
            var xrange = d3ArrayExtent(primaryData, r => r.value),
                yrange = d3ArrayExtent(secondaryData, r => r.value);

            var xScale = d3ScaleLinear()
                .domain([xrange[0] - (xrange[0] * buffer), xrange[1] + (xrange[1] * buffer)])
                .range([margin.left, width - margin.right]);

            var xAxis = d3AxisBottom()
                .scale(xScale)
                .tickSize(tickSize)
                .tickFormat(d3.format(".2"));

            var yScale = d3ScaleLinear()
                .domain([yrange[0] - (yrange[0] * buffer), yrange[1] + (yrange[1] * buffer)])
                .range([height - margin.bottom, margin.top]);

            var yAxis = d3AxisLeft()
                .scale(yScale)
                .tickSize(tickSize)
                .tickFormat(d3.format(".2"));

            var axisTitles = [];
            axisTitles.push(<LabelText className="axis-title" key={axisTitles.length} transform={"translate(" + ((width / 2)) + "," + (height - margin.bottom + labelOffset) + ")"}>{primaryLabel}</LabelText>);
            axisTitles.push(<LabelText className="axis-title" key={axisTitles.length} transform={"translate(" + (margin.left - labelOffset) + "," + ((height - margin.bottom) / 2) + ")rotate(-90)"}>{secondaryLabel}</LabelText>);
            //var par = this;

            circles = primaryData.map(function (c, i) {
                var pairVal = secondaryData.filter(d => d.state === c.state);
                if (pairVal.length) {
                    var x = xScale(c.value),
                        y = yScale(pairVal[0].value);

                    //arrow function here might use more memory than necessary?
                    const uxevent = (e) => {
                        e.stopPropagation();
                        const message = [<div>
                            <StatenameDiv>{c.state.toUpperCase() + ":"}</StatenameDiv>
                            <HorizontalLine />
                            <div>
                                <ValueSpan>{c.value}<NumformatSpan>{primaryData[0].numformat}</NumformatSpan></ValueSpan>
                                <LabelSpan>{primaryLabel.toUpperCase()}</LabelSpan>
                            </div>
                            <div>
                                <ValueSpan>{pairVal[0].value}<NumformatSpan>{secondaryData[0].numformat}</NumformatSpan></ValueSpan>
                                <LabelSpan>{secondaryLabel.toUpperCase()}</LabelSpan>
                            </div>
                            <HorizontalLine />
                        </div>]
                        uxCallback(message, [c.id]);
                    }

                    //console.log(highlightStates);

                    if (highlightStates.length) {
                        if (highlightStates.filter(r => {
                            //console.log(r, c.id)
                            if (r === c.id) return true;
                            return false;
                        }).length) {
                            return (<HighlightBubble key={i} cx={x} cy={y} r={radius} onClick={uxevent} ></HighlightBubble>);
                        }
                        else {
                            return (<GrayBubble key={i} cx={x} cy={y} r={radius} onClick={uxevent} ></GrayBubble>);
                        }

                    }
                    else {
                        return (<NormalBubble key={i} cx={x} cy={y} r={radius} onClick={uxevent} ></NormalBubble>);
                    }


                }

                return [];
            });
        }


        console.log(xAxis);
        return (
            <Scatter>
                <Title>Scatter Plot of {primaryLabel} vs. {secondaryLabel}</Title>
                <SVG>
                    <g className="xAxis" transform={"translate(0," + (height - margin.bottom) + ")"} ref={node => d3.select(node).call(xAxis)} />
                    <g className="yAxis" transform={"translate(" + margin.left + ",0)"} ref={node => d3.select(node).call(yAxis)} />
                    {axisTitles}
                    {circles}
                </SVG>
            </Scatter>);
    }
}

ScatterPlotLine.propTypes = {
    primaryData: PropTypes.array.isRequired,
    secondaryData: PropTypes.array.isRequired,
    primaryLabel: PropTypes.string.isRequired,
    secondaryLabel: PropTypes.string.isRequired,
    highlightStates: PropTypes.array.isRequired,
    uxCallback: PropTypes.func.isRequired,
    dimensions: PropTypes.object.isRequired
}
