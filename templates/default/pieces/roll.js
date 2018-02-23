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
      const apiRoll = doApiRoll(die)
      if ( apiRoll !== false ) {
        const dirtyDice = apiRoll.roll.dice
        const cleanDice = []
        const cleanIds = []

        // Deal with the rerolled dice first.
        _forEach(dirtyDice, (d) => {
          // Rerolled only, and skip ones we've already done.

          if ( d.is_rerolled && !_includes(cleanIds, d.id) ) {
            cleanIds.push(d.id) // Add to list of cleaned IDs

            // Copy the data of the initial roll over.
            const cleanDie = {
              id:               d.id,
              value:            d.value,
              label:            false,
              timestamp:        d.timestamp,
              is_dropped:       d.is_dropped,
              is_successful:    d.is_successful,
              list:             [`${d.value}`],
            }

            // Seek through the rest of the rolls for children
            let rrChild = d.child
            while ( rrChild !== false ) {
              const childDie = _find(dirtyDice, (o) => {
                return o.id === rrChild
              })

              // Update with new data from child die.
              cleanDie.id             = childDie.id
              cleanDie.value          = childDie.value
              cleanDie.timestamp      = childDie.timestamp
              cleanDie.is_dropped     = childDie.is_dropped
              cleanDie.is_successful  = childDie.is_successful
              cleanDie.list.push(`${childDie.value}`)

              cleanIds.push(childDie.id) // Add to list of cleaned IDs

              // If we're on the winning roll, stop, else loop.
              rrChild = childDie.child || false
            }

            // Join the rerolls into a list and add to label.
            const rrList = (cleanDie.list.length > 1)
              ? `:(${cleanDie.list.join(', ')})` : ''
            cleanDie.label = `${cleanDie.value}${rrList}`

            // Add to the collection of cleaned dice.
            cleanDice.push(cleanDie)
          }
        })

        // Remove the dice we've processed from the batch.
        _remove(dirtyDice, (o) => {
          return _.includes(cleanIds, o.id)
        })

        // Now process the dice that didn't need a reroll
        if (dirtyDice.length > 0) {
          _forEach(dirtyDice, (d) => {
            const cleanDie = {
              id:               d.id,
              value:            d.value,
              label:            `${d.value}`,
              timestamp:        d.timestamp,
              is_dropped:       d.is_dropped,
              is_successful:    d.is_successful,
            }

            cleanDice.push(cleanDie)
          })
        }

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
              xpand.push(`${v.value}=>${range.max}${v.label ? v.label : ''}`)
            } else if ( range.min && (range.min > v.value) ) {
              xtotal += range.min
              xpand.push(`${v.value}=>${range.min}${v.label ? v.label : ''}`)
            } else {
              xtotal += v.value
              xpand(`${v.value}${v.label ? v.label : ''}`)
            }
          } else {
            xtotal += v.value
            xpand.push(`${v.value}${v.label ? v.label : ''}`)
          }
        })

        rData.total = xtotal
        rData.xpand = xpand.join(', ')

        apiRolls.push(rData)
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
