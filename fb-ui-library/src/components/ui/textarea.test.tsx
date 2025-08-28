import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders textarea element', () => {
    render(<Textarea placeholder="Enter message" />);
    
    const textarea = screen.getByPlaceholderText('Enter message');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('min-h-16', 'w-full', 'rounded-md');
  });

  it('handles text input correctly', () => {
    render(<Textarea placeholder="Type message" />);
    
    const textarea = screen.getByPlaceholderText('Type message');
    fireEvent.change(textarea, { target: { value: 'multiline\ntext input' } });
    
    expect(textarea).toHaveValue('multiline\ntext input');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Textarea disabled placeholder="Disabled textarea" />);
    
    const textarea = screen.getByPlaceholderText('Disabled textarea');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:opacity-50');
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-textarea" placeholder="Custom textarea" />);
    
    const textarea = screen.getByPlaceholderText('Custom textarea');
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('handles onChange events', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} placeholder="Change test" />);
    
    const textarea = screen.getByPlaceholderText('Change test');
    fireEvent.change(textarea, { target: { value: 'new content' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('supports default value', () => {
    render(<Textarea defaultValue="initial content" />);
    
    const textarea = screen.getByDisplayValue('initial content');
    expect(textarea).toBeInTheDocument();
  });

  it('supports rows attribute', () => {
    render(<Textarea rows={5} placeholder="Tall textarea" />);
    
    const textarea = screen.getByPlaceholderText('Tall textarea');
    expect(textarea).toHaveAttribute('rows', '5');
  });
});