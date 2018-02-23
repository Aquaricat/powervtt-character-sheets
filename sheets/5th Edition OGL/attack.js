import React, { Component } from 'react'

import { color } from '../styles'

export default class Attack extends Component {
  constructor (props) {
    super(...arguments)

    this.onChange = this.onChange.bind(this)
    this.onToggleEditing = this.onToggleEditing.bind(this)

    // Base attack template
    const attack = {
      base: props.base || '1d20',
      proficiency: props.proficiency !== undefined ? props.proficiency : false,
      crit_range: props.crit_range || {
        success: 20,
        fail: 1,
      },
      type: props.type || 'melee',
      range: {
        normal: 30,
        far: 30,
      }
    }

    const damage = props.damage [{
      base: '2d20 + 4',
      effect: {
        failure: '',
        success: '',
      },
      modifier: {
        mod: 3,
        stat: 'Dexterity',
      },
      type: '',
    }]

    this.state = {
      name: props.name || '',
      attack,
      damage,
      isEditing: false,
    }
  }

  onChange () {
  }

  onClick () {
    const {
      character: {
        key,
      },
    } = this.props

    const {
      attack,
      name,
    } = this.state

    if (!this.isEditing) {
      this.props.executeMacro(`!template attack ${JSON.stringify({ name, attack })}`, key)
    }
  }

  onToggleEditing () {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  render () {
    const {
      index,
      id,
      name,
      attribute,
      mod,
    } = this.props

    return (
      <tr onClick={this.onClick}>
        <td>
          <input
            type='text'
            placeholder='Name'
            name='name'
            onChange={this.onChange}
            defaultValue={attack.name}
            style={{ minWidth: 198 }}
          />

        </td>
        <td>
        </td>
        <style jsx>{`
        `}</style>
      </tr>
    )
  }
}
