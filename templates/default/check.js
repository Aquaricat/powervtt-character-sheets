import React, { Component } from 'react'
import Roll from './pieces/roll'
import styles from './styles/styles'

export default class CheckTemplate extends Component {
  constructor (props) {
    super(...arguments)

    this.onRollsCompleted = this.onRollsCompleted.bind(this)

    this.state = {}
  }

  onRollsCompleted (e) {}

  render () {
    const roll = this.props.data.roll
    return (
      <div
        className={
          [
            'checkRoll',
            this.props.data.theme && this.props.data.theme
          ]
          .filter(e => !!e)
          .join(' ')}
        key={`check-${i}`}
      >
        <div className='crHeader'>
          <h1>{props.title}</h1>
          {props.sub ? (
            <ul className='crSubHeader'>
             {props.sub.left ? (
               <li className='crSubLine'>{props.sub.left}</li>
             ) : ''}
             {props.sub.right ? (
               <li className='crSubLine'>{props.sub.right}</li>
             ) : ''}
            </ul>
          ) : '' }
          {props.detail ? (
            <div className='crDetail'>
              {props.detail}
            </div>
          ) : '' }
        </div>
        <div className="crBody">
          <Roll
            advantage={roll.advantage}
            bonuses={roll.bonus}
            crit={roll.crit}
            die={roll.die}
            mod={roll.mod}
            onRollsComplete={this.onRollsCompleted}
            prof={roll.pb}
            range={roll.range}
          />
        </div>
        <style jsx>{`
          .checkRoll {}

          .checkRoll > .crHeader {}

          .checkRoll > .crHeader h1 {
            font-size: 20px;
            font-weight: bold;
            line-height: 25px;
            margin-bottom: 5px;
            text-align: center;
          }

          .checkRoll > .crHeader .crSubHeader {
            font-size: 14px;
            line-height: 16px;
            margin-bottom: 0px;
            text-align: center;
          }

          .checkRoll > .crHeader .crSubLine {
            display: inline-block;
          }
          .checkRoll > .crHeader .crSubLine:not(:first-child):before {
            content: ' &#x25C6; ';
          }

          .checkRoll > .crBody {}
        `}</style>
      </div>
    )
  }
}
