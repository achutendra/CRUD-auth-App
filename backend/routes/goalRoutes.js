const express = require("express");
const router = express.Router();
const {getGoals, deleteGoals, updateGoals, setGoals}  = require('../controllers/goalController');
const {protect} = require('../middleware/authMiddleware');


//for get and post route
// router.route('/').get(getGoals).post(setGoals);

router.get('/', protect, getGoals);

router.post('/', protect, setGoals);

// for put and delete route
// router.route('/:id').put(updateGoals).delete(deleteGoals);

router.put('/:id', protect, updateGoals);

router.delete('/:id', protect, deleteGoals);

module.exports = router;