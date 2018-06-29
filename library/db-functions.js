module.exports = knex => ({

  getUserId: (email) => {
    return knex.first("id")
    .from("users")
    .where("email", "=", email)
      .then(result => result.id);
  },

  getPollId: (pollName) => {
    return knex.first("id")
    .from("polls")
    .where("poll_name", "=", pollName)
      .then(result => result.id);
  },

   getAdminLink: (friendLink) => {
    return knex.first("admin_link")
    .from("polls")
    .where("friend_link", "=", friendLink)
      .then(result => result.admin_link);
  },

  getUserPassword: (email) => {
    return knex.first("password")
    .from("users")
    .where("email", "=", email)
      .then(result => result.password);
  },

  insertNewUser: (userName, userEmail, userPassword, callback) => {
    return knex("users")
    .insert({
      name: userName,
      email: userEmail,
      password: userPassword
      })
      .then(rows => {
          callback();
      })
  },

  getChoicesArr: (pollid) => {
    return knex.select("*")
      .from("choices")
      .where('poll_id', '=', pollid)
      .then(result => result);
  },

  getPollName: (pollid) => {
    return knex.first("poll_name")
    .from("polls")
    .where('id', '=', pollid)
      .then(result => result.poll_name);
  },

  getPollId: (friend_link) => {
    return knex.first("id")
    .from("polls")
    .where('friend_link', '=', friend_link)
      .then(result => result.id);
  },

  getPollDescription: (pollid) => {
    return knex.first("description")
    .from("polls")
    .where('id', '=', pollid)
      .then(result => result.description);
  },

  getUserPolls: (userId) => {
    return knex()
      .select('poll_name','id', 'admin_link')
      .from('polls')
      .where('user_id','=', userId)
      .then(result => result)
  },

  getPollByAdmLink: (adminLink) => {
    return knex()
      .select('*')
      .from('polls')
      .where('admin_link', '=', adminLink)
      .then(result => result[0])
  },

  deletePoll: (pollId) => {
    knex('choices')
      .where('poll_id','=', pollId)
      .del()
      .then(() => knex('polls')
                    .where('id', '=', pollId)
                    .del()
            )
  },

  getCurrentPoints: (poll_id) => {
    return knex.select("id","points")
    .from("choices")
    .where('poll_id', '=', poll_id)
    .then(result => result);
  },

  updatePoints: (choice_id, newPoints) => {
    knex("choices")
    .where('id', '=', choice_id)
    .update({points: newPoints})
    .then();
  },

  getCurrentResponses: (poll_id) => {
    return knex.first("responses")
    .from("polls")
    .where("id", "=", poll_id)
    .then(result => result.responses)
  },

  updateResponses: (poll_id, newRes) => {
    knex("polls")
    .where('id', '=', poll_id)
    .update({responses: newRes})
    .then();
  },

  getCreatorEmail: (poll_id) => {
    return knex('polls')
    .join('users', 'polls.user_id', '=', 'users.id'  )
    .first("email")
    .where("polls.id", "=", poll_id)
    .then(result => result.email)
}
});

