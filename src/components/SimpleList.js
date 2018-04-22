import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
//var Loader = require('halogen/PulseLoader')

export default class SimpleList extends Component {

  render() {
    const { renderData, columnList, uxCallback, dataTag } = this.props

    var onStateClick = function(e, tag, dat){
      //e.preventDefault()
      console.log("click! ", tag, dat)
      uxCallback(tag, dat)
    }

    let sorteddata = renderData.sort((a,b)=>{
      //console.log(a,b);
      if(a["value"]<b["value"]){
        return 1
      }

      return -1

    })

    return (
      <div className={"col-sm-10 simple-list"}>
      {(!renderData) &&
        <div className="loading">Loading&#8230;</div>
      }

      <table>
      <tbody>
      <tr>
      {columnList &&
        columnList.map((v,i)=>{
          return (<th column={i}>{v}</th>)
        })
      }
      </tr>

      {(renderData) &&
        renderData.map((v,i)=>{
          return(<tr key={i}>
            {columnList.map((a,b)=>{return (<td onClick={()=>{return onStateClick(this, dataTag, v)}}  >{v[a]}</td>)})}
            </tr>)
          })
        }

        </tbody>
        </table>
        </div>
      )
    }
  }

  SimpleList.propTypes = {
    renderData: PropTypes.array.isRequired,
    columnList: PropTypes.array.isRequired,
    uxCallback: PropTypes.func.isRequired,
    dataTag: PropTypes.string.isRequired
  }
