import { render, screen, cleanup } from '@testing-library/react';
// Importing the jest testing library
import '@testing-library/jest-dom';
import RegisterVW from '../view/register';

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe('Button Component', () => {
  const setToggle = jest.fn();
  render(<RegisterVW setToggle={setToggle} btnTxt="Click Me!" />);
  const button = screen.getByTestId('button');

  // Test 1
  test('Button Rendering', () => {
    expect(button).toBeInTheDocument();
  });

  // Test 2
  test('Button Text', () => {
    expect(button).toHaveTextContent('Click Me!');
  });
});
