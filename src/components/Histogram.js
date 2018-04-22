import React, { Component } from 'react'
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import styled from 'styled-components'
import {
  axisBottom as d3AxisBottom
} from 'd3-axis';


export default class Histogram extends Component {



  render() {
    console.log("Histogram Rendering")
    const { renderData, highlightValues, dimensions } = this.props;
    const width = dimensions.width,
          height = dimensions.height,
          numBins = 10;

    const Histo = styled.div`
          font-family: CustomFont;
          width: ${width + "px"};
          height: ${height + "px"};
          margin-left: auto;
          margin-right: auto;

          @media (min-width: 800px) {
            float: left;
          }`;

    const SVG = styled.svg`
      width: ${width + "px"};
      height: ${height + "px"};
        `;

    const Rect = styled.rect`
      stroke: #000;
      fill: #fff;`;

    const RectHighlight = styled.rect`
      stroke: #000;
      fill: #d299fd;`;

    const LabelText = styled.text`
      text-anchor: middle;`;

    const Title = styled.span`
      width: 100%;
      font-size: 0.9em;
      text-align: center;
      float: left;`;

    const HorizontalLine = styled.div`
      height: 0px;
      width: 90%;
      margin-bottom: 4px;
      border-bottom: solid 1px #fff;
      color: #fff;
      margin-left: auto;
      margin-right: auto;`

    const ValueDiv = styled.div`
      text-align: center;
      font-size: 1.8em;
      color: #fff;`;

    const NumformatSpan = styled.span`
      font-size: 0.5em;`

    const LabelDiv = styled.div`
      text-align: center;
      font-size: 0.7em;
      color: #fff;
      margin-bottom: 0.3em;`;

    const clickHandler = (e, vals) => {
      e.stopPropagation();
      const highNums = Object.keys(vals).filter(t => {
        if ((t !== "x0") && (t !== "x1")) return true;
        return false;
      }).map(k => {
        return vals[k];
      })

      //console.log(highNums)
      const max = Math.max(...highNums),
        min = Math.min(...highNums),
        numformat = this.props.renderData[0].numformat,
        message = (max === min) ?
          [<div>
            <ValueDiv>{min}<NumformatSpan>{numformat}</NumformatSpan></ValueDiv>
            <HorizontalLine />
            <LabelDiv>{this.props.selectedLabel.toUpperCase()}</LabelDiv>
            <HorizontalLine />
          </div>]
          :
          [<div>
            <ValueDiv>{min + "-" + max}<NumformatSpan>{numformat}</NumformatSpan></ValueDiv>
            <HorizontalLine />
            <LabelDiv>{this.props.selectedLabel.toUpperCase()}</LabelDiv>
            <HorizontalLine />
          </div>],
        statesInRange = this.props.renderData.filter(st => {
          return highNums.includes(st.value);
        }).map(st => { return st.id });

      this.props.uxCallback(message, statesInRange);
    }

    const margin = { top: 60, right: 10, bottom: 20, left: 5 },
      labelMargin = 5,
      tickSize = 10,
      axisMargin = 21;

    const valSet = renderData.map((st, i) => { return st["value"] });

    const xScale = d3.scaleLinear()
      .domain([d3.min(valSet), d3.max(valSet) + 1])
      .range([margin.left, width - margin.right])
      .interpolate(d3.interpolateRound)

    const bins = d3.histogram()
      .domain(xScale.domain())
      .thresholds(xScale.ticks(numBins))(valSet)

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, function (d) { return d.length; })])
      .range([0, height - (margin.top + margin.bottom)]);

    //console.log(Math.trunc(bins[0].x1)===Math.trunc(bins[0].x0))
    //console.log(Math.trunc(bins[0].x1), Math.trunc(bins[0].x0))
    //console.log(bins)

    const format = (Math.trunc(bins[0].x1) === Math.trunc(bins[0].x0)) ? ".1f" : ".0f";

    const xAxis = d3AxisBottom()
      .scale(xScale)
      .tickSize(tickSize)
      .tickFormat(d3.format(format));

    const renderAxis = <g className="xAxis" transform={"translate(0," + (height - axisMargin) + ")"} ref={node => d3.select(node).call(xAxis)} />

    let bars = [],
      labels = [];

    bins.forEach((b, i) => {
      let x = xScale(b.x0),
        h = (yScale(b.length)),
        y = (height - h) - margin.bottom,//yScale(b.length),
        w = (b.x1 === b.x0) ? xScale(b.x1 + 1) - xScale(b.x0) : xScale(b.x1) - xScale(b.x0);

      let barOb = {
        key: i,
        x: x,
        y: y,
        width: w,
        height: h,
        onClick: (e) => { clickHandler(e, b) }
      };


      if (b.filter(v => highlightValues.indexOf(v) > -1).length) {
        bars.push(<RectHighlight {...barOb} />);
      }
      else {
        bars.push(<Rect {...barOb} />);
      }

      if (b.length > 0) {
        labels.push(<LabelText key={i} x={x + (w / 2)} y={y - labelMargin} >{b.length}</LabelText>)
      }

    });

    return (
      <Histo>
        <Title>Distribution of Values</Title>
        <SVG  >
          {labels}
          {bars}
          {renderAxis}
        </SVG>
      </Histo>
    )
  }
}

Histogram.propTypes = {
  renderData: PropTypes.array.isRequired,
  highlightValues: PropTypes.array.isRequired,
  uxCallback: PropTypes.func.isRequired,
  selectedLabel: PropTypes.string.isRequired,
  dimensions: PropTypes.object.isRequired
}
