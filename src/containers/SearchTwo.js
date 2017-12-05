import React from 'react'
import Autocomplete from 'react-autocomplete'

class SearchTwo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      professions: [],
      professionsSelected: [],
      results: [],
      aggs: [],
    }
  }

  async componentDidMount() {
  }

  async updateNow(value) {
    this.setState({value: value})
    const response = await fetch(`http://localhost:3000/users2?query=${value}`)
    const responseJson = await response.json()
    const users = responseJson.users

    this.setState({
      results: users,
      // aggs: aggs
    })
  }

  async updateResults() {
    
  }

  selectProfession(item) {
    
  }

  removeProfession(id, e) {
    
  }
  
  render() {
    const professionsSelected = this.state.professionsSelected.map(
      (i) => {
        return (
          <a key={i.id} className='ui label'>{i.label}<i key={i.id} onClick={e => this.removeProfession(i.id, e)} className='delete icon'/></a>
        )
      }
    )

    const results = this.state.results.map(
      (u) => {
        return (
          <p>
            <b>{u.firstName} {u.lastName}</b> - ({u.score})<br/>
            {u.professions.join(', ')}<br/>
          </p>
        )
      }
    )

    const aggs = this.state.aggs.map(
      agg => {
        return (
          <p>{agg}</p>
        )
      }
    )

    return (
      <div className="App ui grid container">
        <div className='four wide column'>
          <h1>Search Users</h1>
        
          <Autocomplete
            getItemValue={(item) => item.label}
            items={this.state.professions}
            renderItem={(item, isHighlighted) =>
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
              </div>
            }
            value={this.state.value}
            onChange={e => this.updateNow(e.target.value)}
            onSelect={(v, item) => this.selectProfession(item)}
          />

          <div>{professionsSelected}</div>

          <div>{aggs}</div>
        </div>

        <div className='eight wide column'>
          <h3>Results</h3>
          {results}
        </div>
        
      </div>
    );
  }
}

export default SearchTwo;
