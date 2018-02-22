import React, { Component } from 'react'
import _find from 'lodash/collection/find'
import _forEach from 'lodash/collection/forEach'
import _includes from 'lodash/collection/includes'
import _isObject from 'lodash/collection/isObject'
import _isString from 'lodash/lang/isString'
import _orderBy from 'lodash/collection/orderBy'
import _remove from 'lodash/array/remove'
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
   * @returns JSON object containing roll results.
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
      prof,
      range,
    } = this.props.roll

    const {
      onRollsComplete,
    } = this.props

    let rBonus = 0
    let rCount = 1
    let rDetail = ''

    // Determine how many times to roll the dice.
    if ( advantage !== false ) {
      if ( advantage >= 3 || advantage <= -3 ) {
        rCount = Number(advantage)
      } else if ( ( advantage > 0 && advantage < 3 )
        || ( advantage < 0 && advantage > -3 ) ) {
        rCount = 2
      }
    }

    // Determine proficiency bonus.
    if ( prof !== false ) {
      const pb = (Number(pbMult) === 0.5) ?
        Math.floor(prof.base * Number(prof.mult)) : prof.base * prof.mult
      if ( pb !== 0 ) {
        rBonus += pb
        rDetail += this.formatBonus(pb, 'PB')
      }
    }

    // Determine modifier bonus.
    if ( mod !== false && mod !== 0 ) {
      rBonus += mod
      rDetail += this.formatBonus(mod, 'Mod')
    }

    // Process bonuses.
    if ( bonuses !== false ) {
      _forEach(bonuses, (v) => {
        let bonus = 0
        let label = v.label
        if ( v.roll === false ) {
          // Straight bonus - no additional processing
          bonus = v.bonus
        } else if ( _isString(v.roll) ) {
          // Die roll bonus like Bless - call roll API
          const apiRoll = doApiRoll(v.roll)
          bonus = (apiRoll !== false) ?
            apiRoll.dice.value * v.bonus : 0;
        }
        if ( bonus !== 0 ) {
          rBonus += bonus
          rDetail += this.formatBonus(bonus, label)
        }
      })
    }

    // Call API, and make main rolls.
    const apiRolls = []
    for ( i = 0; i < rCount; i++ ) {
      const apiRoll = doApiRoll(die).roll
      if ( apiRoll !== false ) {
        const apiDice = apiRoll.dice

        let rData = {
          isCF: ( crit && crit.fail && _includes(crit.fail, dice.value)),
          isCS: ( crit && crit.success && _includes(crit.success, dice.value) ),
          isDimmed: false,
          isValid: ( _isString(dice.id) && _isString(dice.timestamp) ),
          total: 0,
          xpand: [],
        }

        // Process any rerolled dice
        const cleanDice = []
        _forEach(apiDice, (d) => {
          const cleanDie = {}

          if ( !d.is_rerolled ) { // Die wasn't rerolled
            cleanDie.id = d.id
            cleanDie.value = d.value
            cleanDie.label = false
            cleanDie.timestamp = d.timestamp
            cleanDie.is_dropped = d.is_dropped
            cleanDie.is_successful = d.is_successful
          } else if ( d.is_rerolled ) { // Die was rerolled
            const rrDie = {}
            this.fetchRerolls(apiDice, d.id, rrDie)

            cleanDie.id = rrDie.id
            cleanDie.value = rrDie.value
            cleanDie.timestamp = rrDie.timestamp
            cleanDie.is_dropped = rrDie.is_dropped
            cleanDie.is_successful = rrDie.is_successful
            cleanDie.label = `:(${rrDie.list.join('=>')})`
          }

          cleanDice[] = cleanDie
        })

        // Order the dice, by value and timestamp
        const orderedDice =
          _orderBy(cleanDice, ['value', 'timestamp'], ['asc', 'asc'])

        // Record expanded results, and set ceil, floor.
        let xtotal = 0
        const xpand = []
        _forEach(orderedDice, (v) => {
          if ( range !== false ) {
            let dRange = 0
            if ( range.max && (range.max < v.value) ) {
              xtotal += range.max
              xpand[] = `${v.value}=>${range.max}${v.label ? v.label : ''}`
            } else if ( range.min && (range.min > v.value) ) {
              xtotal += range.min
              xpand[] = `${v.value}=>${range.min}${v.label ? v.label : ''}`
            } else {
              xtotal += v.value
              xpand[] =`${v.value}${v.label ? v.label : ''}`
            }
          } else {
            xtotal += v.value
            xpand[] = `${v.value}${v.label ? v.label : ''}`
          }
        })

        rData.total = xtotal
        rData.xpand = xpand.join(', ')

        apiRolls[] = rData
      }
    }

  }

  /**
   * Processes through the rolls looking for rerolled children
   *
   * @param {any} rolls Rolls from the API
   * @param {any} id ID of child
   * @param {any} die Temporary die to be fed back to cleaned list.
   * @memberof RollTemplate
   */
  fetchRerolls(rolls, id, die) {
    const roll = _find(rolls, (o) => {
      o.id === id
    })

    if ( _isObject(roll) ) {
      die.id = roll.id
      die.timestamp = roll.timestamp
      die.is_dropped = roll.is_dropped
      die.is_successful = roll.is_successful
      die.value = roll.value // Final value to add
      die.list[] = roll.value // List to show rerolls

      // Remove the processed child from the rolls to prevent dupes
      _remove(rolls, (o) => {
        return o.id === id
      })
      if ( roll.is_rerolled && _isString(roll.child) ) {
        this.fetchRerolls(rolls, roll.child, die)
      }
    }
  }

  /**
   * Returns +/- string for modifier formula
   *
   * @param {any} val Value to format.
   * @param {string} label Label for value.
   * @returns Formatted string.
   * @memberof RollTemplate
   */
  formatBonus(val, label) {
    let result = ` + ${val}`
    if ( val < 0 ) {
      result = ` - ${val * -1}`
    }

    return result += ` [${label}]`
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
            min-width: 25px;
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
