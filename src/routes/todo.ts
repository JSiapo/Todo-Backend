import { Router } from 'express';

import { getTodos, postTodo } from '../controllers/Todo';

const router = Router();

router.get('/todos', getTodos);
router.post('/todo', postTodo);

export default router;
