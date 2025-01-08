const { Model } = require('objection');

class Task extends Model {
    static get tableName() {
        return 'task';
    }

    static get relationMappings() {
        const User = require('./user');
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'task.userId',
                    to: 'user.id'
                }
            }
        };
    }
}

module.exports = Task;