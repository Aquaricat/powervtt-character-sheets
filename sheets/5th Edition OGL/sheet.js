import React, { Component } from 'react'

import Asset from './asset'
import Attack from './attack'
import Attribute from './attribute'
import Feature from './feature'
import { color } from '../styles'

import { attributes, languages, skills } from './data'

export default class CharacterSheet extends Component {
  constructor (props) {
    super(...arguments)

    this.onAddAsset = this.onAddAsset.bind(this)
    this.onAddAttack = this.onAddAttack.bind(this)
    this.onAddLegendaryAction = this.onAddLegendaryAction.bind(this)
    this.onAddEquipment = this.onAddEquipment.bind(this)
    this.onAddFeature = this.onAddFeature.bind(this)
    this.onAddProficiency = this.onAddProficiency.bind(this)
    this.onAddTool = this.onAddTool.bind(this)
    this.onAdjustAsset = this.onAdjustAsset.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeAttack = this.onChangeAttack.bind(this)
    this.onChangeLegendaryAction = this.onChangeLegendaryAction.bind(this)
    this.onChangeTab = this.onChangeTab.bind(this)
    this.onRemoveTool = this.onRemoveTool.bind(this)
    this.onToggleAdvantage = this.onToggleAdvantage.bind(this)
    this.onToggleCheckbox = this.onToggleCheckbox.bind(this)
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

  componentWillReceiveProps (props) {
    if (Number(props.character.hp) !== this.props.character.hp) {
      this.refs.hp.value = props.character.hp
    }

    if (props.character.is_npc !== this.state.isNPC) {
      this.setState({
        isNPC: props.character.is_npc,
      })
    }
  }

  onAddAsset () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'assets',
        [
          ...this.props.character.assets,
          {
            isEditing: true,
            name: '',
            current: 0,
            maximum: 0,
          },
        ],
      )
    }
  }

  onAddAttack () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'attacks',
        [
          ...this.props.character.attacks,
          {
            name: '',
            description: '',
            has_attack: true,
            isEditing: true,
          },
        ],
      )
    }
  }

  onAddLegendaryAction () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'legendary_actions',
        [
          ...this.props.character.legendary_actions,
          {
            name: '',
            description: '',
            has_attack: true,
            isEditing: true,
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

  onAddFeature () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'features_and_traits',
        [
          ...this.props.character.features_and_traits,
          {
            isEditing: true,
            name: '',
            source: 'Racial',
            type: '',
            description: '',
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

  onAdjustAsset (e) {
    const id = ~~e.target.getAttribute('data-asset-id')
    let attribute = 'assets'
    let current = ~~e.target.getAttribute('data-asset-adjust')
    let data = this.props.character.assets.map((asset, i) => ({
      ...asset,
      current: i === id ? current : asset.current,
      maximum: asset.maximum,
      name: asset.name,
    }))

    if (attribute && this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(attribute, data)
    }
  }

  onChangeAttack (index, attack) {
    if (this.props.onUpdateAttribute) {
      const attacks = this.props.character.attacks.map((a, i) => ({
        ...(i === index ? attack : a),
      }))
      this.props.onUpdateAttribute('attacks', attacks)
    }
  }

  onChangeLegendaryAction (index, attack) {
    if (this.props.onUpdateAttribute) {
      const attacks = this.props.character.legendary_actions.map((a, i) => ({
        ...(i === index ? attack : a),
      }))
      this.props.onUpdateAttribute('legendary_actions', attacks)
    }
  }

  onChange (e) {
    const attr = e.target.name
    const value = e.target.value
    const assetId = e.target.getAttribute('data-asset-id')
    const attackId = e.target.getAttribute('data-attack-id')
    const equipmentId = e.target.getAttribute('data-equipment-id')
    const toolId = e.target.getAttribute('data-tool-id')
    const otherId = e.target.getAttribute('data-other-id')
    const featureId = e.target.getAttribute('data-feature-id')

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
    } else if (featureId !== null) {
      const id = ~~featureId
      attribute = 'features_and_traits'
      data = this.props.character.features_and_traits.map((feat, i) => ({
        ...feat,
        type: i === id && attr === 'type' ? value : feat.type,
        source: i === id && attr === 'source' ? value : feat.source,
        name: i === id && attr === 'name' ? value : feat.name,
        description: i === id && attr === 'description' ? value : feat.description,
      }))
    } else if (assetId !== null) {
      const id = ~~assetId
      attribute = 'assets'
      data = this.props.character.assets.map((asset, i) => ({
        ...asset,
        current: i === id && attr === 'current' ? value : asset.current,
        maximum: i === id && attr === 'maximum' ? value : asset.maximum,
        name: i === id && attr === 'name' ? value : asset.name,
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
    const assetId = e.target.getAttribute('data-asset-id')
    const attackId = e.target.getAttribute('data-attack-id')
    const legendaryActionId = e.target.getAttribute('data-legendary-action-id')
    const equipmentId = e.target.getAttribute('data-equipment-id')
    const toolId = e.target.getAttribute('data-tool-id')
    const otherId = e.target.getAttribute('data-other-id')
    const featureId = e.target.getAttribute('data-feature-id')

    let data = undefined
    let attribute = undefined
    if (attackId !== null) {
      const id = ~~attackId
      attribute = 'attacks'
      data = this.props.character.attacks.filter((_, i) => (id !== i))
    } else if (legendaryActionId !== null) {
      const id = ~~legendaryActionId
      attribute = 'legendary_actions'
      data = this.props.character.legendary_actions.filter((_, i) => (id !== i))
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
    } else if (featureId !== null) {
      const id = ~~featureId
      attribute = 'features_and_traits'
      data = this.props.character.features_and_traits.filter((_, i) => (id !== i))
    } else if (assetId !== null) {
      const id = ~~assetId
      attribute = 'assets'
      data = this.props.character.assets.filter((_, i) => (id !== i))
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

  onToggleCheckbox (e) {
    const name = e.target.name
    const checked = e.target.checked
    const value = e.target.value

    let data = this.props.character[name]
    if (name === 'languages') {
      if (!data) {
        data = []
      }

      if (checked) {
        data.push(value)
      } else {
        data = data.filter(l => l !== value)
      }
    } else {
      data = value
    }

    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(name, data) 
    }
  }

  onToggleEditNPC () {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  onToggleEditing (e) {
    const assetId = e.target.getAttribute('data-asset-id')
    const attackId = e.target.getAttribute('data-attack-id')
    const legendaryActionId = e.target.getAttribute('data-legendary-action-id')
    const equipmentId = e.target.getAttribute('data-equipment-id')
    const toolId = e.target.getAttribute('data-tool-id')
    const otherId = e.target.getAttribute('data-other-id')
    const featureId = e.target.getAttribute('data-feature-id')

    let data = undefined
    let attribute = undefined
    if (attackId !== null) {
      const id = ~~attackId
      attribute = 'attacks'
      data = this.props.character.attacks.map((attack, i) => ({
        ...attack,
        isEditing: i === id ? !attack.isEditing : attack.isEditing,
      }))
    } else if (legendaryActionId !== null) {
      const id = ~~legendaryActionId
      attribute = 'legendary_actions'
      data = this.props.character.legendary_actions.map((attack, i) => ({
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
    } else if (featureId !== null) {
      const id = ~~featureId
      attribute = 'features_and_traits'
      data = this.props.character.features_and_traits.map((feat, i) => ({
        ...feat,
        isEditing: i === id ? !feat.isEditing : feat.isEditing,
      }))
    } else if (assetId !== null) {
      const id = ~~assetId
      attribute = 'assets'
      data = this.props.character.assets.map((asset, i) => ({
        ...asset,
        isEditing: i === id ? !asset.isEditing : asset.isEditing,
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
        this.props.onUpdateAttribute('is_npc', false)
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
        this.props.onUpdateAttribute('is_npc', true)
      }
    }
  }

  render () {
    const {
      character,
      onChange,
      runMacro,
      executeMacro,
    } = this.props

    const {
      isAdvantage,
      tab,
      isEditing,
      isNPC,
    } = this.state

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
                    {character.speed_walk && (
                      <li>
                        <strong>Speed</strong>
                        {` ${character.speed_walk} ft`}
                        {character.speed_swim && `, Swim ${character.speed_swim} ft`}
                        {character.speed_climb && `, Swim ${character.speed_climb} ft`}
                        {character.speed_fly && `, Fly ${character.speed_walk} ft`}
                      </li>
                    )}
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
                            data-macro={`!r 1d20+@me.${attr.toLowerCase()}_mod "${attr} Save"`}
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
                            data-macro={`!r 1d20+@me.${skill.code} "${skill.name}"`}
                            data-as={character.key}
                          >
                            {skill.name} +{character[skill.code]}
                          </a>
                        </span>
                      ))}
                    </li>
                    {false && (<li><strong>Damage Immunities</strong> {character.damage_immunities}</li>)}
                    {character.languages && character.languages.length > 0 && (
                      <li><strong>Languages</strong> {character.languages.join(', ')}</li>
                    )}
                    <li><strong>Challenge</strong> {character.cr} ({character.xp})</li>
                  </ul>
                </div>
                {character.attacks && character.attacks.length > 0 && (
                  <div className='npc-section'>
                    <h1 className='npcName'>Actions</h1>
                    {character.attacks.map((action, i) => (
                    <div
                      onClick={runMacro}
                      data-macro={`!template attack ${JSON.stringify(action)}`}
                      data-as={character.key}
                      key={`npc-action-${i}`}
                      className='action'
                    >
                      <h2>{action.name}</h2>
                      <p>{action.description}</p>
                    </div>
                    ))}
                  </div>
                )}

                {character.legendary_actions && character.legendary_actions.length > 0 && (
                  <div className='npc-section'>
                    <h1 className='npcName'>Legendary Actions</h1>
                    {character.legendary_actions.map((action, i) => (
                    <div key={`npc-legendary-action-${i}`} className='action'>
                      <h2>{action.name}</h2>
                      <p>{action.description}</p>
                    </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {isEditing && (
              <div className='col-1'>
                <div className='npc-edit-section'>
                  <div className='flex'>
                    <label>
                      <input
                        defaultValue={character.name}
                        name='name'
                        onChange={onChange}
                        type='text'
                      />

                      Character Name
                    </label>
                  </div>

                  <div className='flex'>
                    <label>
                      <input
                        defaultValue={character.cr}
                        name='cr'
                        onChange={onChange}
                        placeholder=''
                        type='number'
                      />

                      Challenge
                    </label>

                    <label>
                      <select
                        defaultValue={character.tile_size || '1'}
                        name='tile_size'
                        onChange={onChange}
                      >
                        <option value='0'>Tiny</option>
                        <option value='1'>Small</option>
                        <option value='2'>Medium</option>
                        <option value='4'>Large</option>
                        <option value='5'>Huge</option>
                        <option value='6'>Gargantuan</option>
                      </select>

                      Size
                    </label>

                    <label>
                      <select
                        defaultValue={character.type}
                        name='type'
                        onChange={onChange}
                      >
                        <option value="aberration">aberration</option>
                        <option value="beast">beast</option>
                        <option value="celestial">celestial</option>
                        <option value="construct">construct</option>
                        <option value="dragon">dragon</option>
                        <option value="elemental">elemental</option>
                        <option value="fey">fey</option>
                        <option value="fiend">fiend</option>
                        <option value="giant">giant</option>
                        <option value="humanoid">humanoid</option>
                        <option value="monstrosity">monstrosity</option>
                        <option value="ooze">ooze</option>
                        <option value="plant">plant</option>
                        <option value="swarm-of-tiny-beasts">swarm of tiny beasts</option>
                        <option value="undead">undead</option>
                      </select>

                      Type
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
                        defaultValue={character.ac}
                        name='ac'
                        onChange={onChange}
                        type='text'
                      />

                      Armor Class
                    </label>
                  </div>

                  <div className='flex'>
                    <label>
                      <input
                        defaultValue={character.speed_walk}
                        name='speed_walk'
                        placeholder='0'
                        onChange={onChange}
                        type='text'
                      />

                      Speed
                    </label>

                    <label>
                      <input
                        defaultValue={character.speed_climb}
                        name='speed_climb'
                        placeholder='0'
                        onChange={onChange}
                        type='text'
                      />

                      Climb
                    </label>

                    <label>
                      <input
                        defaultValue={character.speed_swim}
                        name='speed_swim'
                        placeholder='0'
                        onChange={onChange}
                        type='text'
                      />

                      Swim
                    </label>

                    <label>
                      <input
                        defaultValue={character.speed_fly}
                        name='speed_fly'
                        onChange={onChange}
                        placeholder='0'
                        type='text'
                      />

                      Fly
                    </label>
                  </div>

                  <div className='flex'>
                    <label>
                      <input
                        defaultValue={character.hp}
                        name='hp'
                        onChange={onChange}
                        type='number'
                      />

                      HP
                    </label>

                    <label>
                      <input
                        defaultValue={character.hp_formula}
                        name='hp_formula'
                        onChange={onChange}
                        placeholder='e.g. 10d12'
                        type='text'
                      />

                      HP Formula
                    </label>
                  </div>
                </div>

                <div className='npc-edit-section'>
                  <h2>Abilities</h2>

                  <div className='flex'>
                    {attributes.map((attr, i) => (
                      <label key={`npc-attribute-${i}`}>
                        <input
                          defaultValue={character[attr.toLowerCase()]}
                          name={attr.toLowerCase()}
                          onChange={onChange}
                          placeholder='0'
                          type='number'
                        />

                        {attr}
                      </label>
                    ))}
                  </div>
                </div>

                <div className='npc-edit-section'>
                  <h2>Saving Throws</h2>

                  <div className='flex'>
                    {attributes.map((attr, i) => (
                      <label key={`npc-saving-attribute-${i}`}>
                        <input
                          defaultValue={character[`${attr.toLowerCase()}_save`]}
                          name={`${attr.toLowerCase()}_save`}
                          onChange={onChange}
                          placeholder='0'
                          type='number'
                        />

                        {attr}
                      </label>
                    ))}
                  </div>
                </div>

                <div className='npc-edit-section'>
                  <h2>Skills</h2>

                  <div className='flex'>
                    {skills.slice(0, 9).map((skill, i) => (
                      <label key={`npc-skill-${skill.code}`}>
                        <input
                          defaultValue={character[skill.code]}
                          name={skill.code}
                          onChange={onChange}
                          placeholder='0'
                          type='number'
                        />

                        {skill.name}
                      </label>
                    ))}
                  </div>

                  <div className='flex'>
                    {skills.slice(9, skills.length).map((skill, i) => (
                      <label key={`npc-skill-${skill.code}`}>
                        <input
                          defaultValue={character[skill.code]}
                          name={skill.code}
                          onChange={onChange}
                          placeholder='0'
                          type='number'
                        />

                        {skill.name}
                      </label>
                    ))}
                  </div>

                  <div className='section'>
                    <h3>Languages</h3>

                    {languages.map((lang, i) => (
                      <label key={`npc-language-${i}`}>
                        <input
                          name='languages'
                          onChange={this.onToggleCheckbox}
                          type='checkbox'
                          value={lang}
                          defaultChecked={character.languages && character.languages.indexOf(lang) >= 0}
                        />

                        {lang}
                      </label>
                    ))}
                  </div>

                  {/** Todo **/}
                  {false && (
                  <Fragment>
                    <div className='section'>
                      <h3>Damage Resistance</h3>
                    </div>

                    <div className='section'>
                      <h3>Damage Immunity</h3>
                    </div>

                    <div className='section'>
                      <h3>Damage Vulnerability</h3>
                    </div>

                    <div className='section'>
                      <h3>Condition Immunity</h3>
                    </div>
                  </Fragment>
                  )}
                </div>

                <div className='npc-edit-section'>
                  <div className='flex'>
                    <label>
                      Character Description

                      <textarea
                        defaultValue={character.description}
                        name='description'
                        onChange={onChange}
                        type='text'
                      />
                    </label>
                  </div>
                </div>

                <div className='npc-edit-section'>
                  <h2>Actions</h2>

                  {character.attacks.map((attack, i) => (
                    <Attack
                      onSubmit={this.onChangeAttack}
                      attack={attack}
                      key={`attack-${i}`}
                      executeMacro={executeMacro}
                      character={character}
                      index={i}
                      isNPC={true}
                      isEditing={attack.isEditing}
                      onDelete={this.onRemoveTool}
                    />
                  ))}
                  
                  <div onClick={this.onAddAttack} className='add'>
                    <a>
                      + Add Attack
                    </a>
                  </div>
                </div>

                <div className='npc-edit-section'>
                  <h2>Legendary Actions</h2>

                  {character.legendary_actions.map((attack, i) => (
                    <Attack
                      onSubmit={this.onChangeLegendaryAction}
                      attack={attack}
                      key={`legendary-action-${i}`}
                      executeMacro={executeMacro}
                      character={character}
                      index={i}
                      isNPC={true}
                      isLegendaryAction={true}
                      isEditing={attack.isEditing}
                      onDelete={this.onRemoveTool}
                    />
                  ))}
                  
                  <div onClick={this.onAddLegendaryAction} className='add'>
                    <a>
                      + Add Attack
                    </a>
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
                        data-macro={`!r 1d20+@me.${attr.toLowerCase()}_mod "${attr}"`}
                        data-as={character.key}
                      >
                        {attr}
                      </span>

                      <input
                        value={`${character[attr.toLowerCase() + '_mod']}`}
                        name={`${attr.toLowerCase()}_mod`}
                        placeholder='0'
                        disabled={true}
                        type='number'
                        className='large'
                      />

                      <div className='mod'>
                        <input
                          defaultValue={character[attr.toLowerCase()]}
                          name={attr.toLowerCase()}
                          onChange={onChange}
                          placeholder='0'
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
                        value={character.proficiency_bonus}
                        name='proficiency_bonus'
                        placeholder='0'
                        disabled={true}
                        type='number'
                      />
                    </div>

                    <label>
                      Proficiency Bonus
                    </label>
                  </div>
                  <div className='list'>
                    {attributes.map((attr) => (
                      <Attribute
                        attribute={attr}
                        code={attr.toLowerCase()}
                        macroCode={`${attr.toLowerCase()}_mod`}
                        character={character}
                        key={`saving-throw-${attr}`}
                        onChange={onChange}
                        runMacro={runMacro}
                        score={character[`${attr.toLowerCase()}_mod`]}
                        isSave={true}
                      />
                    ))}

                    <h4>Saving Throws</h4>
                  </div>

                  <div className='list'>
                    {skills.map((skill) => (
                      <Attribute
                        attribute={skill.name}
                        code={skill.code}
                        macroCode={`${skill.type.toLowerCase()}_mod`}
                        character={character}
                        key={`attribute-${skill.name}`}
                        onChange={onChange}
                        runMacro={runMacro}
                        score={character[`${skill.type.toLowerCase()}_mod`] || 0}
                        type={skill.type}
                      />

                    ))}

                    <h4>Skills</h4>
                  </div>
                </div>
              </div>

              <div className='proficiency'>
                <div className='bonus'>
                  <input
                    defaultValue={(Number(character.passive_wisdom) || 0) + (Number(character.wisdom_mod) || 0)}
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
                  <table cellPadding={0} cellSpacing={0}>
                    <thead>
                      <tr>
                        <td>Tool</td>
                        <td>Proficiency</td>
                        <td>Attribute</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {character.tools_and_skills.map((tool, i) => (
                        <tr
                          className={tool.isEditing && 'editable'}
                          key={`tool-proficiency-${i}`}
                        >
                          <td
                            onClick={!tool.isEditing ? runMacro : undefined}
                            data-macro={
                              tool.bonus == 0
                                ? `!r 1d20+@me.${tool.attribute.toLowerCase()}_mod+@me.proficiency_bonus+${tool.mod || 0} "${tool.name} (+${character.proficiency_bonus} Proficiency)"`
                                : (tool.bonus == 1
                                  ? `$bonus = @me.proficiency_bonus * 2 | !r 1d20+@me.${tool.attribute.toLowerCase()}_mod+$bonus+${tool.mod || 0} "${tool.name} (+${(Number(character.proficiency_bonus) || 0) * 2} Proficiency)"`
                                  : `!r 1d20+@me.${tool.attribute.toLowerCase()}_mod+${tool.mod || 0} "${tool.name}"`
                                )
                            }
                            data-as={character.key}
                          >
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
                          <td
                            onClick={!tool.isEditing ? runMacro : undefined}
                            data-macro={
                              tool.bonus == 0
                                ? `!r 1d20+@me.${tool.attribute.toLowerCase()}_mod+@me.proficiency_bonus+${tool.mod || 0} "${tool.name} (+${character.proficiency_bonus} Proficiency)"`
                                : (tool.bonus == 1
                                  ? `$bonus = @me.proficiency_bonus * 2 | !r 1d20+@me.${tool.attribute.toLowerCase()}_mod+$bonus+${tool.mod || 0} "${tool.name} (+${(Number(character.proficiency_bonus) || 0) * 2} Proficiency)"`
                                  : `!r 1d20+@me.${tool.attribute.toLowerCase()}_mod+${tool.mod || 0} "${tool.name}"`
                                )
                            }
                            data-as={character.key}
                          >
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
                                <option value={2}>Not Proficient</option>
                                <option value={3}>Jack of all Trades</option>
                              </select>
                              ) : (
                                <span>
                                  {tool.bonus == 0 && 'Proficient'}
                                  {tool.bonus == 1 && 'Expertise'}
                                  {tool.bonus == 2 && 'Not Proficient'}
                                  {tool.bonus == 3 && 'Jack of all Trades'}
                                </span>
                              )}
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
                          <td
                            onClick={!tool.isEditing ? runMacro : undefined}
                            data-macro={
                              tool.bonus == 0
                                ? `!r 1d20+@me.${tool.attribute.toLowerCase()}_mod+@me.proficiency_bonus+${tool.mod || 0} "${tool.name} (+${character.proficiency_bonus} Proficiency)"`
                                : (tool.bonus == 1
                                  ? `$bonus = @me.proficiency_bonus * 2 | !r 1d20+@me.${tool.attribute.toLowerCase()}_mod+$bonus+${tool.mod || 0} "${tool.name} (+${(Number(character.proficiency_bonus) || 0) * 2} Proficiency)"`
                                  : `!r 1d20+@me.${tool.attribute.toLowerCase()}_mod+${tool.mod || 0} "${tool.name}"`
                                )
                            }
                            data-as={character.key}
                          >{tool.attribute}{tool.mod != 0 && `+${tool.mod}`}</td>
                          )}
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
                      <tr>
                        <td onClick={this.onAddTool} colSpan={3} className='add'>
                          <a>
                            + Add Item
                          </a>
                        </td>
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
                  <table cellPadding={0} cellSpacing={0} className='proficiencies'>
                    <thead>
                      <tr>
                        <td>Type</td>
                        <td>Label</td>
                        <td></td>
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
                      <tr>
                        <td onClick={this.onAddProficiency} colSpan={3} className='add'>
                          <a>
                            + Add Item
                          </a>
                        </td>
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
                    data-macro={`!r 1d20+@me.dexterity_mod "Initiative"`}
                    data-as={character.key}
                    className='macro'
                  >
                    Initiative
                  </h4>
                </div>

                <div className='attribute'>
                  <input
                    defaultValue={character.darkvision}
                    name='darkvision'
                    onChange={onChange}
                    className='large'
                    placeholder='0'
                    type='number'
                  />

                  <h4>Darkvision</h4>
                </div>
              </div>

              <div className='col-2'>
                <div className='attribute attribute-sub'>
                  <input
                      defaultValue={character.speed_walk}
                      name='speed_walk'
                      onChange={onChange}
                      className='large'
                      placeholder='0'
                      type='number'
                  />

                  <h4>Speed</h4>
                </div>
                <div className='attribute attribute-sub'>
                  <input
                      defaultValue={character.speed_climb}
                      name='speed_climb'
                      onChange={onChange}
                      className='large'
                      placeholder='0'
                      type='number'
                  />

                  <h4>Climb</h4>
                </div>
                <div className='attribute attribute-sub'>
                  <input
                      defaultValue={character.speed_swim}
                      name='speed_swim'
                      onChange={onChange}
                      className='large'
                      placeholder='0'
                      type='number'
                  />

                  <h4>Swim</h4>
                </div>
                <div className='attribute attribute-sub'>
                  <input
                      defaultValue={character.speed_fly}
                      name='speed_fly'
                      onChange={onChange}
                      className='large'
                      placeholder='0'
                      type='number'
                  />

                  <h4>Fly</h4>
                </div>
              </div>

              <div className='col-2'>
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
                    ref='hp'
                    onChange={onChange}
                    className='large'
                    placeholder='0'
                    type='number'
                  />

                  <h4>Current Hit Points</h4>
                </div>

                  <div className='attribute attribute-sub'>
                    <div className='death-saves'>
                    <div className='col-2'>
                      <label>
                        Successes<br />

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
                        Failures<br />

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
                    </div>

                    <h4>Death Saves</h4>
                  </div>
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
                  <input
                      defaultValue={character.hp_tmp}
                      name='hp_tmp'
                      onChange={onChange}
                      className='large'
                      placeholder='0'
                      type='number'
                  />

                  <h4>Temporary HP</h4>
                </div>

                <div className='attribute attribute-sub'>
                  <input
                      defaultValue={character.hp_mod}
                      name='hp_mod'
                      onChange={onChange}
                      className='large'
                      placeholder='0'
                      type='number'
                  />

                  <h4>Max HP Mod</h4>
                </div>
              </div>

              <div className='list attacks'>
                <h4>Attacks &amp; Spellcasting</h4>

                {character.attacks.map((attack, i) => (
                  <Attack
                    onSubmit={this.onChangeAttack}
                    attack={attack}
                    key={`attack-${i}`}
                    executeMacro={executeMacro}
                    character={character}
                    index={i}
                    isEditing={attack.isEditing}
                    onDelete={this.onRemoveTool}
                  />
                ))}
                
                <div onClick={this.onAddAttack} className='add'>
                  <a>
                    + Add Attack
                  </a>
                </div>
              </div>

              <div className='list attacks'>
                <div className='tables flex'>
                  <table cellPadding={0} cellSpacing={0}>
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Weight</td>
                        <td></td>
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
                      <tr>
                        <td onClick={this.onAddEquipment} colSpan={3} className='add'>
                          <a>
                            + Add Item
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
                <h4>Equipment</h4>

                <div className='currency'>
                  <div className='attribute'>
                    <input
                      defaultValue={character.cp}
                      name='cp'
                      onChange={onChange}
                      placeholder='0'
                      type='number'
                    />

                    <h4>CP</h4>
                  </div>

                  <div className='attribute'>
                    <input
                      defaultValue={character.sp}
                      name='sp'
                      onChange={onChange}
                      placeholder='0'
                      type='number'
                    />

                    <h4>SP</h4>
                  </div>

                  <div className='attribute'>
                    <input
                      defaultValue={character.gp}
                      name='gp'
                      onChange={onChange}
                      placeholder='0'
                      type='number'
                    />

                    <h4>GP</h4>
                  </div>

                  <div className='attribute'>
                    <input
                      defaultValue={character.ep}
                      name='ep'
                      onChange={onChange}
                      placeholder='0'
                      type='number'
                    />

                    <h4>EP</h4>
                  </div>

                  <div className='attribute'>
                    <input
                      defaultValue={character.pp}
                      name='pp'
                      onChange={onChange}
                      placeholder='0'
                      type='number'
                    />

                    <h4>PP</h4>
                  </div>
                </div>
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

              <div className='list'>
                <div className='table'>
                  <table cellPadding={0} cellSpacing={0}>
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Current</td>
                        <td>Max</td>
                        <td></td>
                      </tr>
                    </thead>
                    {character.assets.map((asset, i) => (
                      <Asset
                        {...asset}
                        i={i}
                        onChange={this.onChange}
                        onAdjust={this.onAdjustAsset}
                        onRemoveTool={this.onRemoveTool}
                        onToggleEditing={this.onToggleEditing}
                        runMacro={runMacro}
                      />
                    ))}
                  </table>
                  <div onClick={this.onAddAsset} className='add'>
                    <a>
                      + Add Item
                    </a>
                  </div>
                </div>
                <h4>
                  Assets
                </h4>
              </div>

              <div className='attribute features-and-traits'>
                <h4>Features &amp; Traits</h4>
                {character.features_and_traits.map((feature, i) => (
                  <Feature
                    {...feature}
                    i={i}
                    key={`feature-${i}`}
                    onChange={this.onChange}
                    onRemoveTool={this.onRemoveTool}
                    onToggleEditing={this.onToggleEditing}
                    runMacro={runMacro}
                  />
                ))}
                <div onClick={this.onAddFeature} className='add'>
                  <a>
                    + Add Item
                  </a>
                </div>
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

          .npc-edit-section {
            border-radius: 3px;
            margin: 6px 0;
            padding: 12px;
            border: 1px solid ${color.grey[700]};
          }

          .npc-edit-section h2 {
            color: ${color.grey[50]};
            font-size: 18px;
            margin: 0 0 12px 0;
          }

          .npc-edit-section h3 {
            color: ${color.grey[50]};
            font-size: 16px;
            margin: 12px 0;
          }

          .npc-edit-section .flex {
            flex-wrap: wrap;
          }

          .npc-edit-section label {
            margin: 0 3px;
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

          .character-sheet select,
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

          .character-sheet select {
          }

          .character-sheet select option {
            color: ${color.grey[950]};
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
            padding: 8px 0;
            display: block;
          }

          .character-sheet .death-saves label {
            padding: 0 4px;
            display: block;
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

          .character-sheet table tbody tr a {
            color: ${color.grey[50]};
          }

          .character-sheet table tbody tr:hover {
            cursor: pointer;
            color: ${color.yellow[500]};
            background-color: ${color.grey[700]};
          }

          .character-sheet table tbody tr:hover a {
            color: ${color.grey[50]};
          }

          .character-sheet table tbody tr:hover a:hover {
            color: ${color.yellow[500]};
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

          .character-sheet .add:hover {
            cursor: pointer;
          }

          .character-sheet .add:hover a {
            color: ${color.yellow[500]};
            cursor: pointer;
          }

          .character-sheet table.edit {
            flex: inherit;
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

          .currency {
            border-top: 1px solid ${color.grey[700]};
            margin-top: 12px;
            padding-top: 0px;
            display: flex;
          }

          .currency .attribute {
            border: 0;
          }

          .action {
            margin-top: 12px;
            color: ${color.grey[100]};
          }

          .action:hover {
            cursor: pointer;
          }

          .action:hover h2 {
            color: ${color.yellow[500]};
          }

          .action p,
          .action h2 {
            margin: 0;
          }

          .action h2 {
            font-size: 16px;
            color: ${color.grey[50]};
          }
          .action p {
            font-size: 13px;
          }
        `}</style>
      </div>
    )
  }
}
