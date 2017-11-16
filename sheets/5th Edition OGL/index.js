import React, { Component } from 'react'

import { color } from '../styles'

const attributes = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma' ]
const skills = [ 
  {
    "name": "Acrobatics",
    "type": "Dexterity"
  },
  {
    "name": "Animal Handling",
    "type": "Wisdom"
  },
  {
    "name": "Arcana",
    "type": "Intelligence"
  },
  {
    "name": "Athletics",
    "type": "Strength"
  },
  {
    "name": "Deception",
    "type": "Charisma"
  },
  {
    "name": "History",
    "type": "Intelligence"
  },
  {
    "name": "Insight",
    "type": "Wisdom"
  },
  {
    "name": "Intimidation",
    "type": "Charisma"
  },
  {
    "name": "Investigation",
    "type": "Intelligence"
  },
  {
    "name": "Medicine",
    "type": "Wisdom"
  },
  {
    "name": "Nature",
    "type": "Intelligence"
  },
  {
    "name": "Perception",
    "type": "Wisdom"
  },
  {
    "name": "Performance",
    "type": "Charisma"
  },
  {
    "name": "Persuasion",
    "type": "Charisma"
  },
  {
    "name": "Religion",
    "type": "Intelligence"
  },
  {
    "name": "Sleight of Hand",
    "type": "Dexterity"
  },
  {
    "name": "Stealth",
    "type": "Dexterity"
  },
  {
    "name": "Survival",
    "type": "Wisdom"
  }
]

