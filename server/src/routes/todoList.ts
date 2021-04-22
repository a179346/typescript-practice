import express from 'express';
import controller from '../controllers/todoList';

const router = express.Router();

router.get('/:id', controller.get);
router.get('/', controller.list);
router.post('/', controller.insert);
router.patch('/:id', controller.update);

export default router;