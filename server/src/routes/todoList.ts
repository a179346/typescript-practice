import express from 'express';
import { todoListController } from '../controllers/todoList';

const router = express.Router();

router.get('/:id', todoListController.get);
router.get('/', todoListController.list);
router.post('/', todoListController.insert);
router.patch('/:id', todoListController.update);

export const todoListRouter = router;