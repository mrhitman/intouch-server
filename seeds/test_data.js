const profile = {
  first_name: 'Test',
  last_name: 'Test',
  birthday: 567997261,
  photo: '',
  town: 'Some town',
  company: 'Some company',
  quote: 'Do every day and win'
};

const today = Math.floor(new Date().getTime() / 1000);

exports.seed = knex => {
    return knex('user').del()
      .then(() => {
        return knex('user').insert([
          { id: 1, email: 'test@test.com', password: '1', created_at: today },
          { id: 2, email: 'test1@test.com', password: '1', created_at: today },
          { id: 4, email: 'test2@test.com', password: '1', created_at: today }
        ]);
      })
      .then(() => {
          return knex('profile').del()
          .then(() => {
            return knex('profile').insert([
                { user_id: 1, ...profile },
                { user_id: 2, ...profile },
                { user_id: 3, ...profile },
            ])
          });
    })
    .then(() => {
          return knex('friend').del()
          .then(() => {
            return knex('friend').insert([
                { user_id: 1, friend_user_id: 2, deleted: 0},
                { user_id: 2, friend_user_id: 1, deleted: 0},
                { user_id: 3, friend_user_id: 1, deleted: 0},
            ])
          });
    });
};
