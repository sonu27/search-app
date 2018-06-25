import React from 'react'
import Autocomplete from 'react-autocomplete'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      autocompleteResults: [],
      autocompleteValue: '',
    }
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
  }

  handleSelect(i) {
    this.props.onSelect(i)
  }
  
  renderAutocompleteItem(item, isHighlighted) {
    return (
      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
        {item.name}
      </div>
    )
  }

  render() {
    return (
      <Autocomplete
        getItemValue={item => item.name}
        items={this.state.autocompleteResults}
        renderItem={this.renderAutocompleteItem}
        value={this.state.autocompleteValue}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      />
    )
  }
}
