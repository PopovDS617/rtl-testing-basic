import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//
import App from './App';

it('inputs should be initially empty', () => {
  render(<App />);

  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

it('should be able to type an email', () => {
  render(<App />);

  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  userEvent.type(emailInputElement, 'testEmail');

  expect(emailInputElement.value).toBe('testEmail');
});

it('should be able to type a password', () => {
  render(<App />);

  const passwordInputElement = screen.getByLabelText('Password');
  userEvent.type(passwordInputElement, 'testPassword');

  expect(passwordInputElement.value).toBe('testPassword');
});

it('should be able to type a confirmed password', () => {
  render(<App />);

  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  userEvent.type(confirmPasswordInputElement, 'confirm');

  expect(confirmPasswordInputElement.value).toBe('confirm');
});

test('should show error message on invalid email', () => {
  render(<App />);

  const emailInputElement = screen.getByRole('textbox', { name: /email/i });

  userEvent.type(emailInputElement, 'invalid email');

  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitBtnElement);
  const emailErrorElement = screen.getByText(/the email is invalid/i);

  expect(emailErrorElement).toBeInTheDocument();
});

test('should not show error message on invalud email initially', () => {
  render(<App />);

  const emailErrorElement = screen.queryByText(/the email is invalid/i);

  expect(emailErrorElement).not.toBeInTheDocument();
});
