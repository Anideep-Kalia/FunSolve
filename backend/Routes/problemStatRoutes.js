import { Router } from 'express';
import problemStatement from '../Model/problemStatements.js';

const router = new Router();

// fetching all the problem statements
router.get('/allProblems', async (req, res) => {
  try {
    const list = await problemStatement.find();
    res.status(200).json({
      success: true,
      message: 'Heres the list of all the Problems',
      numberOfProblems: list.length,
      list,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}); 

 // fetching the problem according to their IDS
router.get('/problemById/:_id', async (req, res) => {
  try {
    const problemID = req.params._id;
    const showProblem = await problemStatement.findById(problemID);
    res.status(200).json({
      success: true,
      message: 'The problem of given id is given below',
      showProblem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

 // adding a problem
router.post('/addProblem', async (req, res) => {
  try {
    const problemAdd = new problemStatement({
      ...req.body,
    });
    const newProblem = await problemAdd.save();
    res.status(201).json({
      success: true,
      message: 'new problem added successfully',
      newProblem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// updating a problem
router.put('/updateProblem/:_id', async (req, res) => {
  try {
    const problemID = req.params._id;
    const updateData = {
      ...req.body,
    };
    const found = await problemStatement.findByIdAndUpdate(
      problemID,
      { $set: updateData },
      { omitUndefined: 1 }
    );
    if (!found) {
      res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    } else {
      res.status(201).json({
        success: true,
        message: 'Problem updated sucessfully',
        updateData,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}); 

 // deleting a problem
router.delete('/deleteProblem/:_id', async (req, res) => {
  try {
    const problemID = req.params._id;
    const result = await problemStatement.findByIdAndDelete(problemID);
    console.log(result);
    if (result === null) {
      throw new Error("Couldn't find the given id");
    }
    res.status(200).json({
      success: true,
      message: 'Problem removed successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// deleting all problems
router.delete('/deleteAll', async (req, res) => {
  try {
    const result = await problemStatement.deleteMany({});
    console.log(result);
    if (result.deletedCount === 0) {
      throw new Error('No problems to delete');
    }
    res.status(200).json({
      success: true,
      message: 'All problem statements deleted',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}); 

export default router;
