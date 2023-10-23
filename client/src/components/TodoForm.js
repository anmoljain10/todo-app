import { useCallback, useEffect, useState } from "react";
import { Button, Form, Spinner, Card } from "react-bootstrap";
import { CREATE_TODO } from "../graphql/mutations";
import { GET_TODOS } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TodoForm() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const [createTodo, { data, loading, error }] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  function onSliderValueChange(slideValue) {
    setSliderValue(slideValue);
  }

  useEffect(() => {
    if (data) {
      console.log("added")
      makeToast('Todo Added successfully!')
    }
  }, [data])

  const makeToast = useCallback((data) => {
    toast(data)
  }, [data])


  return (
    <>
      <div class="col-12 col-lg-10 mx-auto">
        <h1 style={{ marginTop: "20%", fontWeight: "bold", color: "white" }}>
          Add Todo
        </h1>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Card
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            padding: 40,
            width: "100%",
          }}
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              createTodo({
                variables: {
                  task,
                  description,
                  isCompleted: false,
                  priority: sliderValue,
                },
              });

              setTask("");
              setDescription("");
              setSliderValue(0);
            }}
          >
            <Form.Label class="text-white fs-2 mt-5 mb-2">
              <h3>Enter Task</h3>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task"
              value={task}
              style={{ paddingTop: 10, paddingBottom: 10 }}
              onChange={(event) => setTask(event.target.value)}
            ></Form.Control>

            <Form.Label class="text-white fs-2 mt-5 mb-2">
              <h3>Enter Description</h3>
            </Form.Label>
            <Form.Control
              type="text"
              style={{ paddingTop: 10, paddingBottom: 10 }}
              placeholder="Enter Description"
              as="textarea"
              row={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></Form.Control>
            <Form.Label class="text-white fs-2 mt-5 mb-2">
              <h3>Select Priority</h3>
            </Form.Label>
            <Slider
              max={5}
              value={sliderValue}
              railStyle={{ height: 15 }}
              trackStyle={{
                height: 15,
                backgroundColor:
                  sliderValue <= 2
                    ? "#33ccff"
                    : sliderValue <= 4
                      ? "#ffc34d"
                      : "#ff6666",
              }}
              handleStyle={{ height: 25, width: 25 }}
              onChange={onSliderValueChange}
            />
            <h4 class="mt-3 text-white">
              {sliderValue <= 2 ? "Low" : sliderValue <= 4 ? "Medium" : "High"}
            </h4>

            <div class="mt-5">
              <Button
                disabled={task === "" || description === "" || loading === true}
                type="submit"
                size="lg"
                variant="dark"
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default TodoForm;
