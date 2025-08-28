import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('h-9', 'w-full', 'rounded-md');
  });

  it('handles text input correctly', () => {
    render(<Input placeholder="Type here" />);
    
    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'test input' } });
    
    expect(input).toHaveValue('test input');
  });

  it('supports different input types', () => {
    const types = ['text', 'email', 'password', 'number'] as const;
    
    types.forEach((type) => {
      const { unmount } = render(<Input type={type} placeholder={`${type} input`} />);
      const input = screen.getByPlaceholderText(`${type} input`);
      expect(input).toHaveAttribute('type', type);
      unmount();
    });
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled input" />);
    
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:opacity-50');
  });

  it('applies custom className', () => {
    render(<Input className="custom-input" placeholder="Custom input" />);
    
    const input = screen.getByPlaceholderText('Custom input');
    expect(input).toHaveClass('custom-input');
  });

  it('handles onChange events', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Change test" />);
    
    const input = screen.getByPlaceholderText('Change test');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('supports default value', () => {
    render(<Input defaultValue="initial value" />);
    
    const input = screen.getByDisplayValue('initial value');
    expect(input).toBeInTheDocument();
  });
});