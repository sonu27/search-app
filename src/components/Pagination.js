import React from 'react'

//total number of pages
//total pages to show
//margins on each side
//current page

export default ({currentPage, handleClick}) => (
  <div className='ui pagination menu'>
    <a className='item' value={currentPage-1} onClick={handleClick.bind(this)}>Prev</a>
    <a className='item' value={currentPage+1} onClick={handleClick.bind(this)}>Next</a>
  </div>
)

// export default class extends React.Component {
//   render() {
//     return (
//       <div className='ui pagination menu'>
//         <a className='item' value={this.props.currentPage-1} onClick={this.props.handleClick.bind(this)}>Prev</a>
//         <a className='item' value={this.props.currentPage+1} onClick={this.props.handleClick.bind(this)}>Next</a>
//       </div>
//     )
//   }
// }
