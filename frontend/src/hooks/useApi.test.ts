import { renderHook, act, waitFor } from '@testing-library/react';
import { useApi } from './useApi';

describe('useApi Hook', () => {

  // Reset mocks before each test to ensure isolation
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return the initial state correctly', () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useApi('/test'));

    // Assert: Check the initial values
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle a successful API call', async () => {
    // Arrange: Mock a successful response
    const mockSuccessData = { message: 'Success' };
    fetchMock.mockResponseOnce(JSON.stringify(mockSuccessData));

    const { result } = renderHook(() => useApi('/test-success'));

    // Act: Execute the API call within an 'act' block
    act(() => {
      result.current.execute({ test: 'body' });
    });

    // Assert: Wait for the hook's state to update
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockSuccessData);
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle a failed API call (e.g., 500 error)', async () => {
    // Arrange: Mock a server error response
    fetchMock.mockResponseOnce(JSON.stringify({ error: 'Server exploded' }), { status: 500 });

    const { result } = renderHook(() => useApi('/test-failure'));

    // Act
    act(() => {
      result.current.execute({ test: 'body' });
    });

    // Assert: Wait for the error state to be populated
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).not.toBeNull();
      expect(result.current.error?.code).toBe(500);
    });
  });
});
