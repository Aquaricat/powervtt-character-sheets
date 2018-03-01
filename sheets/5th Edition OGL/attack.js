import React, { Component, Fragment } from 'react'
import { set } from 'lodash'

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
  type: 'slashing',
}

export default class Attack extends Component {
  constructor (props) {
    super(...arguments)

    this.onAddDamage = this.onAddDamage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeDamage = this.onChangeDamage.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onRemoveDamage = this.onRemoveDamage.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onToggleEditing = this.onToggleEditing.bind(this)

    const attack = props.attack

    this.state = {
      name: attack.name || '',
      description: attack.description || '',
      attack: attack.attack !== undefined ? attack.attack : BASE_ATTACK,
      damage: attack.damage !== undefined ? attack.damage : [],
      isEditing: props.isEditing || false,
      hasAttack: attack.has_attack !== undefined ? attack.has_attack : true,
    }
  }

  onClick () {
    const {
      character,
    } = this.props

    const {
      attack,
      name,
      description,
      hasAttack,
      isEditing,
    } = this.state

    if (!isEditing) {
      // Before running, make sure we lookup the right modifier
      const damage = this.state.damage.map((dmg) => ({
        ...dmg,
        modifier: {
          ...dmg.modifier,
          mod: character[`${dmg.modifier.stat.toLowerCase()}_mod`]
           ? character[`${dmg.modifier.stat.toLowerCase()}_mod`] || 0
           : dmg.modifier.mod || 0,
        }
      }))

      const output = {
        name,
        description,
        attack: hasAttack ? attack : false,
        damage,
      }
      this.props.executeMacro(
        `!template attack ${JSON.stringify(output)}`,
        character.key
      )
    }
  }

  onChange () {
    const { value: name } = this.refs.name
    const { value: description } = this.refs.description
    const { value: base } = this.refs.base
    const { value: type } = this.refs.type
    const { checked: proficient } = this.refs.proficient
    const { checked: hasAttack } = this.refs.hasAttack

    this.setState({
      name,
      description,
      hasAttack,
      attack: {
        ...this.state.attack,
        base,
        type,
        proficient,
      },
    })
  }

  onChangeDamage (e) {
    const { character } = this.props

    const index = ~~e.target.getAttribute('data-index')
    const { name, value } = e.target

    const path = name.replace('damage.', '')
    const damage = this.state.damage
    set(damage, path, value)

    this.setState({
      damage,
    })
  }

  onSubmit (e) {
    e.preventDefault()

    const {
      attack,
      damage,
      name,
      description,
      hasAttack,
    } = this.state

    this.props.onSubmit(this.props.index, {
      attack: hasAttack ? attack : null,
      damage,
      name,
      description,
      has_attack: hasAttack,
    })

    this.setState({
      isEditing: false,
    })
  }

  onToggleEditing (e) {
    e.preventDefault()
    e.stopPropagation()

    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  onAddDamage () {
    this.setState({
      damage: [ ...this.state.damage, BASE_DAMAGE ],
    })
  }

  onRemoveDamage (e) {
    const index = ~~e.target.getAttribute('data-index')

    this.setState({
      damage: this.state.damage.filter((_, i) => (i !== index)),
    })
  }

  render () {
    const {
      attack,
      damage,
      name,
      hasAttack,
      isEditing,
      description,
    } = this.state

    const {
      index,
      onDelete,
      isLegendaryAction,
      isNPC,
    } = this.props

    return (
      <div className='attack'>
        {!isEditing && !isNPC && (
          <Fragment>
            <span onClick={this.onClick} className='name'>{name}</span>
            <a onClick={this.onToggleEditing} className='edit'>Edit</a>
          </Fragment>
        )}

        {!isEditing && isNPC && (
          <div>
            <span className='name npc'>{name}</span>
            <span className='description'>{description}</span>
            <a onClick={this.onToggleEditing} className='edit'>Edit</a>
          </div>
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

          <h2>
            <input
              type='checkbox'
              ref='hasAttack'
              onChange={this.onChange}
              checked={hasAttack}
              className='inline'
            />

            Attack
          </h2>

          <div className={`input-row flex ${!hasAttack && 'hidden'}`}>
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

          {damage.map((dmg, i) => (
          <div className='damage' key={`damage-${i}`}>
            <div className='header'>
              <h2>Damage {i + 1}</h2>

              <a data-index={i} onClick={this.onRemoveDamage}>x</a>
            </div>

            <div className='input-row flex'>
              <label>
                Roll

                <input
                  type='text'
                  name={`damage.${i}.base`}
                  value={dmg.base}
                  onChange={this.onChangeDamage}
                  placeholder='1d8'
                />
              </label>
              <label>
                Modifier

                <select
                  type='text'
                  name={`damage.${i}.modifier.stat`}
                  value={dmg.modifier.stat}
                  onChange={this.onChangeDamage}
                >
                  {attributes.map((attr) => (
                    <option key={`attack-${index}-${attr}`} value={attr}>{attr}</option>
                  ))}
                </select>
              </label>
              <label>
                Type

                <input
                  type='text'
                  name={`damage.${i}.type`}
                  value={dmg.type}
                  onChange={this.onChangeDamage}
                  placeholder='piercing'
                />
              </label>
            </div>
          </div>
          ))}

          <a className='add' onClick={this.onAddDamage}>+ Add Damage</a>

          <div className='actions'>
            <a onClick={this.onSubmit}>Save</a>
            <a
              className='delete'
              data-attack-id={!isLegendaryAction ? index : undefined}
              data-legendary-action-id={isLegendaryAction ? index : undefined}
              onClick={onDelete}
            >
              Delete
            </a>
          </div>
        </form>
        )}

        <style jsx>{`
          .add {
            margin: 6px 0;
            text-align: center;
            display: inline-block;
          }

          .attack {
            transition: background 0.15s ease-out;
            display: flex;
            justify-content: space-between;
            color: ${color.grey[50]};
            font-size: 13px;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }

          .name {
            flex: 1;
            cursor: pointer;
          }

          .name.npc {
            color: ${color.yellow[500]};
            font-weight: 700;
            font-size: 14px;
          }

          .description {
            display: block;
            font-size: 13px;
          }

          a {
            color: ${color.grey[50]};
          }

          a:hover {
            color: ${color.yellow[500]};
            cursor: pointer;
          }

          .flex {
            width: 100%;
            display: flex;
          }

          .inline {
            display: inline-block;
          }

          form {
            background-color: ${color.grey[800]};
            width: 100%;
          }

          h2 {
            color: ${color.grey[400]};
            font-size: 13px;
            margin: 12px 0 0 0;
            font-weight: 700;
          }

          label {
            color: ${color.grey[400]};
            font-size: 13px;
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

          select option {
            padding: 6px;
          }

          .actions {
            margin-top: 3px;
          }

          .actions a {
            color: ${color.yellow[500]};
            transition: opacity 0.15s ease-out;
            font-size: 13px;
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

          .hidden {
            display: none;
          }
        `}</style>
      </div>
    )
  }
}
