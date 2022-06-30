import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'

import IconsNavbar from './IconsNavbar'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('IconsNavbar', () => {
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
      margin: '0 60px 0 60px',
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
        <IconsNavbar name="patients" style={styles.iconMargin} />
        <span style={styles.text}>patients</span>
      </div>
      <div style={styles.wrap}>
        <IconsNavbar name="message" style={styles.iconMargin} />
        <span style={styles.text}>message</span>
      </div>
      <div style={styles.wrap}>
        <IconsNavbar name="home" style={styles.iconMargin} />
        <span style={styles.text}>home</span>
      </div>
      <div style={styles.wrap}>
        <IconsNavbar name="staff" style={styles.iconMargin} />
        <span style={styles.text}>staff</span>
      </div>
      <div style={styles.wrap}>
        <IconsNavbar name="calls" style={styles.iconMargin} />
        <span style={styles.text}>calls</span>
      </div>
    </div>
  )
})
