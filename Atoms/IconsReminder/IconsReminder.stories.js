import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'

import IconsReminder from './IconsReminder'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('IconsReminder', () => {
  const styles = {
    iconMargin: {
      margin: '30px 30px 4px 30px',
    },
    text: {
      margin: 0,
      fontWeight: 300,
      fontSize: 12,
      color: 'var(--brandcolor)',
    },
    wrap: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '0 20px 0 20px',
      color: 'var(--brandcolor)',
    },
    flexBox: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
    },
  }

  return (
    <div style={styles.flexBox}>
      <div style={styles.wrap}>
        <IconsReminder name="careteam" style={styles.iconMargin} />
        <span style={styles.text}>careteam</span>
      </div>
      <div style={styles.wrap}>
        <IconsReminder name="message" style={styles.iconMargin} />
        <span style={styles.text}>message</span>
      </div>
      <div style={styles.wrap}>
        <IconsReminder name="visit" style={styles.iconMargin} />
        <span style={styles.text}>visit</span>
      </div>
      <div style={styles.wrap}>
        <IconsReminder name="survey" style={styles.iconMargin} />
        <span style={styles.text}>survey</span>
      </div>
    </div>
  )
})
