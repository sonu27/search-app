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

export default ({user}) => (
  <div className='item'>
    <a className='ui tiny image'><img src='https://semantic-ui.com/images/avatar/large/jenny.jpg'/></a>
    <div className='content'>
      <a className='header' href={`https://the-dots.com/users/${user.id}`}>{user.firstName} {user.lastName}</a> - ({user.score})
      <div className='description'>
        <p>Level: {getLevelName(user.level)}</p>
        <p>Professions: {user.professions.join(', ')}</p>
        <p>Skills: {user.skills.join(', ')}</p>
      </div>
    </div>
  </div>
)
