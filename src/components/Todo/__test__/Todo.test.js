import React from 'react';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import Todo from '../Todo';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';

const MockTodoComponent = () => {
  return (
    <MemoryRouter>
      <Todo />
    </MemoryRouter>
  );
};

const mockAddTodo = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole('button', { name: /Add/i });
  tasks.forEach((task, index) => {
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.click(buttonElement);
  });
};

describe('Test Todo Component', () => {
  describe('Test Mounting component', () => {
    it('Test TODO render', () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <MockTodoComponent />
      );
      mockAddTodo(['Get Grosary']);
      const divElement = getByText(/Get Grosary/i);
      expect(divElement).toBeInTheDocument();
    });

    it('Test TODO render with multiple items', () => {
        render(<MockTodoComponent />);
        mockAddTodo(['Get Grosary', 'Wash my hands', 'Care pets']);
        const divElement = screen.getAllByTestId('todo-task');
        expect(divElement.length).toBe(3);
      });
  });

  describe('Test Completed class', () => {
    it('Check for not completed task', () => {
        render(<MockTodoComponent />);
        mockAddTodo(['Get Grosary']);
        const divElement = screen.getByText(/Get Grosary/i);
        expect(divElement).not.toHaveClass('todo-item-active')
    });

    it('Check for completed task', () => {
        render(<MockTodoComponent />);
        mockAddTodo(['Get Grosary']);
        const divElement = screen.getByText(/Get Grosary/i);
        fireEvent.click(divElement);
        expect(divElement).toHaveClass('todo-item-active')
    });
    
  });
  

  


});
