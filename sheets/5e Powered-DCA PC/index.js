import React, { Component }   from 'react'

import Attack                 from './lists/attack'
import Attribute              from './lists/attribute'
import Feature                from './lists/feature'
import Inventory              from './lists/inventory'
import Prof                   from './lists/Prof'
import Resource               from './lists/resource'
import Skill                  from './lists/skill'
import Tool                   from './lists/tool'

import { attributes }         from './data/attributes'
import { colors }             from './data/colors'

export default class CharacterSheet extends Component {
  constructor (props) {
    super(...arguments)

    this.onAddAsset           = this.onAddAsset.bind(this)
    this.onAddAttack          = this.onAddAttack.bind(this)
    this.onAddFeature         = this.onAddFeature.bind(this)
    this.onAddItem            = this.onAddItem.bind(this)
    this.onAddProf            = this.onAddProf.bind(this)
    this.onAddTool            = this.onAddTool.bind(this)

    this.onChange             = this.onChange.bind(this)

    this.onRemLine            = this.onRemLine.bind(this)

    this.state                = {
      isEditing: false,
      tab: 0,
    }
  }

  onChange (e) {
    const attr                = e.target.name
    const id                  = ~~e.target.getAttribute('data-line-id')
    const type                = e.target.getAttribute('data-line-type')
    const value               = e.target.value

    let data                  = undefined
    let sort                  = undefined
    let order                 = undefined
    switch (type) {
      case 'assets':
        sort = ['name']
        order = ['asc']
        data = this.props.character.assets.map((asset, i) => ({
          ...asset,
          current: i === id && attr === 'current' ? value : asset.current,
          maximum: i === id && attr === 'maximum' ? value : asset.maximum,
          name: i === id && attr === 'name' ? value : asset.name,
        }))
        break
      case 'attacks':
        data = this.props.character.attacks.map((atk, i) => ({
          ...atk,
          name: i === id && attr === 'name' ? value : atk.name,
        }))
        break
      case 'features':
        sort = ['lvl', 'src', 'name']
        order = ['asc', 'asc', 'asc']
        data = this.props.character.features.map((feat, i) => ({
          ...feat,
          ldesc: i === id && attr === 'ldesc' ? value : feat.ldesc,
          lvl: i === id && attr === 'lvl' ? value : feat.lvl,
          name: i === id && attr === 'name' ? value : feat.name,
          sdesc: i === id && attr === 'sdesc' ? value : feat.sdesc,
          src: i === id && attr === 'src' ? value : feat.src,
        }))
        break
      case 'items':
        sort = ['name']
        order = ['asc']
        data = this.props.character.items.map((item, i) => ({
          ...item,
          name: i === id && attr === 'name' ? value : item.name,
          qty: i === id && attr === 'qty' ? value : item.qty,
          wgt: i === id && attr === 'wgt' ? value : item.wgt,
        }))
        break
      case 'profs':
        sort = ['type', 'name']
        order = ['asc', 'asc']
        data = this.props.character.profs.map((prof, i) => ({
          ...prof,
          name: i === id && attr === 'name' ? value : prof.name,
          type: i === id && attr === 'type' ? value : prof.type,
        }))
        break
      case 'tools':
        sort = ['name']
        order = ['asc']
        data = this.props.character.tools.map((tool, i) => ({
          ...tool,
          bonus: i === id && attr === 'bonus' ? value : tool.bonus,
          name: i === id && attr === 'name' ? value : tool.name,
          mod: i === id && attr === 'mod' ? value : tool.mod,
          pb: i === id && attr === 'pb' ? value : tool.pb,
        }))
      default:
    }

    data = _.orderBy(data, sort, order)
  }

  onAddAttack () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'attacks',
        [
          ...this.props.character.attacks,
          {
            isEditing: true,
          },
        ],
      )
    }
  }

  onAddFeature () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'features',
        [
          ...this.props.character.features,
          {
            isEditing: true,
          },
        ],
      )
    }
  }

  onAddItem () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'items',
        [
          ...this.props.character.items,
          {
            isEditing: true,
          },
        ],
      )
    }
  }

  onAddProf () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'profs',
        [
          ...this.props.character.profs,
          {
            isEditing: true,
          },
        ],
      )
    }
  }

  onAddResource () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'resources',
        [
          ...this.props.character.resources,
          {
            isEditing: true,
          },
        ],
      )
    }
  }

  onAddTool () {
    if (this.props.onUpdateAttribute) {
      this.props.onUpdateAttribute(
        'tools',
        [
          ...this.props.character.tools,
          {
            isEditing: true,
          },
        ],
      )
    }
  }

  onRemLine () {}

  setValue(i, id, attr, target) {
    return (i === id && attr === target )
  }

}
