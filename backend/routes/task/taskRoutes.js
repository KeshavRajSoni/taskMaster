//packages
const express = require('express')
//controllers
const taskController = require('../../controllers/task/taskController');
const userController = require('../../controllers/user/userController');


//initaile work
const router = express.Router({ mergeParams: true });
// router.use(authMiddleware);

//routes
// router.use(authController.protect);


router.get('/', taskController.getAllTasks);
// router.get('?page=1', taskController.getAllTasks);
router.get('/:userId/task', userController.getUserTasks);
router.get('/stats', taskController.getTaskStatistics);
router.get('/:taskId', taskController.getTask);
router.patch('/:taskId', taskController.updateTask);

// router.use(authController.restrictTo('admin'));

router.post('/', taskController.createTask);
router.delete('/:taskId', taskController.deleteTask);




//final work
module.exports = router;