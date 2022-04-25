import HomePage from '@/pages/';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('HomePage', () => {
  it('should render the heading', () => {
    const textToFind = 'HOME';

    render(<HomePage />);
    const heading = screen.getByText(textToFind);

    expect(heading).toBeInTheDocument();
  });
});
