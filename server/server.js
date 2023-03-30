const express = require("express");
const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");
const cors = require("cors");

let todo = [
  {
    task: "Brush Teeth",
    description: "Zig zag strokes, floss, clean tongue",
    isCompleted: false,
    id: "alsdkjalsjd;lad",
  },
  {
    task: "Walk",
    description: "Walk 4 Kms, exercise 20 minutes",
    isCompleted: false,
    id: "aksjdlaskjdlsd",
  },
];

const schema = buildSchema(`
    type TodoItem {
        task: String!
        description: String!
        isCompleted: Boolean!
        id:ID!
    }
    type Query {
        todoList: [TodoItem!]
    }
    type Mutation {
        createTodo(task:String!, description:String!, isCompleted: Boolean!): TodoItem!
        removeTodo(taskId:ID!):ID!
        updateTaskStatus(taskId:ID!):ID!
    }
`);

const root = {
  todoList: () => {
    return todo;
  },
  createTodo: (parent, args) => {
    const { task, description, isCompleted } = parent;
    let id = String(Math.random() * 4 - 1);
    todo.push({ task, description, isCompleted, id });
    return { task, description, isCompleted, id };
  },
  removeTodo: (parent) => {
    const { taskId } = parent;
    todo = todo.filter((todoItem) => todoItem.id !== taskId);
    return taskId;
  },
  updateTaskStatus: (parent) => {
    try {
      const { taskId } = parent;
      const taskIndex = todo.findIndex((task) => task.id === taskId);
      if (taskId && taskIndex !== -1) {
        todo[taskIndex].isCompleted = !todo[taskIndex].isCompleted;
      }
      return taskId;
    } catch (e) {
      console.log(e, "error");
    }
  },
};

const app = express();
app.use(cors());

app.use(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
