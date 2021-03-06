import React, { Component } from 'react';
import logo from './logo.svg';
import tips from './tips';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import {sortAs} from 'react-pivottable/Utilities';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import AnyChart from 'anychart-react/dist/anychart-react.min.js';
import 'react-pivottable/pivottable.css';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';
import axios from 'axios';
import anychart from 'anychart';
import ReactTable from 'react-table';
import data from './data.json';
import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import configureStore from './configureStore'
import CensusApp from './containers/CensusApp';
import  VoiceRecognition from './VoiceRecognition';
import VoicePlayer from './VoicePlayer';
import FontAwesome from 'react-fontawesome';

let store = configureStore()

var colorScales = anychart.scales.linearColor('#deebf7', '#3182bd')
var newArr = []; // option 0 
var newArr2 = []; // option 1
var newArr3 = [];//  option 2
for(var state in data){
    var value = data[state][0][state];
    var value2 = data[state][4][state];
    var value3 = data[state][47][state];
  let obj = {
        id:"US."+abbrState(state,'abbr'),
        value:value
    }
    let obj2 = {
        id:"US."+abbrState(state,'abbr'),
        value:value2
    }
    let obj3 = {
        id:"US."+abbrState(state,'abbr'),
        value:value3
    }
    newArr.push(obj);
    newArr2.push(obj2);
    newArr3.push(obj3);
}

var superStoreData = window.superStoreData


/////////////////////////////////// sales map data
var arr = [], arr2 = [], salesMapData
function calcSalesMapData(item) {        // data variable is included from json file 
  if (arr[item["State"]] === undefined)
    arr[item["State"]] = item["Sales"]
  else
    arr[item["State"]] += item["Sales"]
}
superStoreData.forEach(calcSalesMapData) 
var  stateNameToCode = { "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "District of Columbia": "DC", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY" }
var  codeToStateName = { "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District of Columbia", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }
  // connvert it to arrays in ISO 3188 shortname for anychart's format
  for (var k in arr) {
    arr2.push({"id": "US."+stateNameToCode[k], "value": parseInt(arr[k])});
  }
salesMapData = arr2
////////////////////////////////// sales map data


////////////////////////////////// profit region data
var arr = [], arr2 = [], profitRegionData
function calcProfitRegionData(item) {        // data variable is included from json file 
  if (arr[item["Region"]] === undefined)
    arr[item["Region"]] = item["Profit"]
  else
    arr[item["Region"]] += item["Profit"]
}
superStoreData.forEach(calcProfitRegionData) 
var  stateNameToCode = { "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "District of Columbia": "DC", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY" }
var  codeToStateName = { "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District of Columbia", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }
  // connvert it to arrays in ISO 3188 shortname for anychart's format
  for (var k in arr) {
    arr2.push({"x": k, "value": parseInt(arr[k])});
  }
profitRegionData = arr2
////////////////////////////////// profit region data



////////////////////////////////// segment quantity data
var arr = [], arr2 = [], segmentQuantityData
function calcSegmentQuantityData(item) {        // data variable is included from json file 
  if (arr[item["Segment"]] === undefined)
    arr[item["Segment"]] = item["Quantity"]
  else
    arr[item["Segment"]] += item["Quantity"]
}
superStoreData.forEach(calcSegmentQuantityData) 
  // connvert it to arrays in ISO 3188 shortname for anychart's format
  for (var k in arr) {
    arr2.push({"x": k, "value": parseInt(arr[k])});
  }
segmentQuantityData = arr2
////////////////////////////////// 


////////////////////////////////// discount subcategory data
var arr = [], arr2 = [], discSubData
function calcDiscSubData(item) {        // data variable is included from json file 
  if (arr[item["Sub-Category"]] === undefined)
    arr[item["Sub-Category"]] = item["Discount"]
  else
    arr[item["Sub-Category"]] += item["Discount"]
}
superStoreData.forEach(calcDiscSubData) 
  // connvert it to arrays in ISO 3188 shortname for anychart's format
  for (var k in arr) {
    arr2.push({"x": k, "value": parseInt(arr[k])});
  }
discSubData = arr2
////////////////////////////////// 

