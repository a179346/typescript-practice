import express from 'express';
import controller from '../controllers/todoList';

const router = express.Router();

router.get('/:id', controller.get);

export default router;