import React from 'react'
import Autocomplete from 'react-autocomplete'
import UserResult from '../components/UserResult'

export default class SearchThree extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      skillsAutocomplete: [],
      skillsAutocompleteValue: '',
      skillsSelected: [],
      professionsAutocomplete: [],
      professionsAutocompleteValue: '',
      professionsSelected: [],
      levelsSelected: [],
      aggregations: {
        skills: [],
        professions: [],
        locations: [],
      },
    }
  }

  componentDidMount() {
    this.updateResults()
  }

  renderAutocompleteItem(item, isHighlighted) {
    return (
      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
        {item.name}
      </div>
    )
  }

  async updateSkillsAutocomplete(value) {
    this.setState({skillsAutocompleteValue: value})
    const exclude = this.state.skillsSelected.join()
    const response = await fetch(`http://localhost:3000/skills?name=${value}&exclude=${exclude}`)
    const skills = (await response.json()).skills
    
    const skillsAutocomplete = skills.map((i) => {
      return {
        id: i._source.id,
        name: i._source.name
      }
    })

    this.setState({skillsAutocomplete: skillsAutocomplete})
  }

  selectSkill(skill) {
    this.setState({
      skillsAutocompleteValue: '',
      skillsAutocomplete: [],
    }, this.addSkill(skill))
  }

  addSkill(skill) {
    if (!this.state.skillsSelected.includes(skill)) {
      this.setState({
        skillsSelected: this.state.skillsSelected.concat(skill),
      }, this.updateResults)
    }
  }

  removeSkill(skill) {
    this.setState({
      skillsSelected: this.state.skillsSelected.filter((i) => i !== skill)
    }, this.updateResults)
  }

  async updateProfessionsAutocomplete(value) {
    this.setState({professionsAutocompleteValue: value})
    const exclude = this.state.professionsSelected.join()
    const response = await fetch(`http://localhost:3000/professions?name=${value}&exclude=${exclude}`)
    const professions = (await response.json()).professions
    
    const professionsAutocomplete = professions.map((i) => {
      return {
        id: i._source.id,
        name: i._source.name
      }
    })

    this.setState({professionsAutocomplete: professionsAutocomplete})
  }

  selectProfession(profession) {
    this.setState({
      professionsAutocompleteValue: '',
      professionsAutocomplete: [],
    }, this.addProfession(profession))
  }

  addProfession(profession) {
    if (!this.state.professionsSelected.includes(profession)) {
      this.setState({
        professionsSelected: this.state.professionsSelected.concat(profession),
      }, this.updateResults)
    }
  }

  removeProfession(profession) {
    this.setState({
      professionsSelected: this.state.professionsSelected.filter((i) => i !== profession)
    }, this.updateResults)
  }

  handleLevelChange(e) {
    const target = e.target
    const level = target.value
    if (target.checked) {
      this.setState({
        levelsSelected: this.state.levelsSelected.concat(level),
      }, this.updateResults)
    } else {
      this.setState({
        levelsSelected: this.state.levelsSelected.filter((i) => i !== level)
      }, this.updateResults)
    }
  }

  async updateResults() {
    const data = {
      skills: this.state.skillsSelected,
      professions: this.state.professionsSelected,
      levels: this.state.levelsSelected,
    }
    const response = await fetch(`http://localhost:3000/users3`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const responseJson = await response.json()
    const users = responseJson.users
    const aggregations = responseJson.aggregations

    this.setState({
      results: users,
      aggregations: aggregations
    })
  }

  render() {
    const skillsSelected = this.state.skillsSelected.map(
      i => {
        return (
          <div key={i}>
            <a className='ui label'>{i}<i onClick={e => this.removeSkill(i)} className='delete icon'/></a><br/>
          </div>
        )
      }
    )

    const skillsAgg = this.state.aggregations.skills.map(
      i => {
        return (
          <div key={i}>
            <a className='ui label'><i onClick={e => this.addSkill(i)} className='add icon'/>{i}</a>
          </div>
        )
      }
    )

    const professionsSelected = this.state.professionsSelected.map(
      i => {
        return (
          <div key={i}>
            <a className='ui label'>{i}<i onClick={e => this.removeProfession(i)} className='delete icon'/></a><br/>
          </div>
        )
      }
    )

    const professionsAgg = this.state.aggregations.professions.map(
      i => {
        return (
          <div key={i}>
            <a className='ui label'><i onClick={e => this.addProfession(i)} className='add icon'/>{i}</a>
          </div>
        )
      }
    )

    // const locationsAgg = this.state.aggregations.locations.map(
    //   i => {
    //     return (
    //       <div key={i}>
    //         <a className='ui label'><i onClick={e => this.addProfession(i)} className='add icon'/>{i}</a>
    //       </div>
    //     )
    //   }
    // )

    const allLevels = ['Unknown', 'Junior', 'Mid-level', 'Senior']

    const levels = allLevels.map((v, i) => {
      return (
        <div key={i}>
          <label>
            <input type='checkbox' value={i} onChange={this.handleLevelChange.bind(this)}/> {v}
          </label>
        </div>
      )
    })

    const results = this.state.results.map((user, i) => <UserResult key={i} user={user} />)

    return (
      <div className="App ui grid container">
        <div className='four wide column'>
          <h1>Search Users</h1>
        
          <h3>Skills</h3>
          <Autocomplete
            getItemValue={item => item.name}
            items={this.state.skillsAutocomplete}
            renderItem={this.renderAutocompleteItem}
            value={this.state.skillsAutocompleteValue}
            onChange={e => this.updateSkillsAutocomplete(e.target.value)}
            onSelect={(v) => this.selectSkill(v)}
          />
          {skillsSelected}
          {skillsAgg}

          <hr/>

          <h3>Professions</h3>
          <Autocomplete
            getItemValue={item => item.name}
            items={this.state.professionsAutocomplete}
            renderItem={this.renderAutocompleteItem}
            value={this.state.professionsAutocompleteValue}
            onChange={e => this.updateProfessionsAutocomplete(e.target.value)}
            onSelect={(v) => this.selectProfession(v)}
          />
          {professionsSelected}
          {professionsAgg}

          <hr/>

          <h3>Levels</h3>
          {levels}
        </div>

        <div className='ten wide column'>
          <h3>Results</h3>
          <div className='ui divided items'>
            {results}
          </div>
        </div>
        
      </div>
    )
  }
}