////////////////////////////////// quantity ship-mode data
var arr = [], arr2 = [], quantityShipData
function calcQuantityShipData(item) {        // data variable is included from json file 
  if (arr[item["Ship Mode"]] === undefined)
    arr[item["Ship Mode"]] = item["Quantity"]
  else
    arr[item["Ship Mode"]] += item["Quantity"]
}
superStoreData.forEach(calcQuantityShipData) 
  // connvert it to arrays in ISO 3188 shortname for anychart's format
  for (var k in arr) {
    arr2.push({"x": k, "value": parseInt(arr[k])});
  }
quantityShipData = arr2
////////////////////////////////// 



////////////////////////////////// sales region data
var arr = [], arr2 = [], salesRegionData
function calcSalesRegionData(item) {        // data variable is included from json file 
  if (arr[item["State"]] === undefined)
    arr[item["State"]] = item["Sales"]
  else
    arr[item["State"]] += item["Sales"]
}
superStoreData.forEach(calcSalesRegionData) 
var  stateNameToCode = { "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "District of Columbia": "DC", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY" }
var  codeToStateName = { "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District of Columbia", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }
  // connvert it to arrays in ISO 3188 shortname for anychart's format
  for (var k in arr) {
    arr2.push({"x": k, "value": parseInt(arr[k])});
  }
salesRegionData = arr2
////////////////////////////////// profit region data




function abbrState(input, to){
    let i=0;
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['District of Columbia','DC'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['Puerto Rico','PR'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        //input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }    
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }    
    }
}



const Plot = createPlotlyComponent(window.Plotly);

class PivotTableUISmartWrapper extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            pivotState: props, 
            barchart:[],
            region:0,
            lineChart:[],
            pieChart:[],
            details:{
                username:'',
                twitter:{},
                instagram:{}
            } 
        };
    }
    

    componentWillReceiveProps(nextProps) {
        this.setState({pivotState: nextProps});
    }

    render() {
        return <PivotTableUI
            renderers={Object.assign({}, TableRenderers, createPlotlyRenderers(Plot))}
            {...this.state.pivotState} onChange={s => this.setState({pivotState: s})}
            unusedOrientationCutoff={Infinity}
             />;
    }
}


export default class App extends React.Component {
  componentWillMount() {
      this.setState({
          mode: "demo",
          tab:0,
          start: false,
          stop: false,
          finalTranscript:'',
          text:'Hello! What can I do for you today?',
          result:'Hello! What can I do for you today?',
          filename: "Sample Dataset: Tips",
          voice:true,
          details:{
            username:'',
            twitter:[],
            instagram:[]
          },
          pivotState: {
              data: tips,
              rows: ["Payer Gender"], cols: ["Party Size"],
              aggregatorName: "Sum over Sum", vals: ["Tip", "Total Bill"],
              rendererName: "Grouped Column Chart",
              sorters: {
                  "Meal": sortAs(["Lunch", "Dinner"]),
                  "Day of Week": sortAs(["Thursday", "Friday", "Saturday", "Sunday"])},
              plotlyOptions: {width: 900, height: 500}
          }
      });
  }
  
  toTitleCase = (str) => {
    if (str)
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    else
      return "Err"
  }


calcDataAB = (value, parameter) => {
  value = this.toTitleCase(value)
  parameter = this.toTitleCase(parameter)
  console.log("calculating data"+value+parameter)
  var arr=[],arr2=[]
  superStoreData.forEach((item) => {
    if (arr[item[parameter]] === undefined)
      arr[item[parameter]] = item[value]
    else
      arr[item[parameter]] += item[value]
  }) 

  var  stateNameToCode = { "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "District of Columbia": "DC", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY" }
  var  codeToStateName = { "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District of Columbia", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }
    
  
    for (var k in arr) {
      arr2.push({"x": k, "value": parseInt(arr[k])});
    }      
  
  console.log(arr2)
  return arr2;
}

  startButton = () => {
    this.setState({ start: true,voice:false});
  }

  stopButton =()=>{
    this.setState({ stop: true });
    setTimeout(()=>this.setState({voice:true}),1000);
  }

  onEnd = () => {
    console.log('recognition ends');
    this.setState({ start: false, stop: false,voice:true })
  }

