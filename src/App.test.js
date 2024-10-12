// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });



// Unit tests for: App

import React from 'react'
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import "@testing-library/jest-dom";


// Mocking the components
jest.mock("./components/Banner/Banner", () => () => <div>Mocked Banner</div>);
jest.mock("./pages/TodoPage/TodoPage", () => () => <div>Mocked TodoPage</div>);
jest.mock("./pages/FollowersPage/FollowersPage", () => () => <div>Mocked FollowersPage</div>);

describe('App() App method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    it('should render the Banner component', () => {
      // Test to ensure the Banner component is rendered
      const { getByText } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
       
        </MemoryRouter>
      );
      expect(getByText('Mocked Banner')).toBeInTheDocument();
    });

    it('should render the TodoPage component when path is "/"', () => {
      // Test to ensure the TodoPage component is rendered on the root path
      const { getByText } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(getByText('Mocked TodoPage')).toBeInTheDocument();
    });

    it('should render the FollowersPage component when path is "/followers"', () => {
      // Test to ensure the FollowersPage component is rendered on the "/followers" path
      const { getByText } = render(
        <MemoryRouter initialEntries={['/followers']}>
          <App />
        </MemoryRouter>
      );
      expect(getByText('Mocked FollowersPage')).toBeInTheDocument();
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should not render any page component for an unknown path', () => {
      // Test to ensure no page component is rendered for an unknown path
      const { queryByText } = render(
        <MemoryRouter initialEntries={['/unknown']}>
          <App />
        </MemoryRouter>
      );
      expect(queryByText('Mocked TodoPage')).not.toBeInTheDocument();
      expect(queryByText('Mocked FollowersPage')).not.toBeInTheDocument();
    });

    it('should handle strict path matching correctly', () => {
      // Test to ensure strict path matching works as expected
      const { queryByText } = render(
        <MemoryRouter initialEntries={['/followers/extra']}>
          <App />
        </MemoryRouter>
      );
      expect(queryByText('Mocked FollowersPage')).not.toBeInTheDocument();
    });
  });
});

// End of unit tests for: App
