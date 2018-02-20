import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import character from 'sample'

export default function withStub (Child) {
  return class Stub extends Component {
    constructor () {
      super(...arguments)

      this.onChange = this.onChange.bind(this)
      this.onUpdateAttribute = this.onUpdateAttribute.bind(this)
      this.runMacro = this.runMacro.bind(this)

      this.state = {
        ...character,
      }
    }

    onChange (e) {
      const attributes = [
        'strength',
        'dexterity',
        'constitution',
        'intelligence',
        'wisdom',
        'charisma',
      ]

      const attr = e.target.name
      let value = e.target.value

      if (e.target.type === 'checkbox') {
        value = e.target.checked
      }

      // the new state to set
      const state = {
        [attr]: value,
      }

      if (attr === 'level') {
        // Proficiency is 7 + level, divided by 4 & rounded down.
        state.pb = Math.floor( (7 + attr) / 4 )
      } else if (attr === 'hp') {
        // Limit current HP to maximum HP.
        state.hp = value < this.state.hp_max ? ( value || 0 ) : this.state.hp_max
      }

      this.setState(state)

      action('change')(attr, value)
    }

    onUpdateAttribute (key, value) {
      this.setState({
        [key]: value,
      })

      action('update')(key, value)
    }

    runMacro (e) {
      const macro = e.target.getAttribute('data-macro')
      if (macro) {
        action('macro')(macro)
      } else {
        // Check parent?
        const parentMacro = e.target.parentNode.getAttribute('data-macro')
        if (parentMacro) {
          action('macro')(parentMacro)
        }
      }
    }

    render () {
      return (
        <Child
          character={this.state}
          runMacro={this.runMacro}
          onUpdateAttribute={this.onUpdateAttribute}
          onChange={this.onChange}
        />
      )
    }
  }
}
