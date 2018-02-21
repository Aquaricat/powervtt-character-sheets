import React from 'react'
import { storiesOf } from '@storybook/react'

import CharacterSheet from '../../sheets/5th Edition OGL'
import { withStub } from '../stub'

// Stub our sheet with all the methods we need
const Sheet = withStub(CharacterSheet)

storiesOf('5th Edition OGL', module)
  .add('Character Sheet', () => (
    <Sheet />
  ))
