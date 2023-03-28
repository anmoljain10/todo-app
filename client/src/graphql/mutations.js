import gql from "graphql-tag";

const CREATE_TODO = gql`
  mutation createTodo(
    $task: String!
    $description: String!
    $isCompleted: Boolean!
  ) {
    createTodo(
      task: $task
      description: $description
      isCompleted: $isCompleted
    ) {
      task
      description
      isCompleted
      id
    }
  }
`;

export { CREATE_TODO };
