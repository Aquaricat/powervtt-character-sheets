import React, { Component }   from 'react'
import { color }              from '../data/colors'

export default class Asset extends Component {
  constructor (props) {
    super(...arguments)
  }

  render () {
    const {
      cur,
      isEditing,
      max,
      name,
      onChange,
      onRemoveLine,
      onToggleEditing,
    } = this.state

    return (
      <div className='asset'>
      </div>
    )
  }

}
