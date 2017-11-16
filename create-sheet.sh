#!/bin/bash

mkdir -p "sheets/$1/"
mkdir -p "stories/$1/"

cat > "sheets/$1/index.js" << SHEET
import React, { Component } from 'react'
export default ({ character }) => (
  <div>
    {/* JSX */}

    <style jsx>{\`
      // CSS
    \`}</style>
  </div>
)
SHEET

cat > "stories/$1/index.js" << STORY
import React from 'react'
import { storiesOf } from '@storybook/react'

import CharacterSheet from '../../sheets/$1'

storiesOf('$1', module)
  .add('Character Sheet', () => (
    <CharacterSheet
      character={{
        name: 'Test Character',
      }}
    />
  ))
STORY

echo "import './$1'" >> stories/index.js
