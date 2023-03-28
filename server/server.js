const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
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
    isCompleted: true,
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
};

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
