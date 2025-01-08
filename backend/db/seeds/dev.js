/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE user');
  await knex.raw('TRUNCATE TABLE task');
  // await knex('table_name').del()
  await knex('user').insert([
    {
      id: 1,
      name: 'admin',
      password: 'admin@123',
      role: 'admin'
    },
    {
      id: 2,
      name: 'user1',
      password: 'user1@123',
      role: 'user'
    },
    {
      id: 3,
      name: 'user2',
      password: 'user2@123',
      role: 'user'
    },

  ]);

  return knex('task').insert([
    {
      id: 1,
      name: 'task1',
      description: "hello this is task 1",
      startDate: '2025-06-24',
      dueDate: '2025-06-24',
      userId: 2,

    },
    {
      id: 2,
      name: 'task2',
      description: "hello this is task 2",
      startDate: '2025-06-24',
      dueDate: '2025-06-24',
      userId: 2,

    }
  ])
};
