import React from 'react'
import Autocomplete from 'react-autocomplete'

class SearchOne extends React.Component {
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
    const exclude = this.state.professionsSelected.map(p => p.id)
    const response = await fetch(`http://localhost:3000/professions?name=${value}&exclude=${exclude}`)
    const professions = (await response.json()).professions
    const a = professions.map((p) => {
      return {
        id: p._source.id,
        label: p._source.name
      }
    })

    this.setState({professions: a})
  }

  async updateResults() {
    const prof = this.state.professionsSelected.map(p => p.id)
    const response = await fetch(`http://localhost:3000/users?professions=${prof}`)
    const responseJson = await response.json()
    const users = responseJson.users
    const aggs = responseJson.aggs

    this.setState({
      results: users,
      aggs: aggs
    })
  }

  selectProfession(item) {
    this.setState({
      value: '',
      professions: [],
      professionsSelected: this.state.professionsSelected.concat(item),
    }, this.updateResults)
  }

  removeProfession(id, e) {
    const professionsSelected = this.state.professionsSelected.filter((p) => p.id !== id)
    this.setState({
      professionsSelected: professionsSelected
    }, this.updateResults)
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

export default SearchOne;