import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {
  DropdownMenuSeparator,
} from './dropdown-menu';

describe('DropdownMenu Components', () => {
  describe('DropdownMenuSeparator', () => {
    it('renders separator element', () => {
      render(<DropdownMenuSeparator data-testid="separator" />);
      
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<DropdownMenuSeparator className="custom-separator" data-testid="separator" />);
      
      const separator = screen.getByTestId('separator');
      expect(separator).toHaveClass('custom-separator');
    });
  });
});