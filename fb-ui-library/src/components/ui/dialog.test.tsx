import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {
  DialogFooter,
  DialogHeader,
} from './dialog';

describe('Dialog Components', () => {
  describe('DialogHeader', () => {
    it('renders header with children', () => {
      render(
        <DialogHeader>
          <span>Header Content</span>
        </DialogHeader>
      );
      
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <DialogHeader className="custom-header">
          <span>Header Content</span>
        </DialogHeader>
      );
      
      const header = screen.getByText('Header Content').parentElement;
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('DialogFooter', () => {
    it('renders footer with children', () => {
      render(
        <DialogFooter>
          <span>Footer Content</span>
        </DialogFooter>
      );
      
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <DialogFooter className="custom-footer">
          <span>Footer Content</span>
        </DialogFooter>
      );
      
      const footer = screen.getByText('Footer Content').parentElement;
      expect(footer).toHaveClass('custom-footer');
    });
  });
});