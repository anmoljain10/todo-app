import gql from "graphql-tag";

const GET_TODOS = gql`
  {
    todoList {
      task
      description
      isCompleted
      id
    }
  }
`;

export { GET_TODOS };
