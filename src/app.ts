import express, { Request, Response } from 'express';
import { tasks } from './data/tasks';

const app = express();
app.use(express.json());

const port = 3000;

app.get('/api', (_, res: Response) => {
    res.send('Hello World!');
});

//GET ALLS TASKS 
app.get('/api/tasks', (_, res: Response) => {

    res.status(201).json(tasks)
    
    res.status(400).json({message: "Tasks not found"})
    
 });

 // GET TASK BY ID 
app.get('/api/tasks/:id', (req:Request, res: Response) => {
    const { id } = req.params
    const uniqueTask = tasks.find(task => task.id === parseInt(id));
         
    res.status(201).json(uniqueTask)

        res.status(400).json({message: "Task not found"})
    
 });

  // POST CREATE NEW TASK
app.post('/api/tasks', (req:Request, res: Response) => {

    const createNewTasks = req.body
    tasks.push(createNewTasks)
         
    res.status(201).json(tasks);
   
        res.status(400).json({message: "Tasks wasn't created successfully"})

 });

  // PUT UPDATE TASK
  app.put('/api/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body

    const findTaskToEdit = tasks.find(task => task.id === parseInt(id))

    findTaskToEdit.todo = data.todo

        res.status(202).json(findTaskToEdit)
    
        res.status(403).json({ message: "Error updating the task" })

});

app.delete('/api/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    tasks.splice(Number(id) - 1);

    res.status(200).json(tasks);

    res.status(400).json({ message: "Error deleting task" })

});

app.listen(port, () => {
    console.log(`Server Running Up on port ${port}`);
});
