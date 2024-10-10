
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Content from '../Component/Content'; 

describe('Content Component', () => {
  test('renders the title and description passed as props', () => {

    const title = 'Test Title';
    const description = 'Test description of the content component.';

   
    render(<Content title={title} description={description} icon={'database'} />);

   
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description of the content component.')).toBeInTheDocument();
  });
});
