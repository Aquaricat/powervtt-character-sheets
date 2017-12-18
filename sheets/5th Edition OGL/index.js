import React, { Component } from 'react'

import { color } from '../styles'

const attributes = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma'
]

const skills = [
  {
    "code": "acrobatics",
    "name": "Acrobatics",
    "type": "Dexterity"
  },
  {
    "code": "animal_handling",
    "name": "Animal Handling",
    "type": "Wisdom"
  },
  {
    "code": "arcana",
    "name": "Arcana",
    "type": "Intelligence"
  },
  {
    "code": "athletics",
    "name": "Athletics",
    "type": "Strength"
  },
  {
    "code": "deception",
    "name": "Deception",
    "type": "Charisma"
  },
  {
    "code": "history",
    "name": "History",
    "type": "Intelligence"
  },
  {
    "code": "insight",
    "name": "Insight",
    "type": "Wisdom"
  },
  {
    "code": "intimidation",
    "name": "Intimidation",
    "type": "Charisma"
  },
  {
    "code": "investigation",
    "name": "Investigation",
    "type": "Intelligence"
  },
  {
    "code": "medicine",
    "name": "Medicine",
    "type": "Wisdom"
  },
  {
    "code": "nature",
    "name": "Nature",
    "type": "Intelligence"
  },
  {
    "code": "perception",
    "name": "Perception",
    "type": "Wisdom"
  },
  {
    "code": "performance",
    "name": "Performance",
    "type": "Charisma"
  },
  {
    "code": "persuasion",
    "name": "Persuasion",
    "type": "Charisma"
  },
  {
    "code": "religion",
    "name": "Religion",
    "type": "Intelligence"
  },
  {
    "code": "sleight_of_hand",
    "name": "Sleight of Hand",
    "type": "Dexterity"
  },
  {
    "code": "stealth",
    "name": "Stealth",
    "type": "Dexterity"
  },
  {
    "code": "survival",
    "name": "Survival",
    "type": "Wisdom"
  }
]

export default class CharacterSheet extends Component {
  constructor (props) {
    super(...arguments)

    this.onAddAttack = this.onAddAttack.bind(this)
    this.onAddEquipment = this.onAddEquipment.bind(this)
    this.onAddProficiency = this.onAddProficiency.bind(this)
    this.onAddTool = this.onAddTool.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeTab = this.onChangeTab.bind(this)
    this.onRemoveTool = this.onRemoveTool.bind(this)
    this.onToggleAdvantage = this.onToggleAdvantage.bind(this)
    this.onToggleEditNPC = this.onToggleEditNPC.bind(this)
    this.onToggleEditing = this.onToggleEditing.bind(this)
    this.onToggleNPC = this.onToggleNPC.bind(this)
    this.onTogglePC = this.onTogglePC.bind(this)

    this.state = {
      isAdvantage: props.character.advantage || false,
      isEditing: false,
      isNPC: props.character.is_npc || false,
      tab: 0,
    }
  }

