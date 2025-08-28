import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Label } from './label';

describe('Label', () => {
  it('renders label text correctly', () => {
    render(<Label>Test Label</Label>);
    
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-sm', 'font-medium');
  });

  it('associates with form controls using htmlFor', () => {
    render(
      <div>
        <Label htmlFor="test-input">Email</Label>
        <input id="test-input" type="email" />
      </div>
    );
    
    const label = screen.getByText('Email');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('applies custom className', () => {
    render(<Label className="custom-label">Custom Label</Label>);
    
    const label = screen.getByText('Custom Label');
    expect(label).toHaveClass('custom-label');
  });

  it('renders with additional props', () => {
    render(<Label data-testid="test-label">Test Label</Label>);
    
    const label = screen.getByTestId('test-label');
    expect(label).toBeInTheDocument();
  });

  it('handles disabled state styling through parent group', () => {
    render(
      <div className="group" data-disabled="true">
        <Label>Disabled Label</Label>
      </div>
    );
    
    const label = screen.getByText('Disabled Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('group-data-[disabled=true]:opacity-50');
  });
});