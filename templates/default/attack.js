import React, { Component } from 'react'

export default class AttackTemplate extends Component {
  constructor () {
    super(...arguments)

    this._testMacro = this._testMacro.bind(this)
  }

  _testMacro () {
    this.props.executeMacro('!r 1d20 [Woo hoo]')
  }

  render () {
    return (
      <div>
        <h1>From chat template</h1>
        {JSON.stringify(this.props.data)}
        <a onClick={this._testMacro}>Test Macro</a>
      </div>
    )
  }
}
