import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AddInput from "../AddInput";

const mockSetTodos = jest.fn();
describe('Test Add input Component', () => {

    describe('Test Render element', () => {
        
        it('Test Render', () => {
            render(<AddInput setTodos={mockSetTodos} todos={[]}/>);
            const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
            expect(inputElement).toBeInTheDocument();
        });

        it('Button Render', () => {
            render(<AddInput setTodos={mockSetTodos} todos={[]}/>);
            const buttonElement = screen.getByRole('button',{name:/add/i});
            expect(buttonElement).toBeInTheDocument();
        });


    });
    
    describe('Test Interaction', () => { 
        it('Input Interaction', () => {
            const {getByPlaceholderText} = render(<AddInput setTodos={mockSetTodos} todos={[]}/>);
            const inputElement = getByPlaceholderText(/Add a new task here.../i);
            fireEvent.change(inputElement,{ target:{value:"New Task"}});
            expect(inputElement.value).toBe('New Task');
        });

        it('Button Clicked', () => {
            const {getByPlaceholderText, getByRole} = render(<AddInput setTodos={mockSetTodos} todos={[]}/>);
            const inputElement = getByPlaceholderText(/Add a new task here.../i);
            const buttonElement = getByRole('button',{name:/add/i});

            fireEvent.change(inputElement,{ target:{value:"New Task"}});
            expect(inputElement.value).toBe("New Task");
            fireEvent.click(buttonElement);
            expect(mockSetTodos).toHaveBeenCalledWith([{
                id: expect.any(String),
                task: 'New Task',
                completed: false,
            }])
        });
        
        
        
     })
   
    describe('Edge Cases', () => {
        it('input validation', () => {
            const { getByRole} = render(<AddInput setTodos={mockSetTodos} todos={[]}/>);
            const buttonElement = getByRole('button',{name:/add/i});
            
            expect(mockSetTodos).not.toHaveBeenCalled();
        });

        it('Long Description',()=>{
            const lgnDescription = 'a'.repeat(500);
            const { getByRole, getByPlaceholderText} = render(<AddInput setTodos={mockSetTodos} todos={[]}/>);
            const inputElement = getByPlaceholderText(/Add a new task here.../i);
            const buttonElement = getByRole('button',{name:/add/i});
            fireEvent.change(inputElement,{target:{value:lgnDescription}});
            expect(inputElement.value).toBe(lgnDescription);
            fireEvent.click(buttonElement);
            expect(mockSetTodos).toHaveBeenCalledWith([{
                id: expect.any(String),
                completed: false,
                task:lgnDescription
            }])


        })
        
        it('Clear input after Button Clicked', () => {
            const {getByPlaceholderText, getByRole} = render(<AddInput setTodos={mockSetTodos} todos={[]}/>);
            const inputElement = getByPlaceholderText(/Add a new task here.../i);
            const buttonElement = getByRole('button',{name:/add/i});

            fireEvent.change(inputElement,{ target:{value:"New Task"}});
            expect(inputElement.value).toBe("New Task");
            fireEvent.click(buttonElement);
            expect(inputElement.value).toBe("");
        });
    
    });
    
});
