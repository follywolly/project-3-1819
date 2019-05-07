const state = {
  dark_mode: false,
  user: {
    name: 'Folkert-Jan van der Pol'
  },
  current_log_id: 6,
  logs: [
    {
      title: '',
      id: '5',
      time: '10:00',
      date: '31/04/2019',
      author: '',
      tags: ['run', 'process']
    },
    {
      title: 'Some log title',
      id: '4',
      time: '10:00',
      date: '30/04/2019',
      author: 'Folkert-Jan van der Pol',
      tags: ['comment', 'human']
    },
    {
      title: 'Log title',
      id: '3',
      time: '10:00',
      date: '29/03/2019',
      author: 'Dennis Wegereef',
      tags: ['comment', 'human']
    },
    {
      title: '',
      id: '2',
      time: '10:00',
      date: '17/03/2019',
      author: '',
      tags: ['run', 'process']
    },
    {
      title: 'Hey look it\'s another log title',
      id: '1',
      time: '10:00',
      date: '12/03/2019',
      author: 'Folkert-Jan van der Pol',
      tags: ['comment', 'human']
    }
  ]

}

export default state
