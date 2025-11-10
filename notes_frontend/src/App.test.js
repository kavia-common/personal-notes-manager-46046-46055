import { render, screen } from '@testing-library/react';
import App from './App';

test('renders topbar search input and new note button', () => {
  render(<App />);
  const search = screen.getByLabelText(/search notes by title/i);
  expect(search).toBeInTheDocument();
  const add = screen.getByRole('button', { name: /add note/i });
  expect(add).toBeInTheDocument();
});
