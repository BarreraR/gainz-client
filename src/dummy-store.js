const store = {
  'users': [
    { 'id': 1,
      'name': 'Bob Ross'},
    { 'id': 2,
      'name': 'Ryan Reynolds'},
    { 'id': 3,
      'name': 'Steve Jobs'}
  ],
  'exercise_records': [
    { 'id': 1,
      'exercise': 'pull-ups', 
      'sets': 3,
      'reps': [ 10, 10, 7 ],
      'weights' : [ 135, 135, 135, ],
      'date': '2019-12-10',
      'user_id': 2
    },
    { 'id': 2,
      'exercise': 'benchpress', 
      'sets': 4,
      'reps': [ 15, 14, 10, 11 ],
      'weights' : [ 135, 135, 135, 85],
      'date': '2019-12-10',
      'user_id': 2
    },
    { 'id': 3,
      'exercise': 'lat pulldowns', 
      'sets': 3,
      'reps': [ 20, 20, 20 ],
      'weights' : [ 135, 135, 135, 85],
      'date': '2019-12-10',
      'user_id': 2
    },
  ],    
  'routines': [
    { 'id': 1,
      'name': 'Leg day',
      'exercises': [{'id': 2, 'name':'squats'}],
      'user_id': 1
    },
    {
      'id': 2,
      'name': 'Tuesday',
      'exercises': [{'id':1, 'name':'Benchpress'}, {'id':2, 'name':'Squats'}, {'id':3, 'name':'Pullups'}],
      'user_id': 2
    },
  ],
  exercises: [
    {
      'id': 1,
      'name': 'Benchpress'
    },
    {
      'id': 2,
      'name': 'Squats'
    },
    {
      'id': 3,
      'name': 'Pullups'
    },
    {
      'id': 4,
      'name': 'Deadlifts'
    },
    {
      'id': 5,
      'name': 'Shoulderpress'
    },
  ]
}

export default store;