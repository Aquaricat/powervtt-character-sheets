import React, { Component } from 'react'
import _forEach from 'lodash/collection/forEach'
import _includes from 'lodash/collection/includes'
import _isString from 'lodash/lang/isString'
import _sortBy from 'lodash/collection/sortBy'
import { color } from '../styles/styles'

export default class RollTemplate extends Component {
  constructor (props) {
    super(...arguments)

    this.doApiRoll            = this.doApiRoll.bind(this)
    this.doRolls              = this.doRolls.bind(this)

    this.state                = {}
  }


  /**
   * Sends request to PVTT Roll API.
   *
   * @param {any} roll
   * @returns
   * @memberof RollTemplate
   */
  doApiRoll(roll) {
    let result = false

    return result
  }

/**
 * Processes through rolls to be displayed by
 *
 * @memberof RollTemplate
 */
doRolls () {
    const {
      advantage,
      bonuses,
      crit,
      die,
      mod,
      onRollsComplete,
      prof,
      range,
    } = this.props

    let rBonus = 0
    let rCount = 1
    let rDetail = ''

    // Determine how many times to roll the dice.
    if ( advantage >= 3 || advantage <= -3 ) {
      rCount = Number(advantage)
    } else if ( ( advantage > 0 && advantage < 3 )
      || ( advantage < 0 && advantage > -3 ) ) {
      rCount = 2
    }

    // Determine proficiency bonus.
    if ( prof !== false ) {
      let pb = (Number(pbMult) === 0.5) ?
        Math.floor(prof.base * Number(prof.mult)) : prof.base * prof.mult
      if ( pb > 0 ) {
        rDetail += ` + ${pb}`
      } else if ( pb < 0 ) {
        rDetail += ` - ${pb * -1}`
      }
      if ( pb !== 0 ) {
        rBonus += pb
        rDetail += ' [PB]'
      }
    }

    // Determine modifier bonus.
    if ( mod !== false ) {
      if ( mod > 0 ) {
        rDetail += ` + ${mod}`
      } else if ( mod < 0 ) {
        rDetail += ` - ${mod * -1}`
      }
      if ( mod !== 0 ) {
        rBonus += mod
        rDetail += ' [Mod]'
      }
    }

    // Process bonuses.
    if ( bonuses !== false ) {
      _forEach(bonuses, (v) => {
        let bonus = 0
        if ( v.roll === false ) {
          bonus = v.bonus
          if ( v.bonus > 0 ) {
            rDetail += ` + ${v.bonus}`
          } else if ( v.bonus < 0 ) {
            rDetail += ` - ${v.bonus * -1}`
          }
        } else {
          const apiRoll = doApiRoll(v.roll)
          bonus = (apiRoll !== false) ?
            apiRoll.rolls[0].dice.value * v.bonus : 0;
          if ( apiRoll !== false ) {
            if ( v.bonus > 0 ) {
              rDetail += ` + ${bonus}`
            } else if ( v.bonus < 0 ) {
              rDetail += ` - ${bonus * -1}`
            }
          }
        }
        rBonus += bonus
        rDetail += (bonus !== false) ? ` [${v.label}]` : ''
      })
    }

    // Make rolls.
    let apiRolls = []
    for ( i = 0; i < rCount; i++ ) {
      const apiRoll = doApiRoll(die)
      if ( apiRoll !== false ) {
        const dice = apiRoll.rolls[0]

        let rData = {
          isCF: ( crit && crit.fail && _includes(crit.fail, dice.value)),
          isCS: ( crit && crit.success && _includes(crit.success, dice.value) ),
          isDimmed: false,
          isValid: ( _isString(dice.id) && _isString(dice.timestamp) ),
          total: 0,
          xpand: [],
        }

        // Record expanded results, and set ceil, floor.
        let xtotal = 0
        let xpand = []
        _sortBy(dice.dice, ['value'])
        _forEach(dice.dice, (v) => {
          if ( range !== false ) {
            let dRange = 0
            if ( range.max && (range.max < v.value) ) {
              xtotal += range.max
              xpand[] = `${v.value}=>${range.max}`
            } else if ( range.min && (range.min > v.value) ) {
              xtotal += range.min
              xpand[] = `${v.value}=>${range.min}`
            } else {
              xtotal += v.value
              xpand[] =`${v.value}`
            }
          } else {
            xtotal += v.value
            xpand[] = v.value
          }
        })

        rData.total = xtotal
        rData.xpand = xpand.join('+')

        apiRolls[] = rData
      }
    }

  }

  render () {
    const sep = ' | '

    return (
      <ul className='rollResults'>
        {this.state.rolls.map((roll, i) => (
          <li
            className={
              [
                'rrResult',
                roll.isCF && 'cFail',
                roll.isCS && 'cSuccess',
                roll.isDimmed && 'isDimmed'
              ]
              .filter(e => !!e)
              .join(' ')}
            key={`rollResult-${i}`}
          >
            {( roll.isValid ) ? (
              <i className='ra ra-perspective-dice-random ra-fw'></i>
            ) : '' }
            {roll.total}
          </li>
        ))}
        <style jsx>{`
          .rollResults {
            display: inline-block;
            list-style: none;
          }

          .rollResults > .ra {
            margin-right: 5px;
          }

          .rollResults > .rrResult {
            background-color: ${color.roll.bg};
            border: 1px solid ${color.roll.border};
            border-radius: 5px;
            color: ${color.roll.fg.normal};
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
            margin: 0px;
            padding: 0px 7px;
          }

          .rollResults > .rrResult.cFail {
            background-color: ${color.roll.crit.fail}
          }

          .rollResults > .rrResult.isDimmed {
            color: ${color.roll.fg.dimmed};
            font-weight: lighter;
          }

          .rollResults > .rrResult.cSuccess {
            background-color: ${color.roll.crit.success}
          }

          .rollResults > .rrResult:not(:first-child):before {
            content: '${sep}';
          }

        `}</style>
      </ul>
    )
  }
}
