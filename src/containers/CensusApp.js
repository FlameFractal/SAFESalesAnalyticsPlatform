import { connect } from 'react-redux'
import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import CustomFont from '../fonts/GothamNarrow-Book.otf'

import {
  fetchCensusData,
  vizClick,
  clearSelections,
  changeDropDown
} from '../actions'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Dropdown from '../components/Dropdown'
import MapUSA from '../components/MapUSA'
import Histogram from '../components/Histogram'
import ScatterPlotLine from '../components/ScatterPlotLine'
import MessageModal from '../components/MessageModal'


class CensusApp extends Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.clearSelections = this.clearSelections.bind(this);
    const key = "47498d7e18b87cc6d3ffcc3b61ad9f9f5d2be790",
      standardAPIObj = {
        "url": "https://api.census.gov/data/2016/acs/acs1/profile?",
        "for": "state:*",
        "key": key,
      };

    this.dropDownOptions = [
      { "label": "High School Only Education", "data": { ...standardAPIObj, "get": "NAME,DP02_0061E,DP02_0058E", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": Math.round((parseInt(v["DP02_0061E"], 10) / parseInt(v["DP02_0058E"], 10)) * 100), "numformat": "%" } } } },
      { "label": "Bachelors Education", "data": { ...standardAPIObj, "get": "NAME,DP02_0064E,DP02_0058E", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": Math.round((parseInt(v["DP02_0064E"], 10) / parseInt(v["DP02_0058E"], 10)) * 100), "numformat": "%" } } } },
      { "label": "Unmarried Births", "data": { ...standardAPIObj, "get": "NAME,DP02_0038E", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": parseInt(v["DP02_0038E"], 10), "numformat": " (per 1k)" } } } },
      { "label": "White", "data": { ...standardAPIObj, "get": "NAME,DP05_0032E,DP05_0028E", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": Math.round((parseInt(v["DP05_0032E"], 10) / parseInt(v["DP05_0028E"], 10)) * 100), "numformat": "%" } } } },
      { "label": "Black", "data": { ...standardAPIObj, "get": "NAME,DP05_0033E,DP05_0028E", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": Math.round((parseInt(v["DP05_0033E"], 10) / parseInt(v["DP05_0028E"], 10)) * 100), "numformat": "%" } } } },
      { "label": "Hispanic", "data": { ...standardAPIObj, "get": "NAME,DP05_0066E,DP05_0065E", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": Math.round((parseInt(v["DP05_0066E"], 10) / parseInt(v["DP05_0065E"], 10)) * 100), "numformat": "%" } } } },
      { "label": "No Health Insurance", "data": { ...standardAPIObj, "get": "NAME,DP03_0099E,DP03_0095E", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": Math.round((parseInt(v["DP03_0099E"], 10) / parseInt(v["DP03_0095E"], 10)) * 100), "numformat": "%" } } } },
      { "label": "Median Age", "data": { ...standardAPIObj, "get": "NAME,DP05_0017E", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": parseInt(v["DP05_0017E"], 10), "numformat": " years" } } } },
      { "label": "Median HH Income", "data": { ...standardAPIObj, "get": "NAME,DP03_0062E", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": Math.trunc(parseInt(v["DP03_0062E"], 10) / 1000), "numformat": "k" } } } },
      { "label": "Divorced females", "data": { ...standardAPIObj, "get": "NAME,DP02_0035PE", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": parseFloat(v["DP02_0035PE"]), "numformat": "%" } } } },
      { "label": "Teen births", "data": { ...standardAPIObj, "get": "NAME,DP02_0040E", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": parseFloat(v["DP02_0040E"]), "numformat": "(per 1k)" } } } },
      { "label": "Disability", "data": { ...standardAPIObj, "get": "NAME,DP02_0071PE", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": parseFloat(v["DP02_0071PE"]), "numformat": "%" } } } },
      { "label": "Broadband internet", "data": { ...standardAPIObj, "get": "NAME,DP02_0152PE", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": parseFloat(v["DP02_0152PE"]), "numformat": "%" } } } },
      { "label": "Unemployment rate", "data": { ...standardAPIObj, "get": "NAME,DP03_0009PE", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": parseFloat(v["DP03_0009PE"]), "numformat": "%" } } } },
      { "label": "Social security", "data": { ...standardAPIObj, "get": "NAME,DP03_0066PE", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": parseFloat(v["DP03_0066PE"]), "numformat": "%" } } } },
      { "label": "Supplemental Security Income", "data": { ...standardAPIObj, "get": "NAME,DP03_0070PE", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": parseFloat(v["DP03_0070PE"]), "numformat": "%" } } } },
      { "label": "Food stamps/SNAP", "data": { ...standardAPIObj, "get": "NAME,DP03_0074PE", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": parseFloat(v["DP03_0074PE"]), "numformat": "%" } } } },
      { "label": "Male:Female Pay Ratio", "data": { ...standardAPIObj, "get": "NAME,DP03_0093E,DP03_0094E", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": +(parseInt(v["DP03_0093E"]) / parseInt(v["DP03_0094E"])).toFixed(1), "numformat": "%" } } } },
      { "label": "Public health insurance", "data": { ...standardAPIObj, "get": "NAME,DP03_0098PE", "processor": (v, i) => { return { "id": parseInt(v["state"], 10), "state": v["NAME"], "value": parseFloat(v["DP03_0098PE"]), "numformat": "%" } } } },
    ];
    this.handleOptionChange("primaryData", 0)
    this.handleOptionChange("secondaryData", this.dropDownOptions.length - 1)
  }

  handleInteraction(message, idSet) {
    this.props.dispatch(vizClick(message, idSet));
  }

  clearSelections() {
    this.props.dispatch(clearSelections());
  }

  handleOptionChange(optiongroup, selectedItemNumber) {
    console.log(optiongroup, selectedItemNumber, this.dropDownOptions[selectedItemNumber])
    this.props.dispatch(fetchCensusData(optiongroup, this.dropDownOptions[selectedItemNumber].data))
    this.props.dispatch(changeDropDown(optiongroup, { "itemNumber": selectedItemNumber, "label": this.dropDownOptions[selectedItemNumber].label }))
  }


  render() {
    const { censusData, selectionLabels } = this.props;

    const width= window.innerWidth || document.body.clientWidth,
    height= window.innerHeight || document.body.clientHeight,
      mapW = width >= 900 ? 600 : width*.90,
      histoW = width >= 900 ? 300 : width*.60,
      scatterW = width >= 900 ? 600 : width*.80,
      vizH = mapW * 0.66;

  

    
    
    console.log(width, height, width>1400)
    console.log(mapW, histoW, scatterW)



    injectGlobal`
    @font-face {
      font-family: CustomFont;
      src: url('${CustomFont}') format('opentype');
    }`;

    const ClearFloatHack = styled.div`
      clear: left;
    `;

    //Styled-components - causes continuous-remounting of components that have state or use componentDidMount, 
    //so Histogram is fine when nested in a styled component, however dropdown (keeps initiating onChange) and Map (flickers due to total reload) have issues!

    //Map cannont be nested in a styled-component!!
    let highlightValues = [];
    if (censusData.hasOwnProperty("primaryData")) {
      highlightValues = censusData.primaryData.filter(st => selectionLabels.highlightStates.indexOf(st.id) > -1).map(st => st.value);
      //console.log(highlightValues);
    }

    const InstructionsSecondary = styled.div`
      font-family: CustomFont;
      font-size: 1.1em;
      text-align: center;
    `;

    const SmallMargins = styled.p`
      margin-bottom: 2px;
      margin-top: 2px;`;

    const LineDiv = styled.div`
    border-bottom: solid 1px #c5c5c5;
      width: 70%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 1em;
      `;

    return (
      <div>
        <Header />
        <LineDiv />
        <InstructionsSecondary>
          <SmallMargins>Select a demographic from the dropdown list:</SmallMargins>
        </InstructionsSecondary>
        {censusData.hasOwnProperty("primaryData") &&
          <div>
            <InstructionsSecondary>
              <Dropdown optionSet={this.dropDownOptions} onChange={(val) => { this.handleOptionChange("primaryData", val) }} selectedItem={selectionLabels.primaryData.itemNumber} />
            </InstructionsSecondary>
            <div className="centering-div">
              <MapUSA renderData={censusData.primaryData} uxCallback={(msg, vals) => { this.handleInteraction(msg, vals) }} highlightStates={selectionLabels.highlightStates} selectedLabel={selectionLabels.primaryData.label} dimensions={{"width": mapW, "height": vizH}} />
              <Histogram renderData={censusData.primaryData} uxCallback={(msg, vals) => { this.handleInteraction(msg, vals) }} highlightValues={highlightValues} selectedLabel={selectionLabels.primaryData.label} dimensions={{"width": histoW, "height": vizH}} />
            </div>
            <ClearFloatHack />

            <LineDiv />
            <InstructionsSecondary>
              <SmallMargins>Select a secondary variable for the scatter plot below</SmallMargins>
              <SmallMargins>{selectionLabels.primaryData.label} vs. <Dropdown optionSet={this.dropDownOptions} onChange={(val) => { this.handleOptionChange("secondaryData", val) }} selectedItem={selectionLabels.secondaryData.itemNumber} /></SmallMargins>
            </InstructionsSecondary>

            {censusData.hasOwnProperty("secondaryData") &&
                <ScatterPlotLine
                  primaryData={censusData.primaryData}
                  secondaryData={censusData.secondaryData}
                  primaryLabel={selectionLabels.primaryData.label}
                  secondaryLabel={selectionLabels.secondaryData.label}
                  highlightStates={selectionLabels.highlightStates}
                  uxCallback={(msg, vals) => { this.handleInteraction(msg, vals) }}
                  dimensions={{"width": scatterW, "height": vizH}} />
            }
          </div>
        }

        <MessageModal message={selectionLabels.message} interactionHandler={() => { this.clearSelections() }} showButton={highlightValues.length > 0} />
        <Footer />
      </div>
    );

  }


}


const mapStateToProps = (state, ownProps) => {
  return {
    censusData: state.censusData,
    selectionLabels: state.selectionLabels
  }
}


export default CensusApp = connect(
  mapStateToProps
)(CensusApp)
