import fetch from 'isomorphic-fetch'

export const REQUEST_CENSUSDATA = 'REQUEST_CENSUSDATA'
export const RECEIVE_CENSUSDATA = 'RECEIVE_CENSUSDATA'
export const VIZ_CLICK = 'VIZ_CLICK'
export const CLEAR_SELECTIONS = 'CLEAR_SELECTIONS'
export const CHANGE_DATALABEL = 'CHANGE_DATALABEL'

export const vizClick = (message, highlightStates) => {
  return {
    type: VIZ_CLICK,
    message,
    highlightStates
  }
}

export const changeDropDown = (group, option) => {
  return{
    type: CHANGE_DATALABEL,
    group,
    option
  }
}

export const clearSelections = ()=>{
  return {
    type: CLEAR_SELECTIONS
  }
}


function receiveData(group, data) {
  return {
    type: RECEIVE_CENSUSDATA,
    group,
    data: data.filter((s)=>{
      if(s["state"]!=="Puerto Rico") return true;
      return false;
    })
  }
}


export function fetchCensusData(datagroup, apisettings) {
  return (dispatch) => {
    return fetch(buildURL(apisettings))
      .then(response => response.json())
      .then(json => {
        const data =  csvtojson(json).map(d=>apisettings.processor(d));
        return dispatch(receiveData(datagroup, data))})
  }
}




//THIS
function buildURL(settings) {
  let url = settings["url"];

  for (var set in settings) {
    if (settings[set] == null) return null;
    if (Array.isArray(settings[set])) {
      for (var subset in settings[set]) {
        url += "&" + set + "%5B%5D=" + settings[set][subset];
      }
    }
    else {
      if (set !== "url" && set !== "processor" && set!=="label") {
        url += "&" + set + "=" + settings[set];
      }
    }
  }
  return url;
}

function csvtojson(csv) {
  var ob = {}
  var finalset = []
  var cols = []
  //get objet structure from first row
  for (var p in csv[0]) {
    cols.push(csv[0][p])
  }

  csv.splice(0, 1)

  for (var r in csv) {
    for (var c = 0; c < cols.length; c++) {
      ob[cols[c]] = csv[r][c]
    }
    finalset.push(ob)
    ob = {}
  }

  return finalset
}