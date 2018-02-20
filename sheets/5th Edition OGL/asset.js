import React, { Component } from 'react'
import { color } from '../styles'

export default class Asset extends Component {
  constructor (props) {
    super(...arguments)
  }

  render() {
    const {
      current,
      description,
      i,
      isEditing,
      maximum,
      name,
      onChange,
      onAdjust,
      onRemoveTool,
      onToggleEditing,
      runMacro
    } = this.props

    return (
      <tr
        className={isEditing && 'editable'}
        key={`asset-${i}`}
      >
        <td>
        {isEditing ? (
          <input
            data-asset-id={i}
            type='text'
            placeholder='Name'
            name='name'
            defaultValue={name}
            onChange={onChange}
          />
        ) : name }
        </td>
        <td>
        {isEditing ? (
          <input
            data-asset-id={i}
            type='number'
            placeholder='0'
            name='current'
            defaultValue={current}
            onChange={onChange}
          />
        ) : (
          <div>
            <a data-asset-id={i} data-asset-adjust={current - 1} onClick={onAdjust}>-</a> {current} <a data-asset-id={i} data-asset-adjust={current + 1} onClick={onAdjust}>+</a>
          </div>
        )}
        </td>
        <td>
        {isEditing ? (
          <input
            data-asset-id={i}
            type='number'
            placeholder='0'
            name='maximum'
            defaultValue={maximum}
            onChange={onChange}
          />
        ) : maximum }
        </td>
        <td className='actions'>
          <a data-asset-id={i} onClick={onToggleEditing}>
            {isEditing ? 'Save' : 'Edit'}
          </a>
          {isEditing && (
            <a data-asset-id={i} onClick={onRemoveTool} className='warning'>
            Delete
            </a>
          )}
        </td>

        <style jsx>{`
          td {
            vertical-align: top;
            padding: 3px;
            width: 100%;
          }

          td:first-child {
            max-width: inherit;
          }

          td div.assetActions {
            float: right;
          }

          input {
            background-color: transparent;
            border: 0px;
            border-bottom: 1px solid ${color.grey[700]};
            color: ${color.text['primary']};
            display: block;
            flex: 1;
            font-size: 12px;
            min-width: inherit;
            outline: 0;
            padding: 0px;
            transition: border 0.15s ease-out;
            width: 55px;
          }

          tr {
            transition: background 0.15s ease-out;
          }

          tr a {
            color: ${color.grey[50]};
          }

          tr:hover {
            cursor: pointer;
            color: ${color.yellow[500]};
            background-color: ${color.grey[700]};
          }

          tr:hover a {
            color: ${color.grey[50]};
          }

          tr:hover a:hover {
            color ${color.yellow[500]};
          }

          tr.editable:hover {
            cursor: inherit;
            background-color: transparent;
            color: inherit;
          }

          tr.editable a {
            font-size: 10px;
            margin-right: 3px;
          }

          tr.editable a:last-child {
            margin-right: 0px;
          }

          tr.editable a:hover {
            color: ${color.yellow[500]};
            cursor: pointer;
          }

          tr.editable a.warning {
            margin-left: 3px;
          }

          tr.editable a.warning:hover {
            color: ${color.error};
          }

          tr td {
            text-align: center;
          }

          tr td:first-child {
            text-align: left;
          }
        `}</style>
      </tr>
    )
  }
}
