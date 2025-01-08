//packages

//models
const Task = require('../../db/models/task');


//without the pagination...
// const getAllTasks = async (req, res, next) => {
//     try {
//         const tasks = await Task.query().withGraphFetched('user')
//             .modifyGraph('user', builder => {
//                 builder.select('name');
//             });
//         // Transform the response to include `userName`
//         const transformedTasks = tasks.map(task => ({
//             id: task.id,
//             name: task.name,
//             description: task.description,
//             startDate: task.startDate,
//             dueDate: task.dueDate,
//             completionDate: task.completionDate,
//             userId: task.userId,
//             status: task.status,
//             userName: task.user.name
//         }));
//         res.json(transformedTasks);
//         next()
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching tasks', error: err });
//     }
// };

//wIth pagination
const getAllTasks = async (req, res) => {
    try {

        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pageSize = 10; // Number of tasks per page
        const offset = (page - 1) * pageSize;
        const tasks = await Task.query()
            .offset(offset)
            .limit(pageSize)
            .withGraphFetched('user')
            .modifyGraph('user', builder => {
                builder.select('name');
            });

        // Tinclude `userName`
        const transformedTasks = tasks.map(task => ({
            id: task.id,
            name: task.name,
            description: task.description,
            startDate: task.startDate,
            dueDate: task.dueDate,
            completionDate: task.completionDate,
            userId: task.userId,
            status: task.status,
            userName: task.user.name
        }));

        res.json(transformedTasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks', error: err });
    }
};


const getTask = async (req, res) => {
    try {
        const task = await Task.query().where('id', req.params.taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching task', error: err });
    }
};

const createTask = async (req, res) => {
    const { name, description, startDate, dueDate, userId, status } = req.body;

    try {
        const task = await Task.query().insert({
            name: name,
            description: description,
            startDate: startDate,
            dueDate: dueDate,
            userId: userId,
            status: status
        });

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Error creating task', error: err });
    }
};

const updateTask = async (req, res) => {
    const taskId = req.params.taskId;
    // const userId = JSON.parse(req.cookies.userData.id);

    const { name, description, startDate, dueDate, userId, status, completionDate } = req.body;

    try {
        let task = await Task.query().findById(taskId);

        // if (!task || task.userId !== userId) {
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update only the properties provided by the user
        if (name) task.name = name;
        if (description) task.description = description;
        if (startDate) task.startDate = startDate;
        if (dueDate) task.dueDate = dueDate;
        if (completionDate) task.completionDate = completionDate;
        if (userId) task.userId = userId;
        if (status) task.status = status;

        await task.$query().patch();

        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task', error: err.message });
    }
};


const deleteTask = async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const task = await Task.query().findById(taskId);
        // if (!task || task.userId !== req.user.id) {
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.$query().delete();
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task', error: err });
    }
};

function getStatus(duedate) {
    const currentDate = new Date();
    const dueDate = new Date(duedate);

    if (dueDate > currentDate) {
        return "pending";
    } else {
        return "overdue";
    }
}

const getTaskStatistics = async (req, res) => {
    try {
        const tasks = await Task.query();

        const totalTasks = tasks.length;
        const pendingTasks = tasks.filter(task => task.status === "pending").length;
        const completedTasks = tasks.filter(task => task.status === "completed").length;
        const overDueTasks = tasks.filter(
            (task) =>
                task.status === "pending" && new Date(task.dueDate) < new Date()
        ).length;

        const tasksCompletedToday = tasks.filter((task) => {
            const todayDate = new Date();
            const taskCompletionDate =
                task.completionDate && new Date(task.completionDate);
            return todayDate.toDateString() === taskCompletionDate?.toDateString();
        }).length;


        const statistics = {
            totalTasks,
            pendingTasks,
            completedTasks,
            overDueTasks,
            tasksCompletedToday
        };

        res.json(statistics);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching task statistics', error: err });
    }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask, getTaskStatistics };