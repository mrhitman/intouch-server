const moment = require('moment');

const profile = {
  first_name: 'Victor',
  middle_name: 'Varenic',
  last_name: 'Vladimirovich',
  gender: 1,
  birthday: moment().subtract(25, 'years').format('YYYY-MM-DD'),
  photo: '',
  home_town: 'Konstantinovka',
  country: 'Ukraine',
  city: 'Charkiv',
  company: 'WebDevs',
  quote: 'Do every day and win',
  hobbies: '',
  priorities: '',
};

const today = moment().utc();
exports.seed = knex => {
  return knex('user').del()
    .then(() => {
      return knex('user').insert([
        { id: 1, email: 'test@test.com', password: '27f28425655b50a04464947b1b1808c1bece11b672be621f359d95b67496f492', created_at: today },
        { id: 2, email: 'test1@test.com', password: '27f28425655b50a04464947b1b1808c1bece11b672be621f359d95b67496f492', created_at: today },
        { id: 3, email: 'test2@test.com', password: '27f28425655b50a04464947b1b1808c1bece11b672be621f359d95b67496f492', created_at: today }
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
            { user_id: 1, friend_user_id: 2, deleted: false },
            { user_id: 2, friend_user_id: 1, deleted: false },
            { user_id: 3, friend_user_id: 1, deleted: false },
          ])
        });
    });
};