  onResult = ({ finalTranscript }) => {
    const result = finalTranscript;
    this.setState({ stop: true });
    setTimeout(()=>this.setState({voice:true}),500);

    if(result.indexOf("column")>-1)
        this.setState({text:'Between which parameters', result:'Between which parameters'});
    else if(result.indexOf("map")>-1)
        this.setState({text:'Here is the sales map',text:'Here is the sales map'});
    else
        this.setState({text:'Here is the column chart between'+(finalTranscript.split(" and ")[0])+' and '+(this.state.finalTranscript.split(" and ")[1]) });
      
    this.setState({ start: false,finalTranscript:result })
  }

  voiceOnEnd = () =>{
      console.log('voice ends');
      this.setState({
          voice:false
      })
  }

  handleChangeRegion=(event)=>{
      this.setState({
          region:event.target.value
      })
      console.log(event.target.value);
  }
  onDrop(files) {
      this.setState({
          mode: "thinking",
          filename: "(Parsing CSV...)",
          textarea: "",
          pivotState: { data: [] }
      }, () => Papa.parse(files[0], {
          skipEmptyLines: true,
          error: (e) => alert(e),
          complete: (parsed) => {
            this.setState({
              mode: "file",
              filename: files[0].name,
              pivotState: { data: parsed.data }
          })
          this.plotBarChart(parsed.data)
          } 
        })
      );
  }
  plotBarChart=(pivotState)=>{
    let salesData = []
    for(let i=1; i<=50; i++){
      let data = [];
      
      data = [pivotState[i][10],parseInt(pivotState[i][17])]
      salesData.push(data);
    }
    let newStates = [];
    salesData.map((val,i)=>{
        if(newStates.indexOf(val[0])===-1){
            newStates.push(val[0])
        }
        
    });
    let newSalesData = []
    for(let j=0;j<newStates.length;j++){
        let val = 0;
        for(let k=0;k<salesData.length;k++){
            if(salesData[k][0]===newStates[j]){
                val = val + salesData[k][1]
            }
        }
        newSalesData.push([newStates[j],val])
    }
    console.log(newSalesData)
    var salesDataTable = anychart.data.table();
    salesDataTable.addData(newSalesData); 
    // var secondPlot = chart.plot(0);
    // secondPlot.splineArea(salesDataTable.mapAs({'value': 4})).fill('#1976d2 0.65').stroke('1.5 #1976d2').name('Sales');
    this.setState({
      barchart: newSalesData
    })
  }
  getSocialData=()=>{
      
      let state = this.state;
      if(state.details.username!==''){
        axios.get(`https://socialbearing.com/scripts/get-user.php?user=${state.details.username}`)
        .then((response)=> {
            state.details.twitter =[response.data]
            this.setState(state)
        })
        .catch(function (error) {
            console.log(error);
        });
        /*instagramAnalytics(username).then(stats => {
            console.log(stats);
            this.setState({
                instagram:username
            })
            
            {
                comments: 351,
                description: 'A wonderful description',
                email: 'foobar@gmail.com',
                engagement: 0.02,
                followers: 821,
                ...
            }
            
        });*/
    }
  }
  custom_charts=()=>{
    setTimeout(()=>{
      window.drawtop10regions();
      window.drawtop10customers();
      window.drawtop10categories();
      window.drawSalesByMonth();
      window.drawMap();
      window.drawSalesByMonthArea();
      // window.drawtop10categoriesradar();  
    },100);
  }
  handleChange=(event)=>{
      console.log('hey')
      let state = this.state
      state.details.username = event.target.value;
      console.log(state)
      this.setState(state)
  }
  onType(event) {
      Papa.parse(event.target.value, {
          skipEmptyLines: true,
          error: (e) => alert(e),
          complete: (parsed) => {
          this.setState({
              mode: "text",
              filename: "Data from <textarea>",
              textarea: event.target.value,
              pivotState: { data: parsed.data },
          })

          this.plotBarChart(parsed.data)
          console.log(parsed)
        }
      });
  }
  changeTab(tab){
      this.setState({
          tab:tab
      })
  }

  componentDidMount() {
  }
  
