import React, { Component } from 'react'
import Promise from 'bluebird'

import { color } from '../../sheets/styles'

export default class AttackTemplate extends Component {
  constructor (props) {
    super(...arguments)

    this.onRollDamage = this.onRollDamage.bind(this)

    this.state = {
      name: props.name,
      description: props.description,
      attack: props.attack || false,
      damage: props.damage || [],
      attackRoll: props.attack_roll || undefined,
      damageRolls: props.damage_rolls || [],
    }
  }

  async componentDidMount () {
    // If we have an attack roll, roll it immediately
    const {
      attack,
      attackRoll,
    } = this.state

    try {
      if (!attackRoll && attack) {
        const {
          base,
          proficiency,
        } = attack

        let macro = `!hr ${base}`
        if (proficiency) {
          macro += '+@{me}.proficiency_bonus'
        }
        const output = await this.props.executeMacro(macro)
        const attackRoll = output.rolls[0]
        this.setState({
          attackRoll,
        })

        if (this.props.id) {
          this.props.updateTemplate(this.props.id, {
            attack_roll: attackRoll,
          })
        }
      }
    } catch (e) {
      console.trace(e)
    }
  }

  async onRollDamage () {
    const {
      damage,
      damageRolls,
    } = this.state

    try {
      if (damage && damageRolls.length === 0 && damage.length > 0) {
        const damageRolls = await Promise.map(damage, (dmg) => new Promise(async (resolve, reject) => {
          const {
            base,
            modifier,
          } = dmg

          try {
            let macro = `!hr ${base}`
            if (modifier.mod) {
              macro += `+${modifier.mod}`
            }
            const output = await this.props.executeMacro(macro)
            const roll = output.rolls[0]
            resolve(roll)
          } catch (e) {
            reject(e)
          }
        }))

        this.setState({
          damageRolls,
        })

        if (this.props.id) {
          this.props.updateTemplate(this.props.id, {
            damage_rolls: damageRolls,
          })
        }
      }
    } catch (e) {
      console.trace(e)
    }
  }

  render () {
    const {
      name,
      description,
      attack,
      damage,
      attackRoll,
      damageRolls,
    } = this.state

    return (
      <div className='attack'>
        <h1>{name}</h1>
        <span className='description'>{description}</span>

        {attackRoll && (
          <span className='roll'>
            <span>{attackRoll.value}</span>

            {damageRolls.length === 0 && damage.length > 0 && (
              <a onClick={this.onRollDamage}>Roll Damage</a>
            )}
            {damageRolls.length > 0 && (
              <div className='damage'>
              {damageRolls.map((dmg, i) => (
              <span key={`damage-${i}`} className='damage-roll'>
                {dmg.value}
                <h2>Damage {i + 1}</h2>
              </span>
              ))}
              </div>
            )}
          </span>
        )}

        <style jsx>{`
          .attack {
            display: flex;
            flex-direction: column;
          }

          h1 {
            margin: 0;
            color: ${color.grey[50]};
            font-size: 21px;
          }

          .description {
            color: ${color.grey[200]};
            font-size: 13px;
            font-style: italic;
          }

          .roll {
            color: ${color.grey[50]};
            border: 1px solid ${color.grey[200]};
            padding: 12px;
            margin: 12px 0;
            text-align: center;
          }

          .roll span {
            font-weight: 700;
            font-size: 32px;
            display: block;
          }

          .roll a {
            margin-top: 6px;
            font-size: 14px;
          }

          .roll a:hover {
            color: ${color.yellow[500]};
            cursor: pointer;
          }

          .damage {
            border-top: 1px solid ${color.grey[200]};
            padding-top: 6px;
            margin-top: 6px;
          }

          .roll span.damage-roll {
            font-size: 24px;
          }

          h2 {
            font-size: 14px;
            color: ${color.grey[400]};
            margin: 0;
          }
        `}</style>
      </div>
    )
  }
}
