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
import AnyChart from 'anychart-react/dist/anychart-react.min.js'
import 'react-pivottable/pivottable.css';
import Dropzone from 'react-dropzone'
import Papa from 'papaparse'
import anychart from 'anychart'

const Plot = createPlotlyComponent(window.Plotly);

class PivotTableUISmartWrapper extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = { pivotState: props, barchart:[] };
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
          filename: "Sample Dataset: Tips",
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
    for(let i=0; i<10; i++){
      let data = [];
      console.log(pivotState[i])
      data = [pivotState[i][2],pivotState[i][17]]
      salesData.push(data);
    }
    var salesDataTable = anychart.data.table();
    salesDataTable.addData(salesData); 
    // var secondPlot = chart.plot(0);
    // secondPlot.splineArea(salesDataTable.mapAs({'value': 4})).fill('#1976d2 0.65').stroke('1.5 #1976d2').name('Sales');
    this.setState({
      barchart: salesData
    })
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
  render() {
    return (
      <div>
      <div className="global-shadow"></div>
      <div className="row title-dashboard-panel">
          <div className="col-lg-8 col-lg-offset-3 dashboard-limitation">
              <h1 className="title">
                  <a className="hidden-lg switcher" onclick="showBars(true)"><i className="fa fa-bars"></i></a>
                  Sales Dashboard <span className="bright-text">"SAFE Sales Dashboard"</span>

                  <div className="btn-group pull-right submenu">
                      <a type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                          <i className="fa fa-ellipsis-v"></i>
                      </a>
                      <ul className="dropdown-menu">
                      </ul>
                  </div>
              </h1>
          </div>
      </div>

<div className="col-lg-3 menu-dashboard-panel no-print ">
    <div className="menu-wrapper">
        <ul className="list-unstyled">
            <li><a className="general active" onClick="changeTab('general')">Upload Data <i className="fa fa-bookmark"></i></a></li>
            <li><a className="products " onClick="changeTab('products')">Sales charts <i className="fa fa-shopping-cart"></i></a></li>
            <li><a className="sales-team " onClick="changeTab('sales-team')">Sales Team Rate <i className="fa fa-user"></i></a></li>
            <li><a className="regions " onClick="changeTab('regions')"> Region Charts<i className="fa fa-map-marker"></i></a></li>
        </ul>
        <hr/>
        <ul className="period-selector list-unstyled">
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
        </ul>
        <hr/>
        <div className="divider"></div>
    </div>

</div>

<div className="container-fluid">
    <div className="row">


        <div className="col-lg-8 col-lg-offset-3 dashboard-limitation no-padding content">
            
        <div className="col-sm-8 no-padding">
                  <div className="row text-center">
                    <div>
                    <p>Try it right now on a file...</p>
                    <Dropzone onDrop={this.onDrop.bind(this)} accept="text/csv" className="dropzone"
                    activeClassName="dropzoneActive" rejectClassName="dropzoneReject" >
                        <p>Drop a CSV file here, or click to choose a file from your computer.</p>
                    </Dropzone>
                    </div>
                    <div >
                    <p>...or paste some data:</p>
                    <textarea value={this.state.textarea} onChange={this.onType.bind(this)}
                        placeholder="Paste from a spreadsheet or CSV-like file"/>
                    </div>
                  </div>

            <div className="row">
                <h2 className="text-center">{this.state.filename}</h2>
                <br />
                <PivotTableUISmartWrapper {...this.state.pivotState} />
            </div>
            <div className="tab-pane" id="general">
                
            </div>
            <div className="tab-pane" id="products">
                <div className="col-lg-6 col-sm-6 no-padding">
                    <div className="chart-block">
                        <h2 className="chart-title"> Origins by Revenue </h2>
                        <div id="category-chart" className="chart" data-height="213"></div>
                    </div>
                    <div className="chart-block">
                        <h2 className="chart-title"> <span className="product-name"></span> Sales by Region</h2>
                        <div id="category-map-chart" className="chart" data-height="250"></div>
                    </div>
                </div>
                <div className="col-lg-6 col-sm-6 no-padding">
                    <div className="chart-block">
                        <h2 className="chart-title">Sales of <span className="category-name"></span></h2>
                        <div id="category-products-chart" className="chart" data-height="510"></div>
                    </div>
                </div>
            </div>
            <div className="tab-pane" id="sales-team">
                     <div className="col-md-6 no-padding">
                         <div className="chart-block">
                             <h2 className="chart-title">Sales Team Rating</h2>
                             <div id="sales-team-chart" data-height="500" className="chart"></div>
                         </div>
                     </div>
                     <div className="col-md-6 no-padding">
                         <div className="row">
                             <div className="col-lg-12 ">
                                 <div className="chart-block">
                                     <h2 className="chart-title">Revenue trend for <span className="person-name"></span></h2>
                                     <div id="sales-for-person" className="chart" data-height="248"></div>
                                 </div>
                             </div>
                         </div>
                         <div className="row">
                             <div className="col-sm-6">
                                 <div className="chart-block">
                                     <h2 className="chart-title">Share of total <br/><span className="person-name"></span></h2>
                                     <div id="total_share_for_person" className="chart" data-height="180"></div>
                                 </div>
                             </div>
                             <div className="col-sm-6">
                                 <div className="chart-block">
                                     <h2 className="chart-title">Win Ratio <br/> <span className="person-name"></span></h2>
                                     <div id="win_ratio_for_person" className="chart" data-height="180"></div>
                                 </div>
                             </div>
                         </div>
                     </div>
            </div>
            <div className="tab-pane" id="regions">
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
        </div>
    </div>
</div>

<div className="modal" id="aboutDashboardModal" tabindex="-1" role="dialog">
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
    );
  }
}