  render() {

      var dashStyle = {height: "250px"}
      var dashStyle2 = {height: "450px"}

      var dataSetStateName = 'Population estimates, July 1, 2017,  (V2017)';
      var dataSetStateName2= 'Population, percent change - April 1, 2010 (estimates base) to July 1, 2017,  (V2017)'
      var dataSetStateName3 = 'Total retail sales, 2012 ($1,000)'
      var dataSet =  anychart.data.set(newArr);
      var dataSet2 =  anychart.data.set(newArr2);
      var dataSet3 =  anychart.data.set(newArr3);
      
      const columns = [{
        Header: 'Screen Name',
        accessor: 'screen_name' // String-based value accessors!
      }, {
        Header: 'Name',
        accessor: 'name',
      }, {
        Header: 'Followers', // Required because our accessor is not a string
        accessor: 'followers_count'
      }, {
        Header: 'Description', // Custom header components!
        accessor: 'description'
      }]
    return (
      <div>
      <div className="global-shadow"></div>
      <div className="row title-dashboard-panel">
          <div className="col-lg-8 col-lg-offset-4 dashboard-limitation">
              <h1 className="title">
                  <a className="hidden-lg switcher" ><i className="fa fa-bars"></i></a>
                  <span className="bright-text">SAFE - Sales Analytics Platform For Enterprises</span>

                  <div className="btn-group pull-right submenu">
                      
                      <ul className="dropdown-menu">
                      </ul>
                  </div>
              </h1>
          </div>
      </div>

<div className="container-fluid">
<div className="row">
<div className="col-lg-3 no-print">
    <div className="menu-wrapper">
        <ul className="list-unstyled">

            <li><a className={this.state.tab===0?"general active":"general"} onClick={()=>this.changeTab(0)}>Upload Data <i className="fa fa-files-o"></i></a></li>
            <li><a className={this.state.tab===1?"products active":"products"} onClick={()=>this.changeTab(1)}>Custom Visualisations <i className="fa fa-wrench"></i></a></li>
            <li><a className={this.state.tab===2?"sales-team active":"sales-team"} onClick={()=>{this.custom_charts();this.changeTab(2)}}>Smart Dashboard<i className="fa fa-line-chart"></i></a></li>
            {/*<li><a className={this.state.tab===3?"regions active":"regions"} onClick={()=>this.changeTab(3)}>Region Charts<i className="fa fa-map-marker"></i></a></li>
            <li><a className={this.state.tab===4?"regions active":"regions"} onClick={()=>this.changeTab(4)}>Social Comparison<i className="fa fa-map-marker"></i></a></li>
            */}<li><a className={this.state.tab===5?"regions active":"regions"} onClick={()=>this.changeTab(5)}>Location Intelligence<i className="fa fa-map-marker"></i></a></li>
            <li><a href="test.html" target="_blank" className={this.state.tab===7?"regions active":"regions"} onClick={()=>this.changeTab(7)}>Insights and Predictions<i className="fa fa-signal"></i></a></li>
            <li><a className={this.state.tab===6?"regions active":"regions"} onClick={()=>this.changeTab(6)}>Voice Command<i className="fa fa-microphone"></i></a></li>

        </ul>
        {/*<ul className="period-selector list-unstyled">
            <li><label for="option-1">
                <span>WTD</span>
                <input type="radio" id="option-1" name="options" value="WTD" onclick="changeData('WTD')"/>
            </label></li>
            <li><label for="option-2">
                <span>MTD</span>
                <input type="radio" id="option-2" name="options" value="MTD" onclick="changeData('MTD')"/>
            </label></li>
            <li><label for="option-3">
                <span>QTD</span>
                <input type="radio" id="option-3" name="options" value="QTD" onclick="changeData('QTD')"/>
            </label></li>
            <li><label for="option-4">
                <span>YTD</span>
                <input type="radio" id="option-4" name="options" value="YTD" checked onclick="changeData('YTD')"/>
            </label></li>
            <li><label for="option-5">
                <span>All Time</span>
                <input type="radio" id="option-5" name="options" value="all" onclick="changeData('all')"/>
            </label></li>
    </ul>*/}
        <div className="divider"></div>
    </div>

</div>

    {this.state.tab===0?
    <div className="col-lg-8 dashboard-limitation no-padding content">
                <div className="row text-center">
                <p>Try it right now on a file...</p>
                <Dropzone onDrop={this.onDrop.bind(this)} accept="text/csv" className="dropzone"
                activeClassName="dropzoneActive" rejectClassName="dropzoneReject" >
                    <p>Drop a CSV file here, or click to choose a file from your computer.</p>
                </Dropzone>
                <div >
                <p>...or paste some data:</p>
                <textarea value={this.state.textarea} onChange={this.onType.bind(this)}
                    placeholder="Paste from a spreadsheet or CSV-like file"/>
                </div>
                </div>

        
    </div>:''}
    {this.state.tab===1?

    <div className="col-lg-8 dashboard-limitation no-padding content">
    <h2 className="text-center">{this.state.filename}</h2>
    <br />
    <div className="table-container">
        <PivotTableUISmartWrapper {...this.state.pivotState} />
    </div>
    </div>:''}
    {this.state.tab===2?
        
    <div className="col-md-8 col-lg-8 col-sm-12 no-padding">
        <div className="row">


            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                 <div id="top10regions" style={dashStyle}></div>
                </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div id="top10customers" style={dashStyle}></div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div id="top10categories" style={dashStyle}></div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div id="salesByMonthArea" style={dashStyle}></div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div id="salesByMonth" style={dashStyle}></div>
              </div>
            </div>
             

            <div className="row">
              <div className="col-lg-12 col-md-8 col-sm-8">
                <div id="map" style={dashStyle2}></div>
              </div>
            </div>
            



        </div>
    </div>:''}
    {this.state.tab===3?
    <div className="col-md-8 col-lg-8 col-sm-12 no-padding">
    <div className="america">
    <select value={this.state.region} onChange={this.handleChangeRegion} name="region">
        <option value={0}>Population estimates, July 1, 2017,  (V2017)</option>
        <option value={1}>Population, percent change - April 1, 2010 (estimates base) to July 1, 2017,  (V2017)</option>
        <option value={2}>Total retail sales per capita, 2012</option>
    </select>
    {this.state.region==0?
        <AnyChart
            width={800}
            height={600}
            type="choropleth"
            colorScale={colorScales}
            data={dataSet}
            title={dataSetStateName}
            geoData="anychart.maps.united_states_of_america"
        />:''}
        {this.state.region==1?
        <AnyChart
            width={800}
            height={600}
            type="choropleth"
            colorScale={colorScales}
            data={dataSet2}
            title={dataSetStateName2}
            geoData="anychart.maps.united_states_of_america"
        />:''}
        {this.state.region==2?
        <AnyChart
            width={800}
            height={600}
            type="choropleth"
            colorScale={colorScales}
            data={dataSet3}
            title={dataSetStateName3}
            geoData="anychart.maps.united_states_of_america"
        />:''}

        <div className="col-md-6 no-padding">
            <div className="chart-block">
                <h2 className="chart-title">Regional Sales Range</h2>
                <div id="regions-chart" data-height="480" className="chart"></div>
            </div>
        </div>
        <div className="col-md-6 no-padding">
            <div className="row">
                <div className="col-lg-12">
                    <div className="chart-block">
                        <h2 className="chart-title"> Revenue trend for
                            <div className="btn-group">
                                <button id="region-name-menu" type="button" className="btn btn-link btn-xs dropdown-toggle"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="region-name"></span> <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu"  id="region-name-menu-list"></ul>
                            </div>
                        </h2>

                        <div id="sales-in-region-chart" className="chart" data-height="230"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="chart-block">
                        <h2 className="chart-title"> Share of Total <br/><span className="region-name"></span></h2>
                        <div id="total_share" className="chart" data-height="180"></div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="chart-block">
                        <h2 className="chart-title">Market Share <br/><span className="region-name"></span></h2>
                        <div id="market_share" className="chart" data-height="180"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>:''}
    {this.state.tab===4?
    
    <div className="col-md-8 col-lg-8 col-sm-12 no-padding">
        <input onChange={this.handleChange} value={this.state.details.username} className="input" name="username" />
        <button onClick={this.getSocialData} className="btn" >Submit</button>
        <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12 no-padding">
            <h3>Twitter Profile Details</h3>
            <ReactTable
                defaultPageSize={1}
                minRows={1}
                data={this.state.details.twitter}
                columns={columns}
            />
        </div>
        <div className="col-md-12 col-lg-12 col-sm-12 no-padding">
            
        </div>
        </div>
    </div>:""}
    {this.state.tab===5?

        <div className="col-md-8 col-lg-8 col-sm-12 no-padding">
            <Provider store={store}>
              <CensusApp />
            </Provider>
          <br></br><br></br><br></br>          
        </div>





        :''}
    {this.state.tab===6?
        <div className="col-md-8 col-lg-8 col-sm-12 no-padding">
        <div className="interaction-container">


        {this.state.voice&&<VoicePlayer
            play
            text={this.state.text}
            onEnd={this.voiceOnEnd}
        />}
        
        <h3>{this.toTitleCase(this.state.result)}</h3>
        <div className="btn-container">
            <button className="hello" onClick={this.startButton}>
                <FontAwesome
                    name='microphone'
                    style={{ color: '#2d5dbe' }}
                />
            </button>
            {/*<button className="hello" onClick={this.stopButton}>
                <FontAwesome
                    name='stop'
                    style={{ color: '#2d5dbe' }}
                />    
            </button>*/}
        </div>
        </div>

         {this.toTitleCase(this.state.finalTranscript)==='Err'?console.log("Errrrrrrr"):''}

        {this.toTitleCase(this.state.finalTranscript)!='Err' && this.state.finalTranscript.indexOf('column')==-1 && this.state.finalTranscript.indexOf('map')>-1?
         <AnyChart
            width={800}
            height={600}
            type="choropleth"
            colorScale={colorScales}
            data={salesMapData}
            title={"Sales Map"}
            geoData="anychart.maps.united_states_of_america"
        />:''}

        {this.toTitleCase(this.state.finalTranscript)!='Err' && this.state.finalTranscript.indexOf('column')==-1 && this.state.finalTranscript.indexOf('map')==-1?
        <AnyChart 
            legend={this.state.legend} 
            width={1200}
            height={600} 
            title={""+this.toTitleCase(this.state.finalTranscript.split(" and ")[0])+" VS "+this.toTitleCase(this.state.finalTranscript.split(" and ")[1])}
            type="column" 
            data={this.calcDataAB(this.state.finalTranscript.split(" and ")[0], this.state.finalTranscript.split(" and ")[1])}
        />:''}


        {this.state.start && (
          <VoiceRecognition
            onResult={this.onResult}
            continuous={false}
            lang="en-US"
            stop={this.state.stop}
          />
        )}
        </div>:""}

<div className="modal" id="aboutDashboardModal"  role="dialog">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Sales Dashboard <span className="light-text">"Wine Sales in France"</span></h4>
            </div>
            <div className="modal-body">
                <p className="important"> This is an example which covers the basics of any sales dashboard. We
                    did our best to make it visually appealing and easy to grasp.<br/>
                    Example contains four tabs: The first tab - is a general view - it allows to
                    assess the situation as a whole, the other three tabs intend to reveal the situation for particular categories of
                    products, sales team advances and evaluation of sales by region. <br/>
                    The solution is dedicated to the wines of France - a pleasant topic to think about.
                    But don't forget that according to the Surgeon General, women should not drink alcoholic
                    beverages during pregnancy because of the risk of birth defects and that consumption of
                    alcoholic beverages impairs your ability to drive a car or operate machinery, and may cause
                    health problems.</p>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Replacing Data</h4>
                        <p>All data used in this sample can be found in <strong><em>src/data/data.js</em> </strong>file. <br/>
                            The structure of the data is (all 4 data sets have same first level: "YTD", "QTD", "MTD", "WTD" and "all"): </p>
                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingOne">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        generatedGeneralData </a>  <span className="text-muted">- data for "General" tab.</span>
                                </div>
                                <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                    <div className="panel-body">
                                        <ul className="list-default">
                                            <li>revenue_chart <span className="text-muted">- table with rows like ["2001", 354165, 457]</span>
                                            </li>
                                            <li>key_metrics <span className="text-muted"> - has several objects and the data for each of them. </span>
                                            </li>
                                            <li>five_best
                                                <ul className="list-default">
                                                    <li>sales_men <span className="text-muted">- table with ["Katherine Dean", 505625] rows</span>
                                                    </li>
                                                    <li>regions <span className="text-muted">- table with ["Languedoc-Roussillon", 524336] rows</span>
                                                    </li>
                                                    <li>products <span className="text-muted">- table with ["Comtes de Tastes", 350012] rows</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingTwo">
                                    <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseThree">
                                        generatedProductsData
                                    </a> <span className="text-muted">- data for "Sales by Product" tab.</span>
                                </div>
                                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                    <div className="panel-body">
                                        <ul className="list-default">
                                            <li>categories_data <span className="text-muted"> - products by categories data. The biggest data set in the sample.</span>
                                                <ul className="list-default">
                                                    <li>x <span className="text-muted">- category name </span></li>
                                                    <li>value <span className="text-muted">- value for the whole category</span></li>
                                                    <li>data <span className="text-muted">- data for the table and the map in this tab</span></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingThree">
                                        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            generatedRegionsData
                                        </a> <span className="text-muted">- data for "Sales by Region" tab.</span>
                                </div>
                                <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                    <div className="panel-body">
                                        <ul className="list-default">
                                            <li>regions_data <span className="text-muted">- list of all regions with data for each of them:</span>
                                                <ul>
                                                    <li>id <span className="text-muted">- region id </span></li>
                                                    <li>x  <span className="text-muted">- region name </span></li>
                                                    <li>value <span className="text-muted">- value </span></li>
                                                    <li>market_share <span className="text-muted">- products market share in the region </span></li>
                                                    <li>total_share <span className="text-muted">- the share of sales in this region from the total sales</span></li>
                                                    <li>revenue <span className="text-muted">- table data for revenue chart [["2001", 480973, 490]</span></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingFour">
                                    <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                                        generatedSalesTeamData
                                    </a><span className="text-muted"> - data for the "Sales Team" tab.</span>
                                </div>
                                <div id="collapseFour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                    <div className="panel-body">
                                        <ul className="list-default">
                                            <li>team_data <span className="text-muted">- list of all persons with data for each of them</span> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Technology stack</h4>
                        <p> Charting in this sample is done exclisively by <a target="_blank" href="https://cdn.anychart.com/">the latest version</a> of <a  target="_blank"  href="https://www.anychart.com/">AnyChart JavaScript Web Charting Framework</a>.
                            <br/><a target="_blank" href="https://docs.anychart.com/">AnyChart Users' Guide</a>
                            <br/><a target="_blank"  href="https://api.anychart.com/">AnyChart JavaScript API Reference</a>
                            <br/>To create tabs, handle data and interactions the following tools are used:
                        </p>
                        <ul className="list-default">
                            <li><a target="_blank" href="http://jquery.com/">Jquery 2.1.3</a></li>
                            <li><a target="_blank" href="http://getbootstrap.com/getting-started/">Bootstrap 3</a></li>
                            <li><a target="_blank" href="http://fortawesome.github.io/Font-Awesome/get-started/">Font Awesome 4.4.0</a></li>
                        </ul>
                        <p>Special thanks to <a target="_blank" href="http://design.google.com/">Google Material Design</a> for the inspiration and design ideas.</p>
                        <h4>License</h4>
                        <p>
                            AnyChart Sales Dashboard solution includes two parts:
                        </p>
                        <ul>
                            <li>
                                Code of the solution that allows to use Javascript library (in this case, AnyChart) to
                                create a dashboard. You can use, edit, modify it, use it with other Javascript libraries
                                without any restrictions. It is released under <a
                                    href="https://github.com/anychart-solutions/sales-dashboard/blob/master/LICENSE"
                                    target="_blank">Apache 2.0
                                License</a>.
                            </li>
                            <li>
                                AnyChart JavaScript library. It is released under Commercial license. You can test this
                                plugin with the trial
                                version of AnyChart. Our trial version is not limited by time and doesn't contain any
                                feature limitations. Check
                                details <a href="https://www.anychart.com/buy/" target="_blank">here</a>.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}
