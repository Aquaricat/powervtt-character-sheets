import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import character from './sample'

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
        if (value >= 17) {
          state.proficiency_bonus = 6 
        } else if (value >= 13) {
          state.proficiency_bonus = 5 
        } else if (value >= 9) {
          state.proficiency_bonus = 4
        } else if (value >= 7) {
          state.proficiency_bonus = 3
        }
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
        // Check the parent?
        const parentMacro = e.target.parentNode.getAttribute('data-macro');
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
