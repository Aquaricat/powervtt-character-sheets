import React from 'react'
import { storiesOf } from '@storybook/react'

import CharacterSheet from '../../sheets/5th Edition OGL'

storiesOf('5th Edition OGL', module)
  .add('Character Sheet', () => (
    <CharacterSheet
      character={{
        name: 'Test Character',
      }}
    />
  ))
