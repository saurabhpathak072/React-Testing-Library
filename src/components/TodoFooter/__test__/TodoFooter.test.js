import React from 'react';
import TodoFooter from '../TodoFooter';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const MockTodoFooter = ({ numberOfIncompleteTasks }) => {
  return (
    <BrowserRouter>
      <TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks} />
    </BrowserRouter>
  );
};
describe('TasksList', () => {
  it('Should render the correct number of incomplete tasks', () => {
    render(<MockTodoFooter numberOfIncompleteTasks={5} />);
    const paragraphElement = screen.getByText(/5 tasks left/i);
    const paragraphElement1 = screen.getByRole('link');



    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement1).toBeInTheDocument();
  });

  it('Should render the "task" when number of incomplete task is one', () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByText(/1 task left/i);

    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toContainHTML('p');
  });
  it('check 2', () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByTestId('para');

    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveTextContent(/1 task left/i);
  });
  
});
