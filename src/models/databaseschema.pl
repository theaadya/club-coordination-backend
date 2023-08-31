
var newDocument = {
    name: 'Astronuts Club',
    description: 'A club for space enthusiasts',
    coordinator: 'Akanksha',
    status: 'Approved',
    events: [ 'Stargazing Session', 'Chandrayan Landing' ],
    email: 'astronuts@sc.iiitd.ac.in',
    members: [ 'Alice', 'Bob', 'Charlie' ],
    creationDate: '2023-08-05'
}

db.clubs.insert(newDocument)


var newDocument = {
  name: 'Meraki',
  description: 'Art society',
  coordinator: 'Aadya',
  status: 'Approved',
  events: [ 'Pictionary', 'Poster' ],
  email: 'meraki@sc.iiitd.ac.in',
  members: [ 'Alice', 'Bob' ],
  creationDate: '2023-08-15'
}


db.clubs.insert(newDocument)
