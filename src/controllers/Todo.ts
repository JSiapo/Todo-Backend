import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Todo, TodoState } from '../entities/Todo';
import { validate } from 'class-validator';

export const getTodos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { complete, create } = req.query;
    console.log(complete, create);
    let options = [];
    if (complete === '1') {
      options.push({ state: TodoState.complete });
    }
    if (create === '1') {
      options.push({ state: TodoState.create });
    }

    console.log(options);

    const [todos, count] = await getRepository(Todo).findAndCount({
      where: [],
    });

    return !todos
      ? res.status(400).json({ message: 'Todos not found' })
      : res.json({ todos, count });
  } catch (error) {
    throw res.status(500).json({ message: error.message });
  }
};

export const postTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newTodo = new Todo();

    const {
      todo,
    }: {
      todo: string;
    } = req.body;

    newTodo.todo = todo.trim();

    const valid = await validate(newTodo);
    console.log(valid);

    if (valid.length !== 0) {
      return res.status(400).json({ message: 'Data error' });
    }

    const result = await getRepository(Todo).save(newTodo);
    return result
      ? res.status(201).json(result)
      : res.status(400).json({ message: "Todo don't saved" });
  } catch (error) {
    throw res.status(500).json({ message: error.message });
  }
};
