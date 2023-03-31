import gql from "graphql-tag";

const GET_TODOS = gql`
  {
    todoList {
      task
      description
      isCompleted
      id
      priority
    }
  }
`;

export { GET_TODOS };
