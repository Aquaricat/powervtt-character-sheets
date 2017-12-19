import React, { Component } from 'react'
import { color } from '../styles'

export default class Attribute extends Component {
  constructor (props) {
    super(...arguments)

    this._updateState = this._updateState.bind(this)

    this._updateState(props)

    const {
      attribute,
      character,
      code,
      isSave,
      score,
    } = props

    const isProficient = character[`${code}_prof`] || false
    const save = isSave ? ' Save' : ''
    this.state = {
      macro: isProficient 
        ? `!r 1d20+@me.${code}+@me.proficiency_bonus "${attribute}${save} (+${character.proficiency_bonus || 0} Proficient)"`
        : `!r 1d20+@me.${code} "${attribute}${save}"`,
      score: isProficient
        ? score + character.proficiency_bonus
        : score
    }
  }

  componentWillReceiveProps (props) {
    this._updateState(props)
  }

  _updateState (props, isConstruct = false) {
    const {
      attribute,
      character,
      code,
      isSave,
      roll1d20,
      score,
    } = props

    const isProficient = character[`${code}_prof`] || false
    const save = isSave ? ' Save' : ''
    const state = {
      macro: isProficient 
        ? `!r 1d20+@me.${code}+@me.proficiency_bonus "${attribute}${save} (+${character.proficiency_bonus || 0} Proficient)"`
        : `!r 1d20+@me.${code} "${attribute}${save}"`,
      score: isProficient
        ? score + character.proficiency_bonus
        : score 
    }

    if (!isConstruct) {
      this.setState(state)
    } else {
      this.state = state
    }
  }

  render () {
    const {
      attribute,
      character,
      code,
      onChange,
      runMacro,
      roll1d20,
      type,
    } = this.props

    return (
      <div className='attr'>
        <input
          type='checkbox'
          onChange={onChange}
          name={`${code}_prof`}
          defaultChecked={character[`${code}_prof`] === true}
        />
        <label
          onClick={runMacro}
          data-macro={this.state.macro}
          data-as={character.key}
        >
          <strong>{this.state.score >= 0 && '+'}{this.state.score}</strong> {attribute} {type && (<span className='skill-type'>({type.slice(0, 3)})</span>)}
        </label>
        <style jsx>{`
          .attr {
            transition: color 0.15s ease-out;
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-bottom: 2px;
            color: ${color.grey[500]};
            font-size: 13px;
          }

          .attr:hover {
            color: ${color.yellow[500]};
          }

          .attr span {
            color: ${color.grey[600]};
            font-size: 12px;
            transition: color 0.15s ease-out;
          }

          .attr input {
            text-align: center;
            border-bottom: 0;
          }
        `}</style>
      </div>
    )
  }
}
