import React from 'react'

const getLevelName = id => {
  switch(id) {
    case 1:
      return 'Junior'
    case 2:
      return 'Mid-level'
    case 3:
      return 'Senior'
    default:
      return ''
  }
}

const getProfileImageUrl = (hit) => {
  if (hit.profileImage === 'null') {
    return 'https://semantic-ui.com/images/avatar/large/jenny.jpg'
  } else {
    return hit.profileImage
  }
}

export default ({hit}) => (
  <div className='item'>
    <a className='ui tiny image'><img src={getProfileImageUrl(hit)} alt=''/></a>
    <div className='content'>
      <a className='header' href={`https://the-dots.com/users/${hit.id}`}>{hit.name}</a>  - SS: {hit.searchScore}
      <div className='meta'>
        <span>{hit.tagline}</span>
      </div>
      <div className='description'>
        <p>Level: {getLevelName(hit.level)}</p>
        <p>Professions: {hit.professions.join(', ')}</p>
        <p>Skills: {hit.skills.join(', ')}</p>
      </div>
      <div className='extra'>{hit.locationName}</div>
    </div>
  </div>
)
