import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown as SemanticDropdown, Flag as SemanticFlag } from 'semantic-ui-react'

import './PhoneCountrySelector.css'
import countries from '../../../Helpers/countries.json'

const getCountriesOptions = () => {
  return Object.keys(countries).map(countryCode => {
    return {
      key: countryCode,
      text: (
        <div>
          <SemanticFlag name={countryCode.toLowerCase()} />
          {countries[countryCode].countryName}
        </div>
      ),
      value: countryCode,
    }
  })
}
const countriesOptions = getCountriesOptions()

export default class PhoneCountrySelector extends Component {
  static propTypes = {
    /** Value for the input */
    value: PropTypes.string,
    /** Function to call when the input value changes */
    onChange: PropTypes.func.isRequired,
    /** ClassName for the selected item */
    className: PropTypes.string,
  }
  static defaultProps = {
    className: '',
    value: 'US',
  }

  handleOnChange = (e, data) => {
    this.props.onChange(data.value)
  }

  render() {
    const { onChange, value, className, ...rest } = this.props

    const testid = rest['data-testid'] ? rest['data-testid'] : ''

    return (
      <SemanticDropdown
        data-testid={testid}
        value={value}
        onChange={this.handleOnChange}
        trigger={
          <div className="phonecountryselector--trigger">
            <SemanticFlag name={value.toLowerCase()} />
            <div>{`${countries[value].countryPhoneCode ? '+' + countries[value].countryPhoneCode : ''}`}</div>
          </div>
        }
        className={`phonecountryselector--selected ${className}`.trim()}
        {...rest}>
        <SemanticDropdown.Menu>
          <SemanticDropdown.Menu scrolling>
            {countriesOptions.map(option => (
              <SemanticDropdown.Item
                active={value === option.value}
                selected={value === option.value}
                key={option.value}
                {...option}
                onClick={this.handleOnChange}
              />
            ))}
          </SemanticDropdown.Menu>
        </SemanticDropdown.Menu>
      </SemanticDropdown>
    )
  }
}
