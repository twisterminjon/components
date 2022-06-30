export default {
  rooms: [
    {
      id: 'room1',
      unreadMessages: 0,
      messages: [
        {
          id: 'message1',
          roomId: 'room1',
          timestamp: '2018-12-05T10:30:15',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
          seen: true,
          sender: {
            id: '1111',
            displayName: 'me',
            profileImage: '',
          },
          recipient: {
            id: '1',
            displayName: 'Dr. Stephen Strange',
            profileImage: 'https://www.fillmurray.com/60/60',
          },
        },
      ],
    },
    {
      id: 'room2',
      unreadMessages: 0,
      messages: [
        {
          id: 'message23',
          roomId: 'room1',
          timestamp: '2018-12-01T10:30:15',
          text: 'Debitis error dolorum excepturi sed fugit, in architecto',
          seen: true,
          sender: {
            id: '1',
            displayName: 'Nurse Jacky',
            profileImage: 'https://www.fillmurray.com/100/100',
          },
          recipient: {
            id: '1111',
            displayName: 'me',
            profileImage: '',
          },
        },
      ],
    },
    {
      id: 'room3',
      unreadMessages: 0,
      messages: [
        {
          id: 'message234',
          roomId: 'room1',
          timestamp: '2018-10-29T10:30:15',
          text: 'modi hic qui voluptatem incidunt voluptas quibusdam et quo saepe at alias perferendis labore.',
          seen: true,
          sender: {
            id: '1',
            displayName: 'Dr. Douglas Powers',
            profileImage: 'https://www.fillmurray.com/160/160',
          },
          recipient: {
            id: '1111',
            displayName: 'me',
            profileImage: '',
          },
        },
      ],
    },
    {
      id: 'room4',
      unreadMessages: 0,
      messages: [
        {
          id: 'message1',
          roomId: 'room1',
          timestamp: '2018-10-15T10:30:15',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
          seen: true,
          sender: {
            id: '1111',
            displayName: 'me',
            profileImage: '',
          },
          recipient: {
            id: '1',
            displayName: 'Dr. X',
            profileImage: 'https://www.fillmurray.com/60/60',
          },
        },
      ],
    },
    {
      id: 'room5',
      unreadMessages: 1,
      messages: [
        {
          id: 'message23',
          roomId: 'room1',
          timestamp: '2018-01-01T10:30:15',
          text: 'Debitis error dolorum excepturi sed fugit, in architecto',
          seen: false,
          sender: {
            id: '1',
            displayName: 'Dr. Who',
            profileImage: 'https://www.fillmurray.com/100/100',
          },
          recipient: {
            id: '1111',
            displayName: 'me',
            profileImage: '',
          },
        },
      ],
    },
    {
      id: 'room6',
      unreadMessages: 0,
      messages: [
        {
          id: 'message234',
          roomId: 'room1',
          timestamp: '2018-01-01T10:30:15',
          text: 'modi hic qui voluptatem incidunt voluptas quibusdam et quo saepe at alias perferendis labore.',
          seen: true,
          sender: {
            id: '1',
            displayName: 'Dr. Bruce Banner',
            profileImage: 'https://www.fillmurray.com/160/160',
          },
          recipient: {
            id: '1111',
            displayName: 'me',
            profileImage: '',
          },
        },
      ],
    },
  ],
}
