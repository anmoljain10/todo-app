import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoUpdateModal from "./components/TodoUpdateModal";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

import { useState } from "react";

function App() {
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentTodoForUpdate, setCurrentTodoForUpdate] = useState({});

  function onUpdateModalClose() {
    setUpdateModalVisible(false);
    setCurrentTodoForUpdate({});
  }

  return (
    <div>
      <Container fluid>
        <TodoUpdateModal
          isVisible={updateModalVisible}
          onClose={onUpdateModalClose}
          todoItem={currentTodoForUpdate}
        />
        <Row
          style={{
            height: "100vh",
          }}
        >
          <Col lg={6} className="animated-background">
            <TodoForm />
          </Col>
          <Col className="px-5 py-4">
            <h1 class="mb-3">Todos</h1>
            <TodoList
              onTodoUpdateClick={(todoItem) => {
                console.log(todoItem);
                setCurrentTodoForUpdate(todoItem);
                setUpdateModalVisible(true);
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
