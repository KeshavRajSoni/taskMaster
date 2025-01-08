const { Model } = require('objection');


class User extends Model {
    static get tableName() {
        return 'user';
    }
    static get relationMappings() {
        const Task = require('./task');
        return {
            tasks: {
                relation: Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: 'user.id',
                    to: 'task.userId'
                }
            }
        };
    }
}

module.exports = User;