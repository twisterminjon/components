export default {
  user: {
    id: '1',
    displayName: 'Louis Lane',
    phone: '9545551212',
    email: 'lois@dailyplanet.com',
    profileImage: '',
    emailOptOut: false,
    smsOptOut: false,
    roles: [
      { id: '1', name: 'Dr. Love' },
      { id: '3', name: 'Justice League of America' },
    ],
    patient: {
      id: '2',
      identifier: '123456789',
      dateOfBirth: '2018-01-01',
      ssnLast4: '0555',
      zipCode: '15201',
      contactType: 'BOTH',
      pcpName: 'Ursala Ursina',
      careManagerName: 'Sally Supersonic',
      careManagerPhone: '3332225555',
      language: {
        name: 'French',
      },
      enrollments: [
        { program: { id: '1', name: 'Fantastic Four' } },
        { program: { id: '3', name: 'Justice League of America' } },
      ],
    },
  },
}
