import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactForm Component', () => {

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should submit the form with valid data and show a success message', async () => {
    const user = userEvent.setup();
    // Arrange: Mock a successful API response
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Form submitted successfully!' }));

    render(<ContactForm />);

    // Act: Fill out the form with valid data
    await user.type(screen.getByPlaceholderText(/Your Full Name/i), 'Jane Doe');
    await user.type(screen.getByPlaceholderText(/Your Email/i), 'jane.doe@example.com');
    await user.type(screen.getByPlaceholderText(/Enter your message/i), 'This is a valid test message.');
    
    // Act: Click the submit button
    await user.click(screen.getByRole('button', { name: /Send/i }));

    // Assert: Check for the success message from the mocked API
    await waitFor(() => {
      expect(screen.getByText(/Form submitted successfully!/i)).toBeInTheDocument();
    });
  });

  it('should show an error modal when the API call fails', async () => {
    const user = userEvent.setup();
    // Arrange: Mock a failed API response
    fetchMock.mockResponseOnce(JSON.stringify({ error: 'Server is down' }), { status: 500 });

    render(<ContactForm />);

    // Act: Fill out the form and submit
    await user.type(screen.getByPlaceholderText(/Your Full Name/i), 'Jane Doe');
    await user.type(screen.getByPlaceholderText(/Your Email/i), 'jane.doe@example.com');
    await user.type(screen.getByPlaceholderText(/Enter your message/i), 'This is a valid test message.');
    await user.click(screen.getByRole('button', { name: /Send/i }));

    // Assert: Wait for the error modal to appear by looking for its title
    await waitFor(() => {
      expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    });
  });
});