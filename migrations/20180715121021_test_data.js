const today = Math.floor(new Date().getTime()/1000);
exports.up = knex => Promise.all([
    knex.insert(
        {id: 1, email: 'test@test.com', password: '1', created_at: today}
    ).into('user'),
    knex.insert(
        {user_id: 1, first_name: 'Test', last_name: 'Test', birthday: today - 20*365*24*60*60, photo: ''}
    ).into('profile'),
]);

exports.down = knex => Promise.all([
    knex.truncate('user'),
    knex.truncate('profile')
]);

