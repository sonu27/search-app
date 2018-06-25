import algoliasearch from 'algoliasearch'
const searchApiUrl = process.env.REACT_APP_SEARCH_API_URL

const client = algoliasearch('ZWTZSDMEVX', '2f0ab57f6a87e5631ce4daa1c9184ddf')
const index = client.initIndex('test_amarjeet2')

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
    const data = {
      facetName: 'locationName',
      facetQuery: name
    }

    return (await index.searchForFacetValues(data)).facetHits.map(o => ({ name: o.value }))
  }

  async searchProfessions(name, exclude) {
    const professionIndex = client.initIndex('test_professions')
    const data = {
      query: name
    }

    return (await professionIndex.search(data)).hits
  }

  async searchSkills(name, exclude) {
    const data = {
      facetName: 'skills',
      facetQuery: name
    }

    return (await index.searchForFacetValues(data)).facetHits.map(o => ({ name: o.value }))
  }

  async getRelatedSkills(skills) {
    return (await this.postRequest(`${searchApiUrl}/skills/related`, { skills: skills }))
      .relatedSkills
        .filter(i => !skills.includes(i.name))
        .map(i => i.name)
  }
}
