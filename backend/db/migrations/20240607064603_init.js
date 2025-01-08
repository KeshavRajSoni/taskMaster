
exports.up = function (knex) {
    return knex.schema
        .createTable('user', (table) => {
            table.increments().primary().unique();
            table.string('name').notNullable().unique();
            table.string('password').notNullable();
            table.string('role').defaultTo("user");

        })
        .createTable('task', (table) => {
            table.increments().primary().unique();
            table.string('name').notNullable();
            table.string('description').notNullable();
            table.string('startDate').notNullable();
            table.string('dueDate').notNullable();
            table.string('completionDate').defaultTo(null);
            table.integer('userId').notNullable();
            table.string('status').defaultTo("pending");


        })


};
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('task')
        .dropTableIfExists('user')

};
