import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Container, Row, Col } from "react-bootstrap";

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
          <Col className="px-5 py-4">
            <h1 class="mb-3">Todos</h1>
            <TodoList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
