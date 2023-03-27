import "./App.css";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import TodoForm from "./components/TodoForm";
import {
  Container,
  Row,
  Col,
  ListGroupItem,
  ListGroup,
  Placeholder,
  Form,
} from "react-bootstrap";
import "./todoForm.css";

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

function App() {
  return (
    <div>
      <Container fluid>
        <Row
          style={{
            height: "100vh",
          }}
        >
          <Col
            style={{
              background:
                "linear-gradient(to bottom right, #d580ff,#c44dff,#8800cc, #aa00ff,#e580ff,#bf00ff)",
            }}
          >
            <TodoForm />
          </Col>
          <Col>
            <h1>Todos</h1>
            <Query query={GET_TODOS}>
              {({ loading, error, data }) => {
                if (loading)
                  return (
                    <>
                      <Placeholder xs={7} animation="glow">
                        <Placeholder
                          className="mt-2"
                          xs="7"
                          style={{ height: 50 }}
                        />
                      </Placeholder>
                      <Placeholder xs={7} animation="glow" className="mt-2">
                        <Placeholder
                          className="mt-2"
                          xs="7"
                          style={{ height: 50 }}
                        />
                      </Placeholder>
                      <Placeholder xs={7} animation="glow" className="mt-2">
                        <Placeholder
                          className="mt-2"
                          xs="7"
                          style={{ height: 50 }}
                        />
                      </Placeholder>
                    </>
                  );
                if (error) return <p>Error :(</p>;

                return (
                  <ListGroup>
                    {data.todoList.map(
                      ({ id, task, description, isCompleted }) => (
                        <ListGroupItem key={id}>
                          <h3>{task}</h3> {description}
                          <Form.Check
                            type={"checkbox"}
                            size="lg"
                            checked={isCompleted}
                          />
                        </ListGroupItem>
                      )
                    )}
                  </ListGroup>
                );
              }}
            </Query>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
