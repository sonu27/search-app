
const searchApiUrl = process.env.REACT_APP_SEARCH_API_URL

export default class {
  async postRequest(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return await response.json();
  }

  async searchLocations(name, exclude) {
    return (await this.postRequest(`${searchApiUrl}/locations`, { name: name, exclude: exclude })).locations
  }

  async searchProfessions(name, exclude) {
    return (await this.postRequest(`${searchApiUrl}/professions`, { name: name, exclude: exclude })).professions
  }

  async searchSkills(name, exclude) {
    return (await this.postRequest(`${searchApiUrl}/skills`, { name: name, exclude: exclude })).skills
  }

  async getRelatedSkills(skills) {
    return (await this.postRequest(`${searchApiUrl}/skills/related`, { skills: skills }))
      .relatedSkills
        .filter(i => !skills.includes(i.name))
        .map(i => i.name)
  }
}
