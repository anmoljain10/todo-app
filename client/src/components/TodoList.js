import {
  ListGroupItem,
  ListGroup,
  Placeholder,
  Form,
  CloseButton,
} from "react-bootstrap";
import { GET_TODOS } from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_TODO } from "../graphql/mutations";

function TodoList() {
  const placeholderSkeletons = [
    "placeholder 1",
    "placeholder 2",
    "placeholder 3",
    "placeholder 4",
  ];
  const { loading, error, data } = useQuery(GET_TODOS);
  const [removeTodo, removeResponse] = useMutation(REMOVE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  return (
    <>
      {loading &&
        placeholderSkeletons.map(() => {
          return (
            <Placeholder xs={7} animation="glow">
              <Placeholder className="mt-2" xs="7" style={{ height: 50 }} />
            </Placeholder>
          );
        })}
      {error && <p>Error :(</p>}
      {data && (
        <ListGroup>
          {data.todoList.map(({ id, task, description, isCompleted }) => (
            <ListGroupItem key={id}>
              <h3>{task}</h3> {description}
              <CloseButton
                variant="red"
                style={{ position: "absolute", top: 10, right: 10 }}
                onClick={() => {
                  removeTodo({ variables: { taskId: id } });
                }}
              ></CloseButton>
              <Form.Check type={"checkbox"} size="lg" checked={isCompleted} />
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </>
  );
}

export default TodoList;
