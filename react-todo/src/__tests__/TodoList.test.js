import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList"; // Ensure this relative path is correct

describe("TodoList Component", () => {
  test("renders TodoList component", () => {
    render(<TodoList />);
    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
  });

  test("renders initial state with demo todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Learn Testing")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText("Add a new todo"), {
      target: { value: "New Todo" },
    });
    fireEvent.click(screen.getByText("Add Todo"));
    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("prevents adding an empty todo", () => {
    render(<TodoList />);
    fireEvent.click(screen.getByText("Add Todo"));
    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Todo cannot be empty"
    );
  });

  test("toggles a todo between completed and not completed", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React").closest(".todo-item");
    fireEvent.click(todoItem.querySelector('input[type="checkbox"]'));
    expect(todoItem).toHaveClass("completed");
    fireEvent.click(todoItem.querySelector('input[type="checkbox"]'));
    expect(todoItem).not.toHaveClass("completed");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    fireEvent.click(screen.getByTestId("delete-todo-Learn React"));
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });

  test("prevents adding duplicate todos", () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText("Add a new todo"), {
      target: { value: "Learn React" },
    });
    fireEvent.click(screen.getByText("Add Todo"));

    // Attempt to add the same todo again
    fireEvent.change(screen.getByPlaceholderText("Add a new todo"), {
      target: { value: "Learn React" },
    });
    fireEvent.click(screen.getByText("Add Todo"));

    // Verify the error message
    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Todo is a duplicate"
    );
  });

  test("clears input field after adding a todo", () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText("Add a new todo"), {
      target: { value: "New Todo" },
    });
    fireEvent.click(screen.getByText("Add Todo"));
    expect(screen.getByPlaceholderText("Add a new todo").value).toBe("");
  });

  test("displays error message for invalid input", () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText("Add a new todo"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Add Todo"));
    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Todo cannot be empty"
    );
  });
});
