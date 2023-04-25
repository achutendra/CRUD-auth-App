const asyncHandler = require('express-async-handler');

const Goal = require('../model/goalModel');
const User  = require('../model/userModel');

const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.body.id });

    // res.status(200).json({message: 'Get Goals'});
    res.status(200).json(goals);
});

const setGoals = asyncHandler(async(req, res) => {
    if(!req.body.text) {
        return (res.status(400).json({message: "Please send some text"}));
        // using express error handler
        // res.status(400)

        // try {
        //     throw new Error("error found plz add text")
        // } catch (e) {
        //     console.log("for new Error()");
        //     console.log(e);
        // }
        
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.body.id
    })

    // res.status(200).json({message: 'Set Goals'});
    res.status(200).json(goal);
});

const updateGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdandUpdate(req.params.id, req.body, {
        new: true,
    })

    // res.status(200).json({message: `Update Goals ${req.params.id}`});
    res.status(200).json(updatedGoal);
    
});

const deleteGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove();


    // res.status(200).json({message: `delete Goals ${req.params.id}`});
    res.status(200).json({ id: req.params.id });

});


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}