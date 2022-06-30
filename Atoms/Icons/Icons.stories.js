import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import Icons from './Icons'
import IconAddUser from './IconAddUser'
import IconAnswerCall from './IconAnswerCall'
import IconDeclineCall from './IconDeclineCall'
import IconSkipCall from './IconSkipCall'
import IconSearch from './IconSearch'
import IconCloseX from './IconCloseX'
import IconMicrophone from './IconMicrophone'
import IconMicrophoneMuted from './IconMicrophoneMuted'
import IconPlus from './IconPlus'
import IconVideoCamera from './IconVideoCamera'
import IconVideoCameraMuted from './IconVideoCameraMuted'
import IconChevronLeft from './IconChevronLeft'
import IconChevronRight from './IconChevronRight'
import IconChevronUp from './IconChevronUp'
import IconChevronDown from './IconChevronDown'
import IconCommentSlash from './IconCommentSlash'
import IconRetryCall from './IconRetryCall'
import IconPencil from './IconPencil'
import IconAirplaneTop from './IconAirplaneTop'
import IconMessage from './IconMessage'
import IconFlag from './IconFlag'
import IconEnvelope from './IconEnvelope'
import IconTrashcan from './IconTrashcan'
import IconEllipsisV from './IconEllipsisV'
import IconDownload from './IconDownload'
import IconDocuments from './IconDocuments'
import IconSquareOpenSmall from './IconSquareOpenSmall'
import IconCheckSmall from './IconCheckSmall'
import IconTimes from './IconTimes'
import IconPhoneSmall from './IconPhoneSmall'
import CallIncoming from './CallIncoming'
import CallOutgoing from './CallOutgoing'
import CallMissed from './CallMissed'
import IconImage from './IconImage'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'Icons',
  withInfo()(() => {
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
      },
      flexBox: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
      },
    }

    const colorLabel = 'color'
    const colorDefaultValue = 'var(--brandcolor)'
    const colorValue = text(colorLabel, colorDefaultValue)

    return (
      <div style={styles.flexBox}>
        <div style={styles.wrap}>
          <Icons name="arrowRight" style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>arrowRight</span>
        </div>
        <div style={styles.wrap}>
          <Icons name="arrowDown" style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>arrowDown</span>
        </div>
        <div style={styles.wrap}>
          <IconSearch style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconSearch</span>
        </div>
        <div style={styles.wrap}>
          <IconAnswerCall style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconAnswerCall</span>
        </div>
        <div style={styles.wrap}>
          <IconDeclineCall style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconDeclineCall</span>
        </div>
        <div style={styles.wrap}>
          <IconSkipCall style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconSkipCall</span>
        </div>
        <div style={styles.wrap}>
          <IconCloseX style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconCloseX</span>
        </div>
        <div style={styles.wrap}>
          <IconMicrophone style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconMicrophone</span>
        </div>
        <div style={styles.wrap}>
          <IconMicrophoneMuted style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconMicrophoneMuted</span>
        </div>
        <div style={styles.wrap}>
          <IconPlus style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconPlus</span>
        </div>
        <div style={styles.wrap}>
          <IconVideoCamera style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconVideoCamera</span>
        </div>
        <div style={styles.wrap}>
          <IconVideoCameraMuted style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconVideoCameraMuted</span>
        </div>
        <div style={styles.wrap}>
          <IconChevronLeft style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconChevronLeft</span>
        </div>
        <div style={styles.wrap}>
          <IconChevronRight style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconChevronRight</span>
        </div>
        <div style={styles.wrap}>
          <IconChevronUp style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconChevronUp</span>
        </div>
        <div style={styles.wrap}>
          <IconChevronDown style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconChevronLeft</span>
        </div>
        <div style={styles.wrap}>
          <IconRetryCall style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconRetryCall</span>
        </div>
        <div style={styles.wrap}>
          <IconPencil style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconPencil</span>
        </div>
        <div style={styles.wrap}>
          <IconAirplaneTop style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconAirplaneTop</span>
        </div>{' '}
        <div style={styles.wrap}>
          <IconMessage style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconMessage</span>
        </div>
        <div style={styles.wrap}>
          <IconFlag style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconFlag</span>
        </div>
        <div style={styles.wrap}>
          <IconEnvelope style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconEnvelope</span>
        </div>
        <div style={styles.wrap}>
          <IconTrashcan style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconTrashcan</span>
        </div>
        <div style={styles.wrap}>
          <IconEllipsisV style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconEllipsisV</span>
        </div>
        <div style={styles.wrap}>
          <IconDownload style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconDownload</span>
        </div>
        <div style={styles.wrap}>
          <IconDocuments style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconDocuments</span>
        </div>
        <div style={styles.wrap}>
          <IconSquareOpenSmall style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconSquareOpenSmall</span>
        </div>
        <div style={styles.wrap}>
          <IconCheckSmall style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconCheckSmall</span>
        </div>
        <div style={styles.wrap}>
          <IconTimes style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconTimes</span>
        </div>
        <div style={styles.wrap}>
          <IconAddUser style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconAddUser</span>
        </div>
        <div style={styles.wrap}>
          <IconPhoneSmall style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconPhoneSmall</span>
          <CallIncoming style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>CallIncoming</span>
        </div>
        <div style={styles.wrap}>
          <CallOutgoing style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>CallOutgoing</span>
        </div>
        <div style={styles.wrap}>
          <CallMissed style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>CallMissed</span>
        </div>
        <div style={styles.wrap}>
          <IconCommentSlash style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconCommentSlash</span>
        </div>
        <div style={styles.wrap}>
          <IconImage style={styles.iconMargin} color={colorValue} />
          <span style={styles.text}>IconImage</span>
        </div>
      </div>
    )
  })
)
