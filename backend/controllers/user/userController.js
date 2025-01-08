const User = require('../../db/models/user');
const Task = require('../../db/models/task');
exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User
            .query()
            .findById(userId)
            .withGraphFetched('tasks');
        if (!user) res.json({ user: null });

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

};

exports.getAllUsers = async (req, res, next) => {

    try {
        const users = await User
            .query()
            .withGraphFetched('tasks');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.getUserTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.query()
            .where('userId', userId);

        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};