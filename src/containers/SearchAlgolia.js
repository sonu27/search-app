import React from 'react'
import Autocomplete from 'react-autocomplete'
import Api from '../api'
import Algolia from '../apiAlgolia'
import AlgUserResult from '../components/AlgUserResult'
import {InstantSearch, Hits, RefinementList, Pagination, CurrentRefinements, ClearRefinements} from 'react-instantsearch/dom';

const searchApiUrl = process.env.REACT_APP_SEARCH_API_URL

const Search = () => {
  return (
    <div className="container">
      <Hits hitComponent={AlgUserResult} />
    </div>
  )
}

export default () =>
  <InstantSearch
    appId="ZWTZSDMEVX"
    apiKey="2f0ab57f6a87e5631ce4daa1c9184ddf"
    indexName="test_amarjeet2"
  >
    <div className="App ui grid container">
      <div className='four wide column'>
        <h1>Search Users</h1>
        <CurrentRefinements/>
        <ClearRefinements/>
        <h3>Professions</h3>
        <RefinementList attribute="professions"/>
        <h3>Skills</h3>
        <RefinementList attribute="skills"/>
      </div>
      <div className='ten wide column'>

        <Search/>
        <Pagination />
      </div>
    </div>
  </InstantSearch>
