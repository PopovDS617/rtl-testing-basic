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

test('should not show error message on invalud email initially', () => {
  render(<App />);

  const emailErrorElement = screen.queryByText(/the email is invalid/i);

  expect(emailErrorElement).not.toBeInTheDocument();
});

test('should not show error message on invalud password initially', () => {
  render(<App />);

  const passwordErrorElement = screen.queryByText(/the password is too short/i);

  expect(passwordErrorElement).not.toBeInTheDocument();
});

test('should not show error message on invalud confirm password initially', () => {
  render(<App />);

  const confirmPasswordErrorElement = screen.queryByText(
    /passwords are not equal/i
  );

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
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

test('should show error message on invalid password', () => {
  render(<App />);

  const passwordInputElement = screen.getByLabelText('Password');
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });

  userEvent.type(emailInputElement, 'test@test.com');
  userEvent.type(passwordInputElement, 'four');

  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitBtnElement);
  const passwordErrorElement = screen.getByText(/the password is too short/i);

  expect(passwordErrorElement).toBeInTheDocument();
});

test('should show error message on invalid confirm password', () => {
  render(<App />);

  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText('Confirm password');
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });

  userEvent.type(emailInputElement, 'test@test.com');
  userEvent.type(passwordInputElement, 'password');
  userEvent.type(confirmPasswordInputElement, 'password1');

  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElement = screen.getByText(
    /passwords are not equal/i
  );

  expect(confirmPasswordErrorElement).toBeInTheDocument();
});

test('should not show error message if all inputs are valid', () => {
  render(<App />);

  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText('Confirm password');

  userEvent.type(emailInputElement, 'test@test.com');
  userEvent.type(passwordInputElement, 'password');
  userEvent.type(confirmPasswordInputElement, 'password');

  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitBtnElement);

  const emailErrorElement = screen.queryByText(/the email is invalid/i);
  const passwordErrorElement = screen.queryByText(/the password is too short/i);
  const confirmPasswordErrorElement = screen.queryByText(
    /passwords are not equal/i
  );

  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});
