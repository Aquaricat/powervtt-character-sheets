// <td
// onClick={runMacro}
// data-macro={`!r 1d6+@me.${attack.attribute}+${attack.mod || 0} "${attack.name}"`}
// data-as={character.key}
// >
import React, { Component, Fragment } from 'react'
import { color } from '../styles'

export default class Feature extends Component {
  constructor (props) {
    super(...arguments)
  }

  render () {
    const {
      attribute,
      attack_roll_die,
      crit_range,
      description,
      i,
      isEditing,
      magic_bonus,
      range,
      mod,
      name,
      onChange,
      onRemoveTool,
      onToggleEditing,
      damage_roll_die,
      damage_attribute,
      damage_mod,
      damage_type,
      damage_crit_die,
      is_attack,
      is_damage,
      proficient,
    } = this.props

    return (
      <div className='feature'>
        {!isEditing && (
          <div className='info'>
            <h3>
              {name}
              <a data-attack-id={i} onClick={onToggleEditing} className='edit'>Edit</a>
            </h3>
            <h4>{source}: {type}</h4>
            <p>{description}</p>

          </div>
        )}
        {isEditing && (
          <Fragment>
            <div>
              <label>
                Name
                <input
                  type='text'
                  onChange={onChange}
                  defaultValue={name}
                  data-attack-id={i}
                  name='name'
                />
              </label>
              <label>
                Description
                <textarea
                  onChange={onChange}
                  placeholder='Description (optional)'
                  defaultValue={description}
                  data-attack-id={i}
                  rows={3}
                  name='description'
                />
              </label>

              <hr />

              <h2>
                <input
                  type='checkbox'
                  onChange={onChange}
                  checked={is_attack}
                  data-attack-id={i}
                  defaultChecked={true}
                  name='is_attack'
                />

                Attack
              </h2>
              <div className='inline'>
                <label>
                  Roll Die
                  <input
                    type='text'
                    onChange={onChange}
                    defaultValue={attack_roll_die}
                    data-attack-id={i}
                    defaultValue='1d8'
                    className='small'
                    name='attack_roll_die'
                  />
                </label>
                <label>
                  Attack
                  <select
                    data-attack-id={i}
                    placeholder=''
                    name='attribute'
                    onChange={onChange}
                    defaultValue={attribute}
                  >
                    <option value='@me.charisma'>Charisma</option>
                    <option value='@me.constitution'>Constitution</option>
                    <option value='@me.dexterity'>Dexterity</option>
                    <option value='@me.intelligence'>Intelligence</option>
                    <option value='@me.strength'>Strength</option>
                    <option value='@me.wisdom'>Wisdom</option>
                  </select>
                </label>
                <label>
                  Mod
                  <input
                    type='number'
                    className='small'
                    onChange={onChange}
                    defaultValue={mod}
                    data-attack-id={i}
                    name='mod'
                    placeholder='0'
                  />
                </label>
                <label>
                  Proficient
                  <input
                    type='checkbox'
                    onChange={onChange}
                    checked={proficient}
                    data-attack-id={i}
                    name='proficient'
                  />
                </label>
              </div>
              <div className='inline'>
                <label>
                  Range
                  <input
                    type='text'
                    onChange={onChange}
                    defaultValue={range}
                    data-attack-id={i}
                    name='range'
                  />
                </label>
                <label>
                  Magic Bonus
                  <input
                    type='number'
                    className='small'
                    onChange={onChange}
                    defaultValue={magic_bonus}
                    data-attack-id={i}
                    name='magic_bonus'
                    placeholder='0'
                  />
                </label>
                <label>
                  Crit Range
                  <input
                    type='number'
                    className='small'
                    onChange={onChange}
                    defaultValue={crit_range}
                    data-attack-id={i}
                    name='crit_range'
                    placeholder='0'
                  />
                </label>
              </div>

              <hr />

              <h2>
                <input
                  type='checkbox'
                  onChange={onChange}
                  checked={is_damage}
                  data-attack-id={i}
                  defaultChecked={true}
                  name='is_damage'
                />

                Damage
              </h2>

              <div className='inline'>
                <label>
                  Roll Die
                  <input
                    type='text'
                    onChange={onChange}
                    defaultValue={damage_roll_die}
                    data-attack-id={i}
                    defaultValue='1d8'
                    className='small'
                    name='damage_roll_die'
                  />
                </label>
                <label>
                  Damage
                  <select
                    data-attack-id={i}
                    placeholder=''
                    name='damage_attribute'
                    onChange={onChange}
                    defaultValue={damage_attribute}
                  >
                    <option value='@me.charisma'>Charisma</option>
                    <option value='@me.constitution'>Constitution</option>
                    <option value='@me.dexterity'>Dexterity</option>
                    <option value='@me.intelligence'>Intelligence</option>
                    <option value='@me.strength'>Strength</option>
                    <option value='@me.wisdom'>Wisdom</option>
                  </select>
                </label>
                <label>
                  Mod
                  <input
                    type='number'
                    className='small'
                    onChange={onChange}
                    defaultValue={damage_mod}
                    data-attack-id={i}
                    name='damage_mod'
                    placeholder='0'
                  />
                </label>
                <label>
                  Crit Die
                  <input
                    type='number'
                    className='small'
                    onChange={onChange}
                    defaultValue={damage_crit_die}
                    data-attack-id={i}
                    name='damage_crit_die'
                    placeholder='1d12'
                  />
                </label>
              </div>
              <div className='inline'>
                <label>
                  Type
                  <input
                    type='text'
                    onChange={onChange}
                    defaultValue={damage_type}
                    data-attack-id={i}
                    name='damage_type'
                    placeholder='Slashing'
                  />
                </label>
              </div>
            </div>
            <div className='actions'>
              <a data-attack-id={i} onClick={onToggleEditing}>Save</a>
              <a data-attack-id={i} className='delete' onClick={onRemoveTool}>Delete</a>
            </div>
          </Fragment>
        )}

        <style jsx>{`
          .info {
            padding: 6px;
          }

          .info:hover .edit {
            display: inline;
          }

          .edit {
            margin-left: 6px;
            font-family: 'Open Sans', serif;
            font-size: 14px;
            font-weight: 400;
            display: none;
            color: ${color.grey[500]};
            transition: opacity 0.15s ease-out;
          }

          .edit:hover {
            cursor: pointer;
            opacity: 0.7;
          }

          h2 {
            display: flex;
            color: ${color.grey[50]};
            font-size: 14px;
            margin: 0;
            align-items: center;
          }

          h2 input {
            flex: inherit;
            margin-right: 3px;
          }

          hr {
            border: 0;
            margin: 12px 0;
            border-top: 1px solid ${color.grey[700]};
          }

          p {
            margin: 0;
            padding: 0;
            color: ${color.grey[300]};
            font-size: 14px;
            line-height: 26px;
          }

          .feature {
            text-align: left;
            width: 100%;
          }

          label {
            display: block;
            color: ${color.grey[400]};
            font-size: 12px;
            flex: 1;
            padding: 3px;
            flex-direction: column;
            display: flex;
          }

          input, select, textarea {
            display: block;
            flex: 1;
            background-color: ${color.grey[900]};
            border: 0;
            border-radius: 3px;
            padding: 6px;
            color: ${color.grey[50]};
            margin-top: 3px;
          }

          .small {
            max-width: 48px;
          }

          .inline {
            width: 100%;
            display: flex;
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
