import React from 'react'
import Autocomplete from 'react-autocomplete'
import Api from '../api'
import Pagination from '../components/Pagination'
import UserResult from '../components/UserResult'

const searchApiUrl = process.env.REACT_APP_SEARCH_API_URL

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      totalResults: 0,
      skillsAutocomplete: [],
      skillsAutocompleteValue: '',
      skillsSelected: [],
      professionsAutocomplete: [],
      professionsAutocompleteValue: '',
      professionsSelected: [],
      locationsAutocomplete: [],
      locationsAutocompleteValue: '',
      locationsSelected: [],
      levelsSelected: [],
      availabilitiesSelected: [],
      relatedSkills: [],
      currentPage: 1,
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
    const exclude = this.state.skillsSelected
    const skills = await new Api().searchSkills(value, exclude)

    this.setState({ skillsAutocompleteValue: value, skillsAutocomplete: skills })
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
        currentPage: 1,
      }, this.updateResults)
    }
  }

  removeSkill(skill) {
    this.setState({
      skillsSelected: this.state.skillsSelected.filter((i) => i !== skill),
      currentPage: 1,
    }, this.updateResults)
  }

  async updateProfessionsAutocomplete(value) {
    const exclude = this.state.professionsSelected
    const professions = await new Api().searchProfessions(value, exclude)

    this.setState({ professionsAutocompleteValue: value, professionsAutocomplete: professions })
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
        currentPage: 1,
      }, this.updateResults)
    }
  }

  removeProfession(profession) {
    this.setState({
      professionsSelected: this.state.professionsSelected.filter((i) => i !== profession),
      currentPage: 1,
    }, this.updateResults)
  }

  async updateLocationsAutocomplete(value) {
    this.setState({ locationsAutocompleteValue: value })
    const exclude = this.state.locationsSelected
    const locations = await new Api().searchLocations(value, exclude)

    const locationsAutocomplete = locations.map((i) => ({ name: i.name }))

    this.setState({ locationsAutocompleteValue: value, locationsAutocomplete: locationsAutocomplete })
  }

  selectLocation(location) {
    this.setState({
      locationsAutocompleteValue: '',
      locationsAutocomplete: [],
    }, this.addLocation(location))
  }

  addLocation(location) {
    if (!this.state.locationsSelected.includes(location)) {
      this.setState({
        locationsSelected: this.state.locationsSelected.concat(location),
        currentPage: 1,
      }, this.updateResults)
    }
  }

  removeLocation(location) {
    this.setState({
      locationsSelected: this.state.locationsSelected.filter((i) => i !== location),
      currentPage: 1,
    }, this.updateResults)
  }

  handleLevelChange(e) {
    const target = e.target
    const level = target.value
    if (target.checked) {
      this.setState({
        levelsSelected: this.state.levelsSelected.concat(level),
        currentPage: 1,
      }, this.updateResults)
    } else {
      this.setState({
        levelsSelected: this.state.levelsSelected.filter((i) => i !== level),
        currentPage: 1,
      }, this.updateResults)
    }
  }

  handleAvailabilityChange(e) {
    const target = e.target
    const availability = target.value
    if (target.checked) {
      this.setState({
        availabilitiesSelected: this.state.availabilitiesSelected.concat(availability),
        currentPage: 1,
      }, this.updateResults)
    } else {
      this.setState({
        availabilitiesSelected: this.state.availabilitiesSelected.filter((i) => i !== availability),
        currentPage: 1,
      }, this.updateResults)
    }
  }

  async updateResults() {
    const data = {
      skills: this.state.skillsSelected,
      professions: this.state.professionsSelected,
      levels: this.state.levelsSelected,
      locations: this.state.locationsSelected,
      availabilities: this.state.availabilitiesSelected,
    }
    const response = await new Api().postRequest(`${searchApiUrl}/users4?page=${this.state.currentPage}`, data)

    this.setState({
      results: response.users,
      totalResults: response.total,
    }, this.updateRelated)
  }

  async updateRelated() {
    if (this.state.skillsSelected.length === 0) {
      return
    }

    const relatedSkills = await new Api().getRelatedSkills(this.state.skillsSelected)

    this.setState({ relatedSkills: relatedSkills })
  }

  handlePageClick(e) {
    const page = parseInt(e.target.attributes.value.value, 10)

    if (page > 0) {
      this.setState({
        currentPage: page
      }, this.updateResults)

      window.scrollTo(0, 0)
    }
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

    const relatedSkills = this.state.relatedSkills.map(
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

    const locationsSelected = this.state.locationsSelected.map(
      i => {
        return (
          <div key={i}>
            <a className='ui label'>{i}<i onClick={e => this.removeLocation(i)} className='delete icon'/></a><br/>
          </div>
        )
      }
    )

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

    const allAvailabilities = ['availableForFullTime', 'availableForFreelance', 'availableForInternships']

    const availabilities = allAvailabilities.map((v, i) => {
      return (
        <div key={i}>
          <label>
            <input type='checkbox' value={v} onChange={this.handleAvailabilityChange.bind(this)}/> {v}
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

          <h4>Related Skills</h4>
          {relatedSkills}

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

          <hr/>

          <h3>Locations</h3>
          <Autocomplete
            getItemValue={item => item.name}
            items={this.state.locationsAutocomplete}
            renderItem={this.renderAutocompleteItem}
            value={this.state.locationsAutocompleteValue}
            onChange={e => this.updateLocationsAutocomplete(e.target.value)}
            onSelect={(v) => this.selectLocation(v)}
          />
          {locationsSelected}

          <hr/>

          <h3>Levels</h3>
          {levels}

          <hr/>

          <h3>Availability</h3>
          {availabilities}

        </div>

        <div className='ten wide column'>
          <Pagination
            currentPage={this.state.currentPage}
            handleClick={this.handlePageClick.bind(this)}
          />
          <h3>Results ({(this.state.currentPage * 50) - 49} - {this.state.currentPage * 50} of {this.state.totalResults})</h3>
          <div className='ui divided items'>
            {results}
          </div>
          <Pagination
            currentPage={this.state.currentPage}
            handleClick={this.handlePageClick.bind(this)}
          />
        </div>

      </div>
    )
  }
}
