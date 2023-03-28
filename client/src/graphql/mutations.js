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

const REMOVE_TODO = gql`
  mutation removeTodo($taskId: ID!) {
    removeTodo(taskId: $taskId)
  }
`;

export { CREATE_TODO, REMOVE_TODO };