const Toggle = ({ isOn, onClick }) => (
  <div className={isOn && 'on'} onClick={onClick}>
    <span />

    <style jsx>{`
      div {
        background-color: ${color.grey[700]};
        border-radius: 24px;
        width: 48px;
        display: flex;
        padding: 0;
        margin: 0;
        align-items: center;
        transition: background 0.15s ease-out;
      }

      span {
        background-color: ${color.yellow[500]};
        display: block;
        border-radius: 24px;
        transition: all 0.15s ease-out;
        height: 24px;
        width: 24px;
      }

      span:hover {
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

export default class CharacterSheet extends Component {
  constructor () {
    super(...arguments)

    this.onChangeTab = this.onChangeTab.bind(this)
    this.onCreateTool = this.onCreateTool.bind(this)
    this.onToggleAdvantage = this.onToggleAdvantage.bind(this)

    this.state = {
      isAdvantage: false,
      tab: 0,
    }
  }

  onToggleAdvantage () {
    this.setState({
      isAdvantage: !this.state.isAdvantage,
    })
  }

  onCreateTool () {
    console.log('here')
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'toolProficienciesAndCustomSkills',
        [
          ...this.props.character.toolProficienciesAndCustomSkills,
          {
            name: '',
            bonus: '',
            mod: '0',
            isEditing: true,
          },
        ],
      )
    }
  }

  onChangeTab (e) {
    const tab = e.target.getAttribute('data-tab')
    this.setState({
      tab: ~~tab, // convert to int
    })
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
    } = this.state

    console.log(character)

    // If we have advantage, we tend to roll 2d20kh1 for most rolls, so we just store it here
    const roll1d20 = isAdvantage ? '2d20kh1' : '1d20'

    return (
      <div className='root'>
        <div className='header'>
          <div className='left'>
            <div className='logo'>
              SRD5|<span className='power-vtt'>Power VTT</span>
            </div>

            <label className='flex'>
              <input
                defaultValue={character.name}
                name='name'
                onChange={onChange}
                type='text'
              />

              Character Name
            </label>
          </div>
          <div className='right'>
            {tab === 0 && (
              <div className='input-row'>
                <label>
                  <input
                    defaultValue={character.characterClass}
                    name='characterClass'
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
        </div>

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
            <li
              data-tab={2}
              onClick={this.onChangeTab}
              className={tab === 2 && 'selected'}
            >
              Spells
            </li>
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

        {tab === 0 && (
          <div className='body flex'>
            <div className='col-1'>
              <div className='flex'>
                <div className='attributes'>
                  {attributes.map((attr) => (
                    <div key={`attr-${attr}`} className='attribute'>
                      <span
                        onClick={runMacro}
                        data-macro={`#${attr.toLowerCase()} !r ${roll1d20}+@selected.${attr.toLowerCase()}Mod "${attr}"`}
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
                          defaultValue={`${character[attr.toLowerCase()]}Mod`}
                          name={`${attr.toLowerCase()}Mod`}
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
                        defaultValue={character.proficiencyBonus}
                        name='proficiencyBonus'
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
                          name={`${attr.toLowerCase()}SaveProf`}
                          defaultChecked={character[`${attr.toLowerCase()}SaveProf`] === true}
                        />
                        <label
                          onClick={runMacro}
                          data-macro={`#save${attr} !r ${roll1d20}+@selected.${attr.toLowerCase()} "${attr} Save"`}
                        >
                          <strong>{character[attr.toLowerCase()] || 0}</strong> {attr}
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
                          name={`${skill.name.toLowerCase()}Prof`}
                          defaultChecked={character[`${skill.name.toLowerCase()}Prof`] === true}
                        />
                        <label
                          onClick={runMacro}
                          data-macro={`#${skill.name.toLowerCase()} !r ${roll1d20}+@selected.${skill.name.toLowerCase()} "${skill.name}"`}
                        >
                          <strong>{character[skill.type.toLowerCase()] || 0}</strong> {skill.name} <span className='skill-type'>({skill.type.slice(0, 3)})</span>
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
                    defaultValue={character.pasiveWisdom}
                    name='passiveWisdom'
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
                      {character.toolProficienciesAndCustomSkills.map((tool, i) => (
                        <tr
                          className={tool.isEditing && 'editable'}
                          key={`tool-proficiency-${i}`}
                          onClick={runMacro}
                          data-macro={`#tool${i} ${roll1d20}+5 "Strength"`}
                        >
                          <td>
                            {tool.isEditing ? (
                              <input
                                type='text'
                                placeholder='Name'
                                name='toolsAndProficienciesName'
                                onChange={this.onChange}
                              />
                            ) : tool.name}
                          </td>
                          <td>
                            {tool.mod}
                          </td>
                          <td>
                            {tool.attribute}
                          </td>
                        </tr>
                      ))}
                      {false && (
                        <tr className='editable'>
                          <td>
                          </td>
                          <td>
                            <select
                              type='text'
                              placeholder=''
                              name='toolsAndProficienciesBonus'
                              onChange={this.onChange}
                            >
                              <option value={0}>Proficient</option>
                              <option value={1}>Expertise</option>
                              <option value={2}>Jack of all Trades</option>
                            </select>
                          </td>
                          <td>
                            <select
                              type='text'
                              placeholder=''
                              name='toolsAndProficienciesAttribute'
                              onChange={this.onChange}
                            >
                              {attributes.map((attr) => (
                                <option key={`tools-and-proficiencies-attr-${attr}`} value={attr}>{attr}</option>
                              ))}
                            </select>

                            <input
                              type='number'
                              placeholder='Mod'
                              name='toolsAndProficienciesMod'
                              onChange={this.onChange}
                            />
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td colSpan={3} className='add'>
                          <a onClick={this.onCreateTool}>
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
                      <tr className='editable'>
                        <td>E</td>
                      </tr>
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
                      <tr
                        onClick={runMacro}
                        data-macro={`#proficiency0 ${roll1d20}+5 "Strength"`}
                      >
                        <td>
                          Language
                        </td>
                        <td>
                          Elven
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} className='add'>
                          <a onClick={this.onCreateTool}>
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
                      <tr className='editable'>
                        <td>E</td>
                      </tr>
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
                    defaultValue={character.armorClass}
                    name='armorClass'
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
                    data-macro={`#initiative !r ${roll1d20}+@selected.dexterity "Initiative"`}
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
                      defaultValue={character.hpMax}
                      name='hpMax'
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
                  defaultValue={character.hpTemp}
                  name='hpTemp'
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
                        defaultValue={character.hitDiceTotal}
                        name='hitDiceTotal'
                        placeholder='0'
                        onChange={onChange}
                        type='number'
                      />

                      Total Hit Dice
                    </label>
                  </div>
                  <input
                    defaultValue={character.hitDice}
                    name='hitDice'
                    onChange={onChange}
                    className='large'
                    placeholder='0'
                    type='number'
                  />

                <h4
                  className='macro'
                  onClick={runMacro}
                  data-macro='#hit-dice !r 1d10+@selected.constitution'
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
                <h4>Attacks &amp; Spellcasting</h4>
              </div>

              <div className='list attacks'>
                <h4>Equipment</h4>
              </div>
            </div>

            <div className='col-1'>
              <div className='info'>
                <div className='attribute'>
                  <textarea
                    onChange={onChange}
                    name='personalityTraits'
                    defaultValue={character.personalityTraits}
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

              <div className='list attacks'>
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
                    name='alliesAndOrganizations'
                    defaultValue={character.alliesAndOrganizations}
                  />
                  <h4>Allies &amp; Organizations</h4>
                </div>

                <div className='attribute'>
                  <textarea
                    onChange={onChange}
                    name='additionalFeats'
                    defaultValue={character.additionalFeats}
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
          h4 {
            color: ${color.grey[400]};
            font-weight: 700;
            margin: 0;
            font-size: 13px;
            text-align: center;
          }

          input[type='text'], input[type='number'] {
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

          textarea {
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

          .bio textarea {
            min-height: 124px;
          }

          label:hover {
            color: ${color.grey[50]};
          }

          label:hover input {
            border-bottom: 1px solid ${color.grey[50]};
          }

          input:active,
          input:focus {
            border-bottom: 1px solid ${color.grey[50]};
          }

          label {
            color: ${color.grey[500]};
            flex-direction: column;
            flex: 1;
            display: inline-block;
            white-space: nowrap;
            font-size: 11px;
            text-transform: uppercase;
            transition: color 0.15s ease-out;
          }

          .attributes {
            margin-right: 12px;
            max-width: 124px;
          }

          .list {
            border-radius: 3px;
            border: 1px solid ${color.grey[500]};
            flex: 1;
            margin-bottom: 12px;
            padding: 6px 12px;
          }

          .macro {
            transition: color 0.15s ease-out;
          }

          .macro:hover,
          .list label:hover {
            cursor: pointer;
            color: ${color.yellow[500]};
          }

          .attribute {
            margin-bottom: 6px;
            text-align: center;
            border-radius: 3px;
            border: 1px solid ${color.grey[500]};
            padding: 6px 6px;
          }

          .attribute span {
            color: ${color.grey[50]};
            font-weight: 700;
            font-size: 14px;
            transition: color 0.15s ease-out;
          }

          .attribute span:hover {
            color: ${color.yellow[500]};
            cursor: pointer;
          }

          .attribute input {
            text-align: center;
            border-bottom: 0;
          }

          .attribute input.large {
            font-size: 24px;
            padding: 0;
          }

          .bonus,
          .attribute .mod {
            width: 42px;
            margin: 6px auto 0 auto;
            border-radius: 24px;
            border: 1px solid ${color.grey[700]};
          }

          .bonus {
            margin: 0 6px 0 0;
          }

          .proficiency {
            border-radius: 3px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            border: 1px solid ${color.grey[500]};
            padding: 6px;
          }

          .bonus input,
          .attribute .mod input {
            font-size: 14px;
            padding: 3px 0;
            border-bottom: 0;
          }

          .bonus input {
            text-align: center;
          }

          .bonus input:hover,
          .bonus input:active,
          .bonus input:focus,
          .attribute .mod input:hover,
          .attribute .mod input:active,
          .attribute .mod input:focus {
            border-bottom: 0!important;
          }

          .skill-type {
            font-size: 11px;
            text-transform: inherit;
            color: ${color.grey[600]};
          }

          .skill {
            white-space: nowrap;
          }

          .flex {
            display: flex;
          }

          .root {
            background-color: ${color.grey[800]};
            border-radius: 3px;
            border: 1px solid ${color.grey[900]};
            padding: 12px;
          }

          .logo {
            color: ${color.grey[50]};
            font-size: 24px;
            font-weight: 300;
            margin-bottom: 24px;
          }

          .logo .power-vtt {
            color: ${color.yellow[500]};
            font-weight: 700;
          }

          .header {
            display: flex;
          }

          .left {
            width: 33.33%;
            margin-right: 24px;
          }

          .right {
            width: 66.66%;
            padding: 12px;
            border: 1px solid ${color.grey[500]};
          }

          .right label {
            margin-right: 12px;
          }

          .input-row {
            display: flex;
          }

          .body {
            margin-top: 12px;
          }

          .col {
            flex: 1;
          }

          .col-1 {
            margin-left: 12px;
            flex: 1;
          }

          .col-1:first-child {
            margin-left: 0;
          }

          .death-saves {
            padding: 12px 0;
          }

          .col-2 .attribute,
          .stats .attribute {
            margin: 0 6px;
          }

          .col-2 .attribute:first-child,
          .stats .attribute:first-child {
            margin-left: 0;
          }

          .col-2 .attribute:last-child,
          .stats .attribute:last-child {
            margin-right: 0;
          }

          .attribute-sub {
            margin-top: 12px;
          }

          .attribute-sub .max {
            margin-bottom: 6px;
          }

          .attribute-sub .max input {
            border-bottom: 1px solid ${color.grey[500]};
            display: inline-block;
            width: 42px;
            margin-right: 6px;
            padding: 3px;
          }

          .attribute-sub .max label:hover input {
            border-bottom: 1px solid ${color.grey[50]};
          }

          .col-2 {
            display: flex;
            margin-top: 12px;
          }

          .equipment,
          .attacks {
            margin-top: 12px;
          }

          .nav {
            padding: 12px 0 0 0;
            display: flex;
            justify-content: space-between;
          }

          .nav ul {
            margin: 0;
            list-style: none;
            padding: 0;
          }

          .nav ul li {
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

          .nav ul li:first-child {
            margin-left: 0;
          }

          .nav ul li:last-child {
            margin-right: 0;
          }

          .nav ul li:hover {
            background-color: ${color.grey[700]};
            cursor: pointer;
            color: ${color.grey[50]};
          }

          .nav ul li.selected {
            background-color: ${color.yellow[500]};
            color: ${color.grey[900]};
            font-weight: 700;
          }

          .toggle {
            display: flex;
            align-items: center;
          }

          .toggle span {
            display: block;
            font-size: 12px;
            text-transform: uppercase;
            color: ${color.grey[300]};
            margin-right: 6px;
          }

          table {
            font-size: 12px;
            color: ${color.grey[50]};
            display: block;
            flex: 1;
            margin-bottom: 6px;
          }

          table thead tr {
            background-color: ${color.grey[900]};
            width: 100%;
          }

          table td {
            vertical-align: top;
            padding: 3px;
            width: 100%;
          }

          table td:first-child {
            max-width: inherit;
          }

          table input {
            font-size: 12px;
            padding: 0;
          }

          table select {
            background-color: ${color.grey[800]};
            border: 0;
            color: ${color.grey[50]};
            width: 76px;
            margin-bottom: 6px;
          }

          table tbody tr {
            transition: background 0.15s ease-out;
          }

          table tbody tr:hover {
            cursor: pointer;
            color: ${color.yellow[500]};
            background-color: ${color.grey[700]};
          }

          table tbody tr.editable:hover {
            cursor: inherit;
            background-color: transparent;
          }

          .add {
            text-align: center;
          }

          .add a {
            font-size: 11px;
            color: ${color.grey[400]};
            transition: color 0.15s ease-out;
          }

          table.edit {
            flex: inherit;
          }

          table.edit thead tr {
            background-color: transparent;
          }

          .tables {
            width: 100%;
          }

          table.proficiencies td:first-child {
            width: 126px;
            max-width: 126px;
          }
        `}</style>
      </div>
    )
  }
}
