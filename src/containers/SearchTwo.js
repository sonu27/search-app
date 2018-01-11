import React from 'react'
import Autocomplete from 'react-autocomplete'
import UserResult from '../components/UserResult'

const searchApiUrl = process.env.REACT_APP_SEARCH_API_URL

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      professions: [],
      professionsSelected: [],
      results: [],
      aggs: [],
      related: [],
    }
  }

  async componentDidMount() {
  }

  async updateNow(value) {
    this.setState({value: value}, this.updateResults)
  }

  async updateResults() {
    const value = this.state.value
    const prof = this.state.professionsSelected.map(p => p.id)
    const response = await fetch(`${searchApiUrl}/users2?query=${value}&professions=${prof}`)
    const responseJson = await response.json()

    this.setState({
      results: responseJson.users,
      aggs: responseJson.aggs,
      related: responseJson.related,
    })
  }

  selectProfession(item) {

  }

  addProfession(id) {
    const professionsSelected = this.state.professionsSelected
    this.setState({
      professionsSelected: professionsSelected.concat([id]),
      value: '',
    }, this.updateResults)
  }

  removeProfession(id) {
    const professionsSelected = this.state.professionsSelected.filter((p) => p.id !== id)
    this.setState({
      professionsSelected: professionsSelected
    }, this.updateResults)
  }

  render() {
    const professionsSelected = this.state.professionsSelected.map(
      (i) => {
        return (
          <a key={i.id} className='ui label'>{i.label}<i key={i.id} onClick={e => this.removeProfession(i.id)} className='delete icon'/></a>
        )
      }
    )

    const results = this.state.results.map(user => <UserResult user={user} />)

    const aggs = this.state.aggs.map(
      agg => {
        const i = { id: agg[0], label: agg[1]}
        return (
          <div><a key={i.id} className='ui label'><i key={i.id} onClick={e => this.addProfession(i)} className='add icon'/>{i.label}</a></div>
        )
      }
    )

    const related = this.state.related.map(
      prof => {
        const i = { id: prof.id, label: prof.name}
        return (
          <div><a key={i.id} className='ui label'><i key={i.id} onClick={e => this.addProfession(i)} className='add icon'/>{i.label}</a></div>
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

          <p>{professionsSelected}</p>

          <p>Filter professions</p>
          <div>{aggs}</div>

          <p>Related professions</p>
          <div>{related}</div>
        </div>

        <div className='ten wide column'>
          <p>With this search you can free-text search professions, select a profession and it shows related professions.</p>
          <h3>Results</h3>
          <div className='ui divided items'>
            {results}
          </div>
        </div>

      </div>
    )
  }
}
