import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class Dropdown extends Component {

  render() {
    const { optionSet, onChange, selectedItem } = this.props
    const MainSelect = styled.select`
      font-size: 1.1em;
      margin-bottom: 1em;
      `;

    return (
      
        <MainSelect onChange={e => { onChange(parseInt(e.target.value, 10))}} value={selectedItem}  >
          {optionSet.map((o,i) => (
            <option value={i} key={i} >
              {o.label}
            </option>
          ))}
        </MainSelect>
      
    )
  }
}
 
Dropdown.propTypes = {
    optionSet: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    selectedItem: PropTypes.number.isRequired
  }
