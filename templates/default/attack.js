import React, { Component } from 'react'

export default class AttackTemplate extends Component {
  render () {
    return (
      <div>
        <h1>From chat template</h1>
        {JSON.stringify(this.props.data)}
      </div>
    )
  }
}
