import MeasureUnitsPage from '@/pages/measure-units';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

describe('MeasureUnitsPage', () => {
  it('should render the heading', () => {
    const textToFind = 'Países';

    render(
      <QueryClientProvider client={queryClient}>
        <MeasureUnitsPage />
      </QueryClientProvider>
    );
    const heading = screen.getByText(textToFind);

    expect(heading).toBeInTheDocument();
  });
});