  onAddAttack () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'attacks',
        [
          ...this.props.character.attacks,
          {
            attribute: 'Strength',
            isEditing: true,
            isProficient: false,
            mod: 0,
            name: '',
          },
        ],
      )
    }
  }

  onAddEquipment () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'equipment',
        [
          ...this.props.character.equipment,
          {
            isEditing: true,
            isEquipped: false,
            weight: 0.1,
            name: '',
          },
        ],
      )
    }
  }

  onAddProficiency () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'other_profs_and_langs',
        [
          ...this.props.character.other_profs_and_langs,
          {
            isEditing: true,
            proficiency: '',
            type: 'Language',
          },
        ],
      )
    }
  }

  onAddTool () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'tools_and_skills',
        [
          ...this.props.character.tools_and_skills,
          {
            attribute: 'Strength',
            bonus: '',
            isEditing: true,
            mod: '0',
            name: '',
          },
        ],
      )
    }
  }

  onChange (e) {
    const attr = e.target.name
    const value = e.target.value
    const attackId = e.target.getAttribute('data-attack-id')
    const equipmentId = e.target.getAttribute('data-equipment-id')
    const toolId = e.target.getAttribute('data-tool-id')
    const otherId = e.target.getAttribute('data-other-id')

    let data = undefined
    let attribute = undefined
    if (attackId !== null) {
      const id = ~~attackId
      attribute = 'attacks'
      data = this.props.character.attacks.map((attack, i) => ({
        ...attack,
        attribute: i === id && attr === 'attribute' ? value : attack.attribute,
        name: i === id && attr === 'name' ? value : attack.name,
        mod: i === id && attr === 'mod' ? value : attack.mod,
      }))
    } else if (equipmentId !== null) {
      const id = ~~equipmentId
      attribute = 'equipment'
      data = this.props.character.equipment.map((equipment, i) => ({
        ...equipment,
        name: i === id && attr === 'name' ? value : equipment.name,
        weight: i === id && attr === 'weight' ? value : equipment.weight,
      }))
    } else if (toolId !== null) {
      const id = ~~toolId
      attribute = 'tools_and_skills'
      data = this.props.character.tools_and_skills.map((tool, i) => ({
        ...tool,
        attribute: i === id && attr === 'attribute' ? value : tool.attribute,
        bonus: i === id && attr === 'bonus' ? value : tool.bonus,
        name: i === id && attr === 'name' ? value : tool.name,
        mod: i === id && attr === 'mod' ? value : tool.mod,
      }))
    } else if (otherId !== null) {
      const id = ~~otherId
      attribute = 'other_profs_and_langs'
      data = this.props.character.other_profs_and_langs.map((prof, i) => ({
        ...prof,
        type: i === id && attr === 'type' ? value : prof.type,
        proficiency: i === id && attr === 'proficiency' ? value : prof.proficiency,
      }))
    }

    if (attribute && this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(attribute, data)
    }
  }

  onChangeTab (e) {
    const tab = e.target.getAttribute('data-tab')
    this.setState({
      tab: ~~tab, // convert to int
    })
  }

  onRemoveTool (e) {
    const attackId = e.target.getAttribute('data-attack-id')
    const equipmentId = e.target.getAttribute('data-equipment-id')
    const toolId = e.target.getAttribute('data-tool-id')
    const otherId = e.target.getAttribute('data-other-id')

    let data = undefined
    let attribute = undefined
    if (attackId !== null) {
      const id = ~~attackId
      attribute = 'attacks'
      data = this.props.character.attacks.filter((_, i) => (id !== i))
    } else if (equipmentId !== null) {
      const id = ~~equipmentId
      attribute = 'equipment'
      data = this.props.character.equipment.filter((_, i) => (id !== i))
    } else if (toolId !== null) {
      const id = ~~toolId
      attribute = 'tools_and_skills'
      data = this.props.character.tools_and_skills.filter((_, i) => (id !== i))
    } else if (otherId !== null) {
      const id = ~~otherId
      attribute = 'other_profs_and_langs'
      data = this.props.character.other_profs_and_langs.filter((_, i) => (id !== i))
    }

    if (attribute && this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(attribute, data)
    }
  }

  onToggleAdvantage () {
    this.setState({
      isAdvantage: !this.state.isAdvantage,
    })

    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute('isAdvantage', !this.state.isAdvantage)
    }
  }

  onToggleEditNPC () {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  onToggleEditing (e) {
    const attackId = e.target.getAttribute('data-attack-id')
    const equipmentId = e.target.getAttribute('data-equipment-id')
    const toolId = e.target.getAttribute('data-tool-id')
    const otherId = e.target.getAttribute('data-other-id')

    let data = undefined
    let attribute = undefined
    if (attackId !== null) {
      const id = ~~attackId
      attribute = 'attacks'
      data = this.props.character.attacks.map((attack, i) => ({
        ...attack,
        isEditing: i === id ? !attack.isEditing : attack.isEditing,
      }))
    } else if (equipmentId !== null) {
      const id = ~~equipmentId
      attribute = 'equipment'
      data = this.props.character.equipment.map((equipment, i) => ({
        ...equipment,
        isEditing: i === id ? !equipment.isEditing : equipment.isEditing,
      }))
    } else if (toolId !== null) {
      const id = ~~toolId
      attribute = 'tools_and_skills'
      data = this.props.character.tools_and_skills.map((tool, i) => ({
        ...tool,
        isEditing: i === id ? !tool.isEditing : tool.isEditing,
      }))
    } else if (otherId !== null) {
      const id = ~~otherId
      attribute = 'other_profs_and_langs'
      data = this.props.character.other_profs_and_langs.map((prof, i) => ({
        ...prof,
        isEditing: i === id ? !prof.isEditing : prof.isEditing,
      }))
    }

    if (attribute && this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(attribute, data)
    }
  }

  onTogglePC () {
    let ok = true
    if (this.state.isNPC) {
      ok = confirm('Are you sure you want to switch to the PC character sheet template?')
    }

    if (ok) {
      this.setState({
        isNPC: false,
      })
      if (this.props.onUpdateAttribute) {
        this.props.onUpdateAttribute('isNPC', false)
      }
    }
  }

  onToggleNPC () {
    let ok = true
    if (!this.state.isNPC) {
      ok = confirm('Are you sure you want to switch to the NPC character sheet template?')
    }

    if (ok) {
      this.setState({
        isNPC: true,
      })
      if (this.props.onUpdateAttribute) {
        this.props.onUpdateAttribute('isNPC', true)
      }
    }
  }

  render () {
    const {
      character,
      onChange,
      runMacro,
    } = this.props

    const {
      isAdvantage,
      tab,
      isEditing,
      isNPC,
    } = this.state

    // If we have advantage, we tend to roll 2d20kh1 for most rolls, so we just store it here
    const roll1d20 = isAdvantage ? '2d20kh1' : '1d20'

    return (
      <div className='character-sheet'>
        <div className='header'>
          <div className='left'>
            <div className='logo'>
              SRD5|<span className='power-vtt'>Power VTT</span>
            </div>
            <div className='template'>
              <a className={!isNPC && 'selected'} onClick={this.onTogglePC}>PC</a>
              &nbsp;|&nbsp;
              <a className={isNPC && 'selected'} onClick={this.onToggleNPC}>NPC</a>
              {isNPC && (
                <span>
                  &nbsp;- <a className={isEditing && 'selected'} onClick={this.onToggleEditNPC}>{isEditing ? 'Save' : 'Edit'}</a>
                </span>
              )}
            </div>

            {!isNPC && (
              <label className='flex'>
                <input
                  defaultValue={character.name}
                  name='name'
                  onChange={onChange}
                  type='text'
                />

                Character Name
              </label>
            )}
          </div>

          {!isNPC && (
            <div className='right'>
              {tab === 0 && (
                <div className='input-row'>
                  <label>
                    <input
                      defaultValue={character.character_class}
                      name='character_class'
                      onChange={onChange}
                      type='text'
                    />

                    Class
                  </label>
                  <label>
                    <input
                      defaultValue={character.level}
                      name='level'
                      onChange={onChange}
                      type='number'
                    />

                    Level
                  </label>

                  <label>
                    <input
                      defaultValue={character.background}
                      name='background'
                      onChange={onChange}
                      type='text'
                    />

                    Background
                  </label>
                </div>
              )}

              {tab === 0 && (
                <div className='input-row'>
                  <label>
                    <input
                      defaultValue={character.race}
                      name='race'
                      onChange={onChange}
                      type='text'
                    />

                    Race
                  </label>
                  <label>
                    <input
                      defaultValue={character.alignment}
                      name='alignment'
                      onChange={onChange}
                      type='text'
                    />

                    Alignment
                  </label>

                  <label>
                    <input
                      defaultValue={character.xp}
                      name='xp'
                      onChange={onChange}
                      type='text'
                    />

                    Experience Points
                  </label>
                </div>
              )}

              {tab === 1 && (
                <div className='input-row'>
                  <label>
                    <input
                      defaultValue={character.age}
                      name='age'
                      onChange={onChange}
                      type='text'
                    />

                    Age
                  </label>
                  <label>
                    <input
                      defaultValue={character.size}
                      name='height'
                      onChange={onChange}
                      type='text'
                    />

                    Size
                  </label>

                  <label>
                    <input
                      defaultValue={character.height}
                      name='height'
                      onChange={onChange}
                      type='text'
                    />

                    Height
                  </label>

                  <label>
                    <input
                      defaultValue={character.weight}
                      name='weight'
                      onChange={onChange}
                      type='text'
                    />

                    Weight
                  </label>
                </div>
              )}

              {tab === 1 && (
                <div className='input-row'>
                  <label>
                    <input
                      defaultValue={character.eyes}
                      name='eyes'
                      onChange={onChange}
                      type='text'
                    />

                    Eyes
                  </label>
                  <label>
                    <input
                      defaultValue={character.skin}
                      name='skin'
                      onChange={onChange}
                      type='text'
                    />

                    Skin
                  </label>

                  <label>
                    <input
                      defaultValue={character.hair}
                      name='hair'
                      onChange={onChange}
                      type='text'
                    />

                    Hair
                  </label>
                </div>
              )}
            </div>
          )}
        </div>

        {!isNPC && (
        <div className='nav flex'>
          <ul>
            <li
              data-tab={0}
              onClick={this.onChangeTab}
              className={tab === 0 && 'selected'}
            >
              Core
            </li>
            <li
              data-tab={1}
              onClick={this.onChangeTab}
              className={tab === 1 && 'selected'}
            >
              Bio
            </li>
            {false && (
              <li
                data-tab={2}
                onClick={this.onChangeTab}
                className={tab === 2 && 'selected'}
              >
                Spells
              </li>
            )}
          </ul>

          <span className='toggle'>
            <span>
              Advantage {isAdvantage ? 'ON' : 'Off'}
            </span>

            <Toggle
              onClick={this.onToggleAdvantage}
              isOn={isAdvantage}
            />
          </span>
        </div>
        )}

        {isNPC && (
          <div className='body flex'>
            {!isEditing && (
              <div className='col-1'>
                <h1 className='npcName'>{character.name}</h1>
                <h2 className='npcType'>{character.npc_type || 'Character Type, Chaotic Evil'}</h2>

                <div className='npc-section'>
                  <ul>
                    <li><strong>Armor Class</strong> {character.ac} ({character.armor_type || 'Natural Armor'})</li>
                    <li>
                      <strong>Hit Points</strong> {character.hp} (
                      <a
                        onClick={runMacro}
                        data-macro={`!r ${character.hp_formula}`}
                        data-as={character.key}
                      >
                        {character.hp_formula}
                      </a>
                      )
                    </li>
                    <li><strong>Speed</strong> {character.speed}</li>
                  </ul>
                </div>
                <div className='npc-section npc-stats'>
                  {attributes.map((attr) => (
                    <div key={`npc-stat-${attr}`} className='stat'>
                      <strong>{attr.slice(0, 3).toUpperCase()}</strong>
                      {character[attr.toLowerCase()]} (+{character[`${attr.toLowerCase()}_mod`]})
                    </div>
                  ))}
                </div>
                <div className='npc-section'>
                  <ul>
                    <li>
                      <strong>Saving Throws</strong> {attributes.filter(attr => character[`${attr.toLowerCase()}_mod`] > 0).map((attr) => (
                        <span key={`npc-saving-throw-${attr}`}>
                          <a
                            onClick={runMacro}
                            data-macro={`!r ${roll1d20}+@me.${attr.toLowerCase()}_mod "${attr} Save"`}
                            data-as={character.key}
                          >
                            {attr.slice(0, 3)} +{character[`${attr.toLowerCase()}_mod`]}
                          </a>
                        </span>
                      ))}
                    </li>
                    <li>
                      <strong>Skills</strong> {skills.filter(skill => character[skill.code] > 0).map((skill) => (
                        <span key={`npc-skill-${skill.name}`}>
                          <a
                            onClick={runMacro}
                            data-macro={`!r ${roll1d20}+@me.${skill.code} "${skill.name}"`}
                            data-as={character.key}
                          >
                            {skill.name} +{character[skill.code]}
                          </a>
                        </span>
                      ))}
                    </li>
                    <li><strong>Damage Immunities</strong> {character.damage_immunities}</li>
                    <li><strong>Senses</strong> {character.senses}</li>
                    <li><strong>Languages</strong> {character.other_profs_and_langs.map(lang => lang.proficiency).join(', ')}</li>
                    <li><strong>Challenge</strong> {character.challenge} ({character.xp})</li>
                  </ul>
                </div>
              </div>
            )}
            {isEditing && (
              <div className='col-1'>
                <label className='flex'>
                  <input
                    defaultValue={character.name}
                    name='name'
                    onChange={onChange}
                    type='text'
                  />

                  Character Name
                </label>

                <label className='flex'>
                  <input
                    defaultValue={character.npc_type}
                    name='npc_type'
                    onChange={onChange}
                    placeholder='Dragon, Chaotic Evil'
                    type='text'
                  />

                  NPC Type
                </label>

                <div className='stats flex'>
                  <div className='attribute'>
                    <input
                      defaultValue={character.ac}
                      name='ac'
                      onChange={onChange}
                      className='large'
                      placeholder='0'
                      type='number'
                    />

                    <h4>Armor Class</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!isNPC && tab === 0 && (
          <div className='body flex'>
            <div className='col-1'>
              <div className='flex'>
                <div className='attributes'>
                  {attributes.map((attr) => (
                    <div key={`attr-${attr}`} className='attribute'>
                      <span
                        onClick={runMacro}
                        data-macro={`!r ${roll1d20}+@me.${attr.toLowerCase()}_mod "${attr}"`}
                        data-as={character.key}
                      >
                        {attr}
                      </span>

                      <input
                        defaultValue={character[attr.toLowerCase()]}
                        name={attr.toLowerCase()}
                        onChange={onChange}
                        className='large'
                        placeholder='0'
                        type='number'
                      />

                      <div className='mod'>
                        <input
                          defaultValue={`${character[attr.toLowerCase() + '_mod']}`}
                          name={`${attr.toLowerCase()}_mod`}
                          placeholder='0'
                          onChange={onChange}
                          type='number'
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className='col'>
                  <div className='inspiration'>
                  </div>
                  <div className='proficiency'>
                    <div className='bonus'>
                      <input
                        defaultValue={character.proficiency_bonus}
                        name='proficiency_bonus'
                        placeholder='0'
                        onChange={onChange}
                        type='number'
                      />
                    </div>

                    <label>
                      Proficiency Bonus
                    </label>
                  </div>
                  <div className='list'>
                    {attributes.map((attr) => (
                      <div key={`saving-throw-${attr}`}>
                        <input
                          type='checkbox'
                          onChange={onChange}
                          name={`${attr.toLowerCase()}_prof`}
                          defaultChecked={character[`${attr.toLowerCase()}_prof`] === true}
                        />
                        <label
                          onClick={runMacro}
                          data-macro={`!r ${roll1d20}+@me.${attr.toLowerCase()} "${attr} Save"`}
                          data-as={character.key}
                        >
                          <strong>{character[`${attr.toLowerCase()}_mod`] || 0}</strong> {attr}
                        </label>
                      </div>
                    ))}

                    <h4>Saving Throws</h4>
                  </div>

                  <div className='list'>
                    {skills.map((skill) => (
                      <div className='skill' key={`skill-${skill.name}`}>
                        <input
                          type='checkbox'
                          onChange={onChange}
                          name={`${skill.code}_prof`}
                          defaultChecked={character[`${skill.code}_prof`] === true}
                        />
                        <label
                          onClick={runMacro}
                          data-macro={`!r ${roll1d20}+@me.${skill.code} "${skill.name}"`}
                          data-as={character.key}
                        >
                          <strong>{character[`${skill.type.toLowerCase()}_mod`] || 0}</strong> {skill.name} <span className='skill-type'>({skill.type.slice(0, 3)})</span>
                        </label>
                      </div>
                    ))}

                    <h4>Skills</h4>
                  </div>
                </div>
              </div>

              <div className='proficiency'>
                <div className='bonus'>
                  <input
                    defaultValue={character.passive_wisdom}
                    name='passive_wisdom'
                    placeholder='0'
                    onChange={onChange}
                    type='number'
                  />
                </div>

                <label>
                  Passive Wisdom (Perception)
                </label>
              </div>

              <div className='list'>
                <div className='tables flex'>
                  <table>
                    <thead>
                      <tr>
                        <td>Tool</td>
                        <td>Proficiency</td>
                        <td>Attribute</td>
                      </tr>
                    </thead>
                    <tbody>
                      {character.tools_and_skills.map((tool, i) => (
                        <tr
                          className={tool.isEditing && 'editable'}
                          key={`tool-proficiency-${i}`}
                          onClick={!tool.isEditing ? runMacro : undefined}
                          data-macro={`!r ${roll1d20}+@me.${tool.attribute.toLowerCase()}+${tool.mod || 0} "${tool.name}"`}
                          data-as={character.key}
                        >
                          <td>
                            {tool.isEditing ? (
                              <input
                                data-tool-id={i}
                                type='text'
                                placeholder='Name'
                                name='name'
                                onChange={this.onChange}
                                defaultValue={tool.name}
                              />
                            ) : tool.name}
                          </td>
                          <td>
                            {tool.isEditing ? (
                              <select
                                data-tool-id={i}
                                type='text'
                                placeholder=''
                                name='bonus'
                                onChange={this.onChange}
                                defaultValue={tool.bonus}
                              >
                                <option value={0}>Proficient</option>
                                <option value={1}>Expertise</option>
                                <option value={2}>Jack of all Trades</option>
                              </select>
                            ) : tool.mod}
                          </td>
                          {tool.isEditing ? (
                            <td style={{ width: '124px' }} className='flex'>
                              <select
                                data-tool-id={i}
                                type='text'
                                placeholder=''
                                name='attribute'
                                onChange={this.onChange}
                                defaultValue={tool.attribute}
                              >
                                {attributes.map((attr) => (
                                  <option key={`tools-and-proficiencies-attr-${attr}`} value={attr}>{attr}</option>
                                ))}
                              </select>

                              <input
                                data-tool-id={i}
                                type='number'
                                placeholder='Mod'
                                name='mod'
                                defaultValue={tool.mod}
                                onChange={this.onChange}
                              />
                            </td>
                          ) : (
                            <td>{tool.attribute}</td>
                          )}
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={3} className='add'>
                          <a onClick={this.onAddTool}>
                            + Add Item
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className='edit'>
                    <thead>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                    </thead>
                    <tbody>
                      {character.tools_and_skills.map((tool, i) => (
                        <tr
                          className={tool.isEditing && 'editable'}
                          key={`tool-proficiency-edit-${i}`}
                        >
                          <td>
                            <a data-tool-id={i} onClick={this.onToggleEditing}>
                              {tool.isEditing ? 'Save' : 'Edit'}
                            </a>
                            {tool.isEditing && (
                              <a data-tool-id={i} onClick={this.onRemoveTool} className='warning'>
                               Delete 
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h4>
                  Tool Proficiencies &amp; Custom Skills
                </h4>
              </div>

              <div className='list'>
                <div className='tables flex'>
                  <table className='proficiencies'>
                    <thead>
                      <tr>
                        <td>Type</td>
                        <td>Label</td>
                      </tr>
                    </thead>
                    <tbody>
                      {character.other_profs_and_langs.map((prof, i) => (
                        <tr
                          className={prof.isEditing && 'editable'}
                          key={`other-proficiency-${i}`}
                        >
                          <td>
                            {prof.isEditing ? (
                              <select
                                data-other-id={i}
                                type='text'
                                placeholder=''
                                name='type'
                                onChange={this.onChange}
                                defaultValue={prof.type}
                              >
                                <option value='Language'>Language</option>
                                <option value='Weapon'>Weapon</option>
                                <option value='Armor'>Armor</option>
                                <option value='Other'>Other</option>
                              </select>
                            ) : prof.type}
                          </td>
                          <td className='flex'>
                          {prof.isEditing ? (
                            <input
                              data-other-id={i}
                              type='text'
                              placeholder='Proficiency'
                              name='proficiency'
                              defaultValue={prof.proficiency}
                              onChange={this.onChange}
                            />
                            ) : prof.proficiency
                          }
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={3} className='add'>
                          <a onClick={this.onAddProficiency}>
                            + Add Item
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className='edit'>
                    <thead>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                    </thead>
                    <tbody>
                      {character.other_profs_and_langs.map((prof, i) => (
                        <tr
                          className={prof.isEditing && 'editable'}
                          key={`prof-proficiency-edit-${i}`}
                        >
                          <td>
                            <a data-other-id={i} onClick={this.onToggleEditing}>
                              {prof.isEditing ? 'Save' : 'Edit'}
                            </a>
                            {prof.isEditing && (
                              <a data-other-id={i} onClick={this.onRemoveTool} className='warning'>
                               Delete 
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h4>
                  Other Proficiencies &amp; Languages
                </h4>
              </div>
            </div>

            <div className='col-1'>
              <div className='stats flex'>
                <div className='attribute'>
                  <input
                    defaultValue={character.ac}
                    name='ac'
                    onChange={onChange}
                    className='large'
                    placeholder='0'
                    type='number'
                  />

                  <h4>Armor Class</h4>
                </div>

                <div className='attribute'>
                  <input
                    defaultValue={character.initiative}
                    name='initiative'
                    onChange={onChange}
                    className='large'
                    placeholder='0'
                    type='number'
                  />

                  <h4
                    onClick={runMacro}
                    data-macro={`!r ${roll1d20}+@me.dexterity "Initiative"`}
                    data-as={character.key}
                    className='macro'
                  >
                    Initiative
                  </h4>
                </div>

                <div className='attribute'>
                  <input
                    defaultValue={character.speed}
                    name='speed'
                    onChange={onChange}
                    className='large'
                    placeholder='0'
                    type='number'
                  />

                  <h4>Speed</h4>
                </div>
              </div>

              <div className='attribute attribute-sub'>
                <div className='max'>
                  <label>
                    <input
                      defaultValue={character.hp_max}
                      name='hp_max'
                      placeholder='0'
                      onChange={onChange}
                      type='number'
                    />

                    Hit Point Max
                  </label>
                </div>

                <input
                  defaultValue={character.hp}
                  name='hp'
                  onChange={onChange}
                  className='large'
                  placeholder='0'
                  type='number'
                />

                <h4>Current Hit Points</h4>
              </div>

              <div className='attribute attribute-sub'>
                <input
                  defaultValue={character.hp_tmp}
                  name='hp_tmp'
                  onChange={onChange}
                  className='large'
                  placeholder='0'
                  type='number'
                />

                <h4>Temporary Hit Points</h4>
              </div>

              <div className='col-2'>
                <div className='attribute attribute-sub'>
                  <div className='max'>
                    <label>
                      <input
                        defaultValue={character.hit_dice_total}
                        name='hit_dice_total'
                        placeholder='0'
                        onChange={onChange}
                        type='number'
                      />

                      Total Hit Dice
                    </label>
                  </div>
                  <input
                    defaultValue={character.hit_dice}
                    name='hit_dice'
                    onChange={onChange}
                    className='large'
                    placeholder='0'
                    type='text'
                  />

                <h4
                  className='macro'
                  onClick={runMacro}
                  data-macro='!r 1d10+@me.constitution'
                  data-as={character.key}
                >
                  Hit Dice
                </h4>
                </div>

                <div className='attribute attribute-sub'>
                  <div className='death-saves'>
                    <label>
                      Successes

                      <input
                        type='checkbox'
                      />
                      <input
                        type='checkbox'
                      />
                      <input
                        type='checkbox'
                      />
                    </label>

                    <label>
                      Failures

                      <input
                        type='checkbox'
                      />
                      <input
                        type='checkbox'
                      />
                      <input
                        type='checkbox'
                      />
                    </label>
                  </div>

                  <h4>Death Saves</h4>
                </div>
              </div>

              <div className='list attacks'>
                <div className='tables flex'>
                  <table>
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Attack</td>
                      </tr>
                    </thead>
                    <tbody>
                      {character.attacks.map((attack, i) => (
                        <tr
                          className={attack.isEditing && 'editable'}
                          key={`attack-${i}`}
                          onClick={!attack.isEditing ? runMacro : undefined}
                          data-macro={`!r 1d6+@me.${attack.attribute}+${attack.mod || 0} "${attack.name}"`}
                          data-as={character.key}
                        >
                          <td>
                            {attack.isEditing ? (
                              <input
                                data-attack-id={i}
                                type='text'
                                placeholder='Name'
                                name='name'
                                onChange={this.onChange}
                                defaultValue={attack.name}
                              />
                            ) : attack.name}
                          </td>
                          {attack.isEditing ? (
                            <td style={{ width: '196px' }} className='flex'>
                              <select
                                data-attack-id={i}
                                type='text'
                                placeholder=''
                                name='attribute'
                                onChange={this.onChange}
                                defaultValue={attack.attribute}
                              >
                                {attributes.map((attr) => (
                                  <option key={`attack-attr-${attr}`} value={attr}>{attr}</option>
                                ))}
                              </select>

                              +&nbsp;

                              <input
                                data-attack-id={i}
                                type='number'
                                placeholder='Mod'
                                name='mod'
                                defaultValue={attack.mod}
                                onChange={this.onChange}
                              />
                            </td>
                          ) : (
                            <td>{attack.attribute} + {attack.mod}</td>
                          )}
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={3} className='add'>
                          <a onClick={this.onAddAttack}>
                            + Add Item
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className='edit'>
                    <thead>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                    </thead>
                    <tbody>
                      {character.attacks.map((attack, i) => (
                        <tr
                          className={attack.isEditing && 'editable'}
                          key={`attack-edit-${i}`}
                        >
                          <td>
                            <a data-attack-id={i} onClick={this.onToggleEditing}>
                              {attack.isEditing ? 'Save' : 'Edit'}
                            </a>
                            {attack.isEditing && (
                              <a data-attack-id={i} onClick={this.onRemoveTool} className='warning'>
                               Delete 
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h4>Attacks &amp; Spellcasting</h4>
              </div>

              <div className='list attacks'>
                <div className='tables flex'>
                  <table>
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Weight</td>
                      </tr>
                    </thead>
                    <tbody>
                      {character.equipment.map((equipment, i) => (
                        <tr
                          className={equipment.isEditing && 'editable'}
                          key={`equipment-${i}`}
                        >
                          <td>
                            {equipment.isEditing ? (
                              <input
                                data-equipment-id={i}
                                type='text'
                                placeholder='Name'
                                name='name'
                                onChange={this.onChange}
                                defaultValue={equipment.name}
                              />
                            ) : equipment.name}
                          </td>
                          {equipment.isEditing ? (
                            <td style={{ width: '196px' }} className='flex'>
                              <input
                                data-equipment-id={i}
                                type='number'
                                placeholder='Weight'
                                name='weight'
                                defaultValue={equipment.weight}
                                onChange={this.onChange}
                              />
                            </td>
                          ) : (
                            <td>{parseFloat(equipment.weight, 10).toFixed(1)}</td>
                          )}
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={3} className='add'>
                          <a onClick={this.onAddEquipment}>
                            + Add Item
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className='edit'>
                    <thead>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                    </thead>
                    <tbody>
                      {character.equipment.map((equipment, i) => (
                        <tr
                          className={equipment.isEditing && 'editable'}
                          key={`equipment-edit-${i}`}
                        >
                          <td>
                            <a data-equipment-id={i} onClick={this.onToggleEditing}>
                              {equipment.isEditing ? 'Save' : 'Edit'}
                            </a>
                            {equipment.isEditing && (
                              <a data-equipment-id={i} onClick={this.onRemoveTool} className='warning'>
                               Delete 
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h4>Equipment</h4>
              </div>
            </div>

            <div className='col-1'>
              <div className='info'>
                <div className='attribute'>
                  <textarea
                    onChange={onChange}
                    name='personality_traits'
                    defaultValue={character.personality_traits}
                  />
                  <h4>Personality Traits</h4>
                </div>
              </div>

              <div className='attribute'>
                <textarea
                  onChange={onChange}
                  name='ideals'
                  defaultValue={character.ideals}
                />
                <h4>Ideals</h4>
              </div>

              <div className='attribute'>
                <textarea
                  onChange={onChange}
                  name='bonds'
                  defaultValue={character.bonds}
                />
                <h4>Bonds</h4>
              </div>

              <div className='attribute'>
                <textarea
                  onChange={onChange}
                  name='flaws'
                  defaultValue={character.flaws}
                />
                <h4>Flaws</h4>
              </div>

              <div className='attribute attribute-sub'>
                <div className='max'>
                  <label>
                    Total

                    <input
                      defaultValue={character.classResourceMax}
                      name='classResourceMax'
                      placeholder='0'
                      onChange={onChange}
                      type='number'
                    />
                  </label>
                </div>
                <input
                  defaultValue={character.classResource}
                  name='classResource'
                  onChange={onChange}
                  className='large'
                  placeholder='0'
                  type='number'
                />

                <h4>
                  Class Resource
                </h4>
              </div>

              <div className='attribute'>
                <textarea
                  onChange={onChange}
                  rows={10}
                  name='features_and_traits'
                  defaultValue={character.features_and_traits}
                />
                <h4>Features &amp; Traits</h4>
              </div>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div className='body flex'>
            <div className='col-1'>
              <div className='bio'>
                <div className='attribute'>
                  <textarea
                    onChange={onChange}
                    name='appearance'
                    defaultValue={character.appearance}
                  />
                  <h4>Character Appearance</h4>
                </div>

                <div className='attribute'>
                  <textarea
                    onChange={onChange}
                    name='backstory'
                    defaultValue={character.backstory}
                  />
                  <h4>Character Backstory</h4>
                </div>
              </div>
            </div>
            <div className='col-1'>
              <div className='bio'>
                <div className='attribute'>
                  <textarea
                    onChange={onChange}
                    name='allies_and_orgs'
                    defaultValue={character.allies_and_orgs}
                  />
                  <h4>Allies &amp; Organizations</h4>
                </div>

                <div className='attribute'>
                  <textarea
                    onChange={onChange}
                    name='additional_features'
                    defaultValue={character.additional_features}
                  />
                  <h4>Additional Features &amp; Traits</h4>
                </div>

                <div className='attribute'>
                  <textarea
                    onChange={onChange}
                    name='treasure'
                    defaultValue={character.treasure}
                  />
                  <h4>Treasure</h4>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .character-sheet {
            background-color: ${color.grey[800]};
            border-radius: 3px;
            border: 1px solid ${color.grey[900]};
            padding: 12px;
          }

          .character-sheet a {
            transtiion: all 0.15s ease-out;
          }

          .character-sheet h4 {
            color: ${color.grey[400]};
            font-weight: 700;
            margin: 0;
            font-size: 13px;
            text-align: center;
          }

          .character-sheet input[type='text'],
          .character-sheet input[type='number'] {
            background-color: transparent;
            border: 0;
            border-bottom: 1px solid ${color.grey[700]};
            color: ${color.grey[50]};
            display: block;
            flex: 1;
            font-size: 16px;
            min-width: inherit;
            outline: 0;
            padding: 6px 0;
            transition: border 0.15s ease-out;
            width: 100%;
          }

          .character-sheet textarea {
            background-color: transparent;
            display: block;
            resize: none;
            font-size: 14px;
            flex: 1;
            border: 0;
            min-height: 48px;
            min-width: inherit;
            outline: 0;
            padding: 6px 0;
            width: 100%;
            color: ${color.grey[50]};
          }

          .character-sheet .bio textarea {
            min-height: 124px;
          }

          .character-sheet label:hover {
            color: ${color.grey[50]};
          }

          .character-sheet label:hover input {
            border-bottom: 1px solid ${color.grey[50]};
          }

          .character-sheet input:active,
          .character-sheet input:focus {
            border-bottom: 1px solid ${color.grey[50]};
          }

          .character-sheet label {
            color: ${color.grey[500]};
            flex-direction: column;
            flex: 1;
            display: inline-block;
            white-space: nowrap;
            font-size: 11px;
            text-transform: uppercase;
            transition: color 0.15s ease-out;
          }

          .character-sheet .attributes {
            margin-right: 12px;
            max-width: 124px;
          }

          .character-sheet .list {
            border-radius: 3px;
            border: 1px solid ${color.grey[500]};
            flex: 1;
            margin-bottom: 12px;
            padding: 6px 12px;
          }

          .character-sheet .macro {
            transition: color 0.15s ease-out;
          }

          .character-sheet .macro:hover,
          .character-sheet .list label:hover {
            cursor: pointer;
            color: ${color.yellow[500]};
          }

          .character-sheet .attribute {
            margin-bottom: 6px;
            text-align: center;
            border-radius: 3px;
            border: 1px solid ${color.grey[500]};
            padding: 6px 6px;
          }

          .character-sheet .attribute span {
            color: ${color.grey[50]};
            font-weight: 700;
            font-size: 14px;
            transition: color 0.15s ease-out;
          }

          .character-sheet .attribute span:hover {
            color: ${color.yellow[500]};
            cursor: pointer;
          }

          .character-sheet .attribute input {
            text-align: center;
            border-bottom: 0;
          }

          .character-sheet .attribute input.large {
            font-size: 24px;
            padding: 0;
          }

          .character-sheet .bonus,
          .character-sheet .attribute .mod {
            width: 42px;
            margin: 6px auto 0 auto;
            border-radius: 24px;
            border: 1px solid ${color.grey[700]};
          }

          .character-sheet .bonus {
            margin: 0 6px 0 0;
          }

          .character-sheet .proficiency {
            border-radius: 3px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            border: 1px solid ${color.grey[500]};
            padding: 6px;
          }

          .character-sheet .bonus input,
          .character-sheet .attribute .mod input {
            font-size: 14px;
            padding: 3px 0;
            border-bottom: 0;
          }

          .character-sheet .bonus input {
            text-align: center;
          }

          .character-sheet .bonus input:hover,
          .character-sheet .bonus input:active,
          .character-sheet .bonus input:focus,
          .character-sheet .attribute .mod input:hover,
          .character-sheet .attribute .mod input:active,
          .character-sheet .attribute .mod input:focus {
            border-bottom: 0!important;
          }

          .character-sheet .skill-type {
            font-size: 11px;
            text-transform: inherit;
            color: ${color.grey[600]};
          }

          .character-sheet .skill {
            white-space: nowrap;
          }

          .character-sheet .flex {
            display: flex;
          }

          .character-sheet .logo {
            color: ${color.grey[50]};
            font-size: 24px;
            margin-bottom: 3px;
            font-weight: 300;
          }

          .character-sheet .logo .power-vtt {
            color: ${color.yellow[500]};
            font-weight: 700;
          }

          .character-sheet .template {
            color: ${color.grey[400]};
            font-size: 12px;
            margin-bottom: 12px;
            font-weight: 300;
          }

          .character-sheet .template a {
            text-decoration: none;
            transition: opacity 0.15s ease-out;
          }

          .character-sheet .template a:hover {
            cursor: pointer;
            opacity: 0.7;
          }

          .character-sheet .template a.selected {
            color: ${color.yellow[500]};
            font-weight: 700;
          }

          .character-sheet .template a.selected:hover {
            opacity: 1.0;
            cursor: inherit;
          }

          .character-sheet .header {
            display: flex;
          }

          .character-sheet .left {
            width: 33.33%;
            margin-right: 24px;
          }

          .character-sheet .right {
            width: 66.66%;
            padding: 12px;
            border: 1px solid ${color.grey[500]};
          }

          .character-sheet .right label {
            margin-right: 12px;
          }

          .character-sheet .input-row {
            display: flex;
          }

          .character-sheet .body {
            margin-top: 12px;
          }

          .character-sheet .col {
            flex: 1;
          }

          .character-sheet .col-1 {
            margin-left: 12px;
            flex: 1;
          }

          .character-sheet .col-1:first-child {
            margin-left: 0;
          }

          .character-sheet .death-saves {
            padding: 12px 0;
          }

          .character-sheet .col-2 .attribute,
          .character-sheet .stats .attribute {
            margin: 0 6px;
          }

          .character-sheet .col-2 .attribute:first-child,
          .character-sheet .stats .attribute:first-child {
            margin-left: 0;
          }

          .character-sheet .col-2 .attribute:last-child,
          .character-sheet .stats .attribute:last-child {
            margin-right: 0;
          }

          .character-sheet .attribute-sub {
            margin-top: 12px;
          }

          .character-sheet .attribute-sub .max {
            margin-bottom: 6px;
          }

          .character-sheet .attribute-sub .max input {
            border-bottom: 1px solid ${color.grey[500]};
            display: inline-block;
            width: 42px;
            margin-right: 6px;
            padding: 3px;
          }

          .character-sheet .attribute-sub .max label:hover input {
            border-bottom: 1px solid ${color.grey[50]};
          }

          .character-sheet .col-2 {
            display: flex;
            margin-top: 12px;
          }

          .character-sheet .equipment,
          .character-sheet .attacks {
            margin-top: 12px;
          }

          .character-sheet .nav {
            padding: 12px 0 0 0;
            display: flex;
            justify-content: space-between;
          }

          .character-sheet .nav ul {
            margin: 0;
            list-style: none;
            padding: 0;
          }

          .character-sheet .nav ul li {
            padding: 6px;
            border-radius: 3px;
            background-color: transparent;
            color: ${color.grey[500]};
            border: 1px solid ${color.grey[700]};
            border-radius: 3px;
            font-size: 12px;
            margin: 0 3px;
            transition: all 0.15s ease-out;
            display: inline-block;
          }

          .character-sheet .nav ul li:first-child {
            margin-left: 0;
          }

          .character-sheet .nav ul li:last-child {
            margin-right: 0;
          }

          .character-sheet .nav ul li:hover {
            background-color: ${color.grey[700]};
            cursor: pointer;
            color: ${color.grey[50]};
          }

          .character-sheet .nav ul li.selected {
            background-color: ${color.yellow[500]};
            color: ${color.grey[900]};
            font-weight: 700;
          }

          .character-sheet .toggle {
            display: flex;
            align-items: center;
          }

          .character-sheet .toggle span {
            display: block;
            font-size: 12px;
            text-transform: uppercase;
            color: ${color.grey[300]};
            margin-right: 6px;
          }

          .character-sheet table {
            font-size: 12px;
            color: ${color.grey[50]};
            display: block;
            flex: 1;
            margin-bottom: 6px;
          }

          .character-sheet table thead tr {
            background-color: ${color.grey[900]};
            width: 100%;
          }

          .character-sheet table td {
            vertical-align: top;
            padding: 3px;
            width: 100%;
          }

          .character-sheet table td:first-child {
            max-width: inherit;
          }

          .character-sheet table input {
            font-size: 12px;
            padding: 0;
          }

          .character-sheet table select {
            background-color: ${color.grey[800]};
            border: 0;
            color: ${color.grey[50]};
            width: 76px;
            margin-bottom: 6px;
          }

          .character-sheet table tbody tr {
            transition: background 0.15s ease-out;
          }

          .character-sheet table tbody tr:hover {
            cursor: pointer;
            color: ${color.yellow[500]};
            background-color: ${color.grey[700]};
          }

          .character-sheet table tbody tr.editable:hover {
            cursor: inherit;
            background-color: transparent;
            color: inherit;
          }

          .character-sheet table tbody tr.editable a {
            font-size: 10px;
            margin-right: 3px;
          }

          .character-sheet table tbody tr.editable a:last-child {
            margin-right: 0;
          }

          .character-sheet table tbody tr.editable a:hover {
            color: ${color.yellow[500]};
            cursor: pointer;
          }

          .character-sheet table tbody tr.editable a.warning {
            margin-left: 3px;
          }
          .character-sheet table tbody tr.editable a.warning:hover {
            color: ${color.error};
          }

          .character-sheet .add {
            text-align: center;
          }

          .character-sheet .add a {
            font-size: 11px;
            color: ${color.grey[400]};
            transition: color 0.15s ease-out;
          }

          .character-sheet table.edit {
            flex: inherit;
          }

          .character-sheet table.edit thead tr {
            background-color: transparent;
          }

          .character-sheet .tables {
            width: 100%;
          }

          .character-sheet table.proficiencies td:first-child {
            width: 126px;
            max-width: 126px;
          }

          .character-sheet .npcName {
            color: ${color.yellow[500]};
            margin: 0 0 -3px 0;
            font-family: 'Spectral SC', serif;
            font-size: 21px;
            font-weight: 700;
          }

          .character-sheet .npcType {
            margin: 0;
            font-size: 14px;
            font-weight: 300;
            font-style: italic;
            color: ${color.grey[200]};
            padding-bottom: 12px;
            border-bottom: 1px solid ${color.yellow[500]};
          }

          .character-sheet .npc-section {
            padding: 12px 0;
            font-size: 14px;
            color: ${color.grey[100]};
            border-bottom: 1px solid ${color.yellow[500]};
          }

          .character-sheet .npc-section ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .character-sheet .npc-section span {
            margin-right: 6px;
          }

          .character-sheet .npc-section a {
            text-decoration: none;
            transition: color 0.15s ease-out;
          }

          .character-sheet .npc-section a:hover {
            color: ${color.yellow[500]};
            cursor: pointer;
          }

          .character-sheet .npc-stats {
            display: flex;
            align-items: center;
          }

          .character-sheet .stat {
            flex: 1;
            font-size: 16px;
            text-align: center;
          }

          .character-sheet .stat strong {
            display: block;
          }
        `}</style>
      </div>
    )
  }
}

const Toggle = ({ isOn, onClick }) => (
  <div className={`toggle ${isOn && 'on'}`} onClick={onClick}>
    <span />

    <style jsx>{`
      .toggle {
        background-color: ${color.grey[700]};
        border-radius: 24px;
        width: 48px;
        display: flex;
        padding: 0;
        margin: 0;
        align-items: center;
        transition: background 0.15s ease-out;
      }

      .toggle span {
        background-color: ${color.yellow[500]};
        display: block;
        border-radius: 24px;
        transition: all 0.15s ease-out;
        height: 24px;
        width: 24px;
      }

      .toggle span:hover {
        opacity: 0.7;
        cursor: pointer;
      }

      .on {
        background-color: ${color.grey[900]};
      }

      .on span {
        margin-left: 24px;
      }
    `}</style>
  </div>
)
