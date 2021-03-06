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

const getProfileImageUrl = (user) => {
  if (user.profileImage === 'null') {
    return 'https://semantic-ui.com/images/avatar/large/jenny.jpg'
  } else {
    return user.profileImage
  }
}

export default ({user}) => (
  <div className='item'>
    <a className='ui tiny image'><img src={getProfileImageUrl(user)} alt=''/></a>
    <div className='content'>
      <a className='header' href={`https://the-dots.com/users/${user.id}`}>{user.name}</a> - SS: {user.searchScore}
      <div className='meta'>
        <span>{user.tagline}</span>
      </div>
      <div className='description'>
        <p>Level: {getLevelName(user.level)}</p>
        <p>Professions: {user.professions.join(', ')}</p>
        <p>Skills: {user.skills.join(', ')}</p>
      </div>
      <div className='extra'>{user.locationName}</div>
    </div>
  </div>
)
