exports.up = function(knex, Promise) {
  return knex.schema.table('choices', function (table) {
    table.string('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('choices', function (table) {
   table.dropColumn('description');
  })

};



exports.seed = function(knex, Promise) {
  function deleteChoices() {
    return knex('choices').del()
  }
  function deletePolls() {
    return knex('polls').del()
  }
  function deleteUsers() {
    return knex('users').del()
  }


  function insertUsers() {
    return knex('users').insert([
      {name: 'Alice', email: 'alice@example.com', password: '$2b$10$kxSisiBbg/KQ0gj6QtNvPe1WCqUI8yrvGoM4qqiPsvnYmwWMJGIIe'},
      {name: 'Bob', email: 'bob@example.com', password: '$2b$10$NeKOe4I3njdtXfZ6WpDmkOQl6NPGMMYm/AydxEp0tioemnqJD.uSi'},
      {name: 'Charlie', email: 'charlie@example.com', password: '$2b$10$z4YHPcaJDVHfatvX1IWAMeyS1nY/DQpKkujd9mvwhwgG6oAbAhzUO'}
    ]).returning('*');
  }

  function insertPolls(users) {
    return knex('polls').insert([
      {user_id: users[0].id, poll_name: 'To Eat?', description: 'choose what to eat', admin_link: '111111', friend_link:'222222', responses: 4},
      {user_id: users[0].id, poll_name: 'To Drink?', description: 'choose what to drink', admin_link: '333333', friend_link:'444444', responses: 2},
      {user_id: users[1].id, poll_name: 'To Play?', description: 'choose what to play', admin_link: '555555', friend_link:'666666', responses: 4},
      {user_id: users[2].id, poll_name: 'To See?', description: 'choose what to see', admin_link: '777777', friend_link:'888888', responses: 5},
    ]).returning('*');
  }

  function insertChoices(polls) {
    return knex('choices').insert([
      {poll_id: polls[0].id, choice: 'Sushi', points: 10, description: 'I like sushi'},
      {poll_id: polls[0].id, choice: 'Pizza', points: 8, description: 'Pizza will be Ok'},
      {poll_id: polls[1].id, choice: 'Water', points: 4, description: 'I prefer beer'},
      {poll_id: polls[1].id, choice: 'Juice', points: 3, description: 'I like apple juice'},
      {poll_id: polls[2].id, choice: 'Tag', points: 12, description: 'Lets play Tag'},
      {poll_id: polls[2].id, choice: 'Board games', points: 5, description: 'Lets play chess'},
      {poll_id: polls[3].id, choice: 'Movie', points: 7, description: 'Lock, Stock and Two Smoking Barrels'},
      {poll_id: polls[3].id, choice: 'Musical', points: 10, description: 'Folk fest'},
    ]);
  }


  return deleteChoices()
    .then(deletePolls)
    .then(deleteUsers)
    .then(insertUsers)
    .then(users => insertPolls(users))
    .then(polls => insertChoices(polls))



};
