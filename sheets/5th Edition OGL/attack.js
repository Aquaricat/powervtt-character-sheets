import React, { Component, Fragment } from 'react'

import { attributes } from './data'
import { color } from '../styles'

// Attack template
const BASE_ATTACK = {
  base: '1d20',
  proficiency: false,
  crit_range: {
    success: 20,
    fail: 1,
  },
  type: 'melee',
  range: {
    normal: '30 ft',
    far: '',
  }
}

// Damage template
const BASE_DAMAGE = {
  base: '1d8',
  effect: {
    failure: '',
    success: '',
  },
  modifier: {
    mod: 0,
    stat: 'Dexterity',
  },
  type: '',
}

export default class Attack extends Component {
  constructor (props) {
    super(...arguments)

    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onToggleEditing = this.onToggleEditing.bind(this)

    const attack = props.attack

    this.state = {
      name: attack.name || '',
      description: attack.description || '',
      attack: attack.attack || BASE_ATTACK,
      damage: attack.damage || [ BASE_DAMAGE ],
      isEditing: false,
    }
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
      description,
      damage,
      isEditing,
    } = this.state

    if (!isEditing) {
      this.props.executeMacro(
        `!template attack ${JSON.stringify({ name, description, attack, damage })}`,
        key
      )
    }
  }

  onChange (e) {
  }

  onSubmit (e) {
    e.preventDefault()
  }

  onToggleEditing () {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  render () {
    const {
      attack,
      name,
      isEditing,
      description,
    } = this.state

    const {
      index,
    } = this.props

    return (
      <div className='attack'>
        {!isEditing && (
          <Fragment>
            <span className='name' onClick={this.onClick}>{name}</span>
            <a onClick={this.onToggleEditing} className='edit'>Edit</a>
          </Fragment>
        )}

        {isEditing && (
        <form onSubmit={this.onSubmit}>
          <div className='input-row'>
            <label>
              Name

              <input
                type='text'
                ref='name'
                value={name}
                onChange={this.onChange}
                placeholder='My Attack'
              />
            </label>
          </div>

          <div className='input-row'>
            <label>
              Description

              <textarea
                ref='description'
                value={description}
                onChange={this.onChange}
              />
            </label>
          </div>

          <div className='input-row inline'>
            <label>
              Roll

              <input
                type='text'
                ref='base'
                value={attack.base}
                onChange={this.onChange}
                placeholder='1d20'
              />
            </label>
            <label>
              Type

              <input
                type='text'
                ref='type'
                value={attack.type}
                onChange={this.onChange}
                placeholder='Melee'
              />
            </label>
            <label>
              Proficient

              <input
                type='checkbox'
                ref='proficient'
                onChange={this.onChange}
                checked={attack.proficient}
              />
            </label>
          </div>

          <div className='actions'>
            <a onClick={this.onSave}>Save</a>
            <a className='delete' onClick={this.onDelete}>Delete</a>
          </div>
        </form>
        )}

        <style jsx>{`
          .attack {
            transition: background 0.15s ease-out;
            display: flex;
            justify-content: space-between;
            color: ${color.grey[50]};
            font-size: 13px;
          }

          .name {
            flex: 1;
          }

          .attack:hover {
            background-color: ${color.grey[700]};
            color: ${color.yellow[500]};
            cursor: pointer;
          }

          a {
            color: ${color.grey[50]};
          }

          a:hover {
            color: ${color.yellow[500]};
            cursor: pointer;
          }

          .inline {
            width: 100%;
            display: flex;
          }

          form {
            background-color: ${color.grey[800]};
            width: 100%;
          }

          label {
            color: ${color.grey[400]};
            font-size: 14px;
            flex: 1;
            padding: 3px;
            flex-direction: column;
            display: flex;
          }

          input, select, textarea {
            display: block;
            background-color: ${color.grey[900]};
            border: 0;
            border-radius: 3px;
            padding: 6px;
            color: ${color.grey[50]};
            margin-top: 3px;
          }

          .actions {
            margin-top: 3px;
          }
          .actions a {
            color: ${color.yellow[500]};
            transition: opacity 0.15s ease-out;
            font-size: 14px;
            padding: 6px;
          }

          .actions a:hover {
           cursor: pointer;
           opacity: 0.7;
          }

          .actions .delete {
            color: ${color.grey[500]};
            font-size: 12px;
          }

          .actions .delete:hover {
            color: ${color.error};
          }
        `}</style>
      </div>
    )
  }
}
