import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'

import IconsPatient from './IconsPatient'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('IconsPatient', () => {
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
        <IconsPatient name="info" style={styles.iconMargin} />
        <span style={styles.text}>info</span>
      </div>
      <div style={styles.wrap}>
        <IconsPatient name="contact" style={styles.iconMargin} />
        <span style={styles.text}>contact</span>
      </div>
      <div style={styles.wrap}>
        <IconsPatient name="program" style={styles.iconMargin} />
        <span style={styles.text}>program</span>
      </div>
      <div style={styles.wrap}>
        <IconsPatient name="careTeam" style={styles.iconMargin} />
        <span style={styles.text}>careTeam</span>
      </div>
      <div style={styles.wrap}>
        <IconsPatient name="caregiver" style={styles.iconMargin} />
        <span style={styles.text}>caregiver</span>
      </div>
      <div style={styles.wrap}>
        <IconsPatient name="envelope" style={styles.iconMargin} />
        <span style={styles.text}>envelope</span>
      </div>
      <div style={styles.wrap}>
        <IconsPatient name="edit" style={styles.iconMargin} />
        <span style={styles.text}>edit</span>
      </div>
      <div style={styles.wrap}>
        <IconsPatient name="flag" style={styles.iconMargin} />
        <span style={styles.text}>flag</span>
      </div>
      <div style={styles.wrap}>
        <IconsPatient name="plus" style={styles.iconMargin} />
        <span style={styles.text}>plus</span>
      </div>
      <div style={styles.wrap}>
        <IconsPatient name="team" style={styles.iconMargin} />
        <span style={styles.text}>team</span>
      </div>
    </div>
  )
})
