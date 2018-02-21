import React from 'react'
import { storiesOf } from '@storybook/react'

import DefaultTemplates from '../../templates/default'
import { withTemplateStub } from '../stub'

// Stub our sheet with all the methods we need
const Attack = withTemplateStub(DefaultTemplates.attack)

storiesOf('Templates', module)
  .add('Default: Attack', () => (
    <Attack />
  ))
