import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import character from './sample'

export function withTemplateStub (Child) {
  return class TemplateStub extends Component {
    constructor () {
      super(...arguments)

      this.executeMacro = this.executeMacro.bind(this)
    }

    updateTemplate (id, attributes = {}) {
      action('updateTemplate')(id, attributes)
    }

    executeMacro (input, _as) {
      action('macro')(input)

      if (input === '!r 2d10+3') {
        return Promise.resolve({
          rolls: [{
            value: 4,
          }]
        })
      }
      if (input === '!r 1d20') {
        return Promise.resolve({
          rolls: [{
            value: 16,
          }]
        })
      }
    }

    render () {
      const attack = character.attacks[0]

      return (
        <Child
          {...attack}
          id='test_id'
          executeMacro={this.executeMacro}
          updateTemplate={this.updateTemplate}
        />
      )
    }
  }
}

export function withStub (Child) {
  return class Stub extends Component {
    constructor () {
      super(...arguments)

      this.onChange = this.onChange.bind(this)
      this.onUpdateAttribute = this.onUpdateAttribute.bind(this)
      this.runMacro = this.runMacro.bind(this)
      this.executeMacro = this.executeMacro.bind(this)

      this.state = {
        ...character,
      }
    }

    executeMacro (input, _as) {
      action('macro')(input)
    }

    onChange (e) {
      const attributes = [
        'strength',
        'dexterity',
        'constitution',
        'intelligence',
        'wisdom',
        'charisma'
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
        if (value >= 17) {
          state.proficiency_bonus = 6 
        } else if (value >= 13) {
          state.proficiency_bonus = 5 
        } else if (value >= 9) {
          state.proficiency_bonus = 4
        } else if (value >= 5) {
          state.proficiency_bonus = 3
        }
      } else if (attributes.indexOf(attr) >= 0) {
        state[`${attr}_mod`] = Math.floor((value - 10) / 2)
      } else if (attr === 'hp' && value > (this.state.hp_max || 0)) {
        state.hp = this.state.hp_max
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
          executeMacro={this.executeMacro}
          onUpdateAttribute={this.onUpdateAttribute}
          onChange={this.onChange}
        />
      )
    }
  }
}
