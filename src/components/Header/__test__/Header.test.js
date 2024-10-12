import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe('Header component', () => {
    describe('Happy Path', () => {
        it('Test Render text', () => {
            render(<Header title={"My Header"}/>);
            const headerText = screen.getByText(/my Header/i);
            expect(headerText).toBeInTheDocument();
        });
        
        it('Should render same text passed into title props',()=>{
            render(<Header title={"My Header test"}/>);
            const headertext = screen.getByText("My Header test");
            expect(headertext).toBeInTheDocument();
        })
       
        it('Test component by role', () => {
            render(<Header title={'by role'}/>);
            const headerbyRole = screen.getByRole('heading');
            expect(headerbyRole).toBeInTheDocument();
        });
        

    });
    
});
