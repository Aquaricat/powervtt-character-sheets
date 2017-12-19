import React, { Component, Fragment } from 'react'
import { color } from '../styles'

export default class Feature extends Component {
  constructor (props) {
    super(...arguments)
  }

  render () {
    const {
      name,
      source,
      type,
      i,
      description,
      onChange,
      isEditing,
      onToggleEditing,
    } = this.props

    return (
      <div className='feature'>
        {!isEditing && (
          <div className='info'>
            <h3>{name}</h3>
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
                  data-feature-id={i}
                  name='name'
                />
              </label>

              <div className='inline'>
                <label>
                  Source
                  <select
                    data-feature-id={i}
                    placeholder=''
                    name='source'
                    onChange={onChange}
                    defaultValue={source}
                  >
                    <option value='Racial'>Racial</option>
                    <option value='Class'>Class</option>
                    <option value='Feat'>Feat</option>
                    <option value='Background'>Background</option>
                    <option value='Other'>Other</option>
                  </select>
                </label>
                <label>
                  Source Type
                  <input
                    type='text'
                    onChange={onChange}
                    defaultValue={type}
                    data-feature-id={i}
                    name='type'
                    placeholder='Dwarf/Fighter/2nd Level'
                  />
                </label>
              </div>

              <label>
                Description
                <textarea
                  onChange={onChange}
                  placeholder='Description (optional)'
                  defaultValue={description}
                  data-feature-id={i}
                  rows={6}
                  name='description'
                />
              </label>
            </div>
            <div className='actions'>
              <a data-feature-id={i} onClick={onToggleEditing}>Save</a>
            </div>
          </Fragment>
        )}

        <style jsx>{`
          .info {
            padding: 6px;
          }

          h3, h4 {
            margin: 0;
            font-family: 'Spectral SC', serif;
          }

          h3 {
            color: ${color.yellow[500]};
            font-size: 18px;
            line-height: 21px;
            margin-top: 6px;
          }

          h4 {
            color: ${color.grey[200]};
            font-size: 14px;
            line-height: 18px;
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
            font-size: 14px;
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
        `}</style>
      </div>
    )
  }
}
