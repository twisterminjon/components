import React from 'react'
import ReminderCard from './ReminderCard'

describe('ReminderCard', () => {
  const mockOnOpen = jest.fn()
  const mockDeny = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ReminderCard
        type={'visit'}
        age={'1d ago'}
        flag={'none'}
        message={''}
        patientMayInitiate={true}
        onOpen={mockOnOpen}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for careteam', () => {
    const wrapper = window.shallow(
      <ReminderCard
        type={'careteam'}
        age={'1d ago'}
        flag={'none'}
        message={''}
        patientMayInitiate={true}
        onOpen={mockOnOpen}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for message', () => {
    const wrapper = window.shallow(
      <ReminderCard
        type={'message'}
        age={'1d ago'}
        flag={'none'}
        message={''}
        patientMayInitiate={true}
        onOpen={mockOnOpen}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for survey', () => {
    const wrapper = window.shallow(
      <ReminderCard
        type={'survey'}
        age={'1d ago'}
        flag={'none'}
        message={''}
        patientMayInitiate={true}
        onOpen={mockOnOpen}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for flag=warn', () => {
    const wrapper = window.shallow(
      <ReminderCard
        type={'visit'}
        age={'1d ago'}
        flag={'warn'}
        message={''}
        patientMayInitiate={true}
        onOpen={mockOnOpen}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for flag=expired', () => {
    const wrapper = window.shallow(
      <ReminderCard
        type={'visit'}
        age={'1d ago'}
        flag={'expired'}
        message={''}
        patientMayInitiate={true}
        onOpen={mockOnOpen}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('calls onOpen when clicked', () => {
    const wrapper = window.shallow(
      <ReminderCard
        type={'visit'}
        age={'1d ago'}
        flag={'expired'}
        message={''}
        patientMayInitiate={true}
        onOpen={mockOnOpen}
      />
    )

    wrapper.find('[data-testid="reminder-card-visit"]').simulate('click')

    expect(mockOnOpen).toHaveBeenCalled()
  })

  it('can not be clicked when patient can not start call', () => {
    const wrapper = window.shallow(
      <ReminderCard
        type={'visit'}
        age={'1d ago'}
        flag={'expired'}
        message={''}
        patientMayInitiate={false}
        onOpen={mockOnOpen}
      />
    )

    wrapper.find('[data-testid="reminder-card-visit"]').simulate('click')

    expect(mockDeny).not.toHaveBeenCalled()
  })
})
