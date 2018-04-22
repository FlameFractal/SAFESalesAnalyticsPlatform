import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import styled from 'styled-components'
import fetch from 'isomorphic-fetch'

export default class MapUSA extends Component {
  constructor(props) {
    super(props);
    this.state = { "statePaths": [] };
  }

  componentDidMount() {
    console.log("Map Mounted");
    fetch("http://rockthecatzva.com/statestats-reactd3/us.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        console.log(response);
        response.json().then(json => {
          this.setState({
            statePaths: topojson.feature(json, json.objects.states)
          })
        })
      })
  }



  render() {
    console.log("Map Rendering")
    const { renderData, highlightStates, dimensions } = this.props;
    const height = dimensions.height,
      width = dimensions.width;

    //console.log(dimensions)
    //const width = 600,
    //height = 400;

    const Map = styled.div`
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
      height: ${height + "px"};`;

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




    const highlightColor = "#d299fd",
      highlightGreyout = "#c5c5c5";

    let renderStates = []

    if (this.state.statePaths.features) {
      let projection = d3.geoAlbersUsa().scale(width*1.2).translate([width / 2, height / 2]),
        path = d3.geoPath().projection(projection),
        max_val = d3.max(renderData, (d) => { return d['value'] }),
        min_val = d3.min(renderData, (d) => { return d['value'] }),
        median_val = d3.median(renderData, (d) => { return d['value'] }),
        colorScale = d3.scaleLinear().domain([min_val, median_val, max_val]).range(['blue', 'white', 'red']);


      const clickHandler = (e, stateInfo) => {
        console.log(stateInfo);
        e.stopPropagation();



        const message = [<div>
          <StatenameDiv>{stateInfo.state.toUpperCase() + ":"}</StatenameDiv>
          <HorizontalLine />
          <ValueDiv>{stateInfo.value}<NumformatSpan>{stateInfo.numformat}</NumformatSpan></ValueDiv>
          <LabelDiv>{this.props.selectedLabel.toUpperCase()}</LabelDiv>
          <HorizontalLine />
        </div>];

        this.props.uxCallback(message, [stateInfo.id]);

      }


      renderStates = this.state.statePaths.features.map((d, i) => {
        let colorVal = "#fff";
        const stateInfo = renderData.filter(st => { if (st.id === d.id) return true; return false; });

        if (highlightStates.length > 0) {
          colorVal = highlightStates.filter(st => { if (st === d.id) { return true } return false }).length > 0 ? highlightColor : highlightGreyout;
        }
        else {
          if (stateInfo.length) {
            colorVal = colorScale(stateInfo[0].value);
          }

        }
        return (<path d={path(d)} key={i} stroke={"#000"} fill={colorVal} onClick={(e) => { clickHandler(e, stateInfo[0]) }} />);
      })
    }

    return (
      <Map>
        <Title>U.S. State Map</Title>
        <SVG>
          {renderStates}
        </SVG>
      </Map>
    )
  }
}

MapUSA.propTypes = {
  renderData: PropTypes.array.isRequired,
  uxCallback: PropTypes.func.isRequired,
  highlightStates: PropTypes.array.isRequired,
  selectedLabel: PropTypes.string.isRequired,
  dimensions: PropTypes.object.isRequired
}