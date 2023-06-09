import gql from "graphql-tag";

const CREATE_TODO = gql`
  mutation createTodo(
    $task: String!
    $description: String!
    $isCompleted: Boolean!
    $priority: Int!
  ) {
    createTodo(
      task: $task
      description: $description
      isCompleted: $isCompleted
      priority: $priority
    ) {
      task
      description
      priority
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

const UPDATE_TASK_STATUS = gql`
  mutation updateTaskStatus($taskId: ID!) {
    updateTaskStatus(taskId: $taskId)
  }
`;

const UPDATE_TASK_DETAILS = gql`
  mutation updateTaskDetails(
    $taskId: ID!
    $task: String!
    $description: String!
  ) {
    updateTaskDetails(taskId: $taskId, task: $task, description: $description) {
      task
      description
      id
      isCompleted
    }
  }
`;

export { CREATE_TODO, REMOVE_TODO, UPDATE_TASK_STATUS, UPDATE_TASK_DETAILS };
