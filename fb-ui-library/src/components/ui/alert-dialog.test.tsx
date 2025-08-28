import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {
  AlertDialogFooter,
  AlertDialogHeader,
} from './alert-dialog';

describe('AlertDialog Components', () => {
  describe('AlertDialogHeader', () => {
    it('renders header with children', () => {
      render(
        <AlertDialogHeader>
          <span>Header Content</span>
        </AlertDialogHeader>
      );
      
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <AlertDialogHeader className="custom-header">
          <span>Header</span>
        </AlertDialogHeader>
      );
      
      const header = screen.getByText('Header').parentElement;
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('AlertDialogFooter', () => {
    it('renders footer with children', () => {
      render(
        <AlertDialogFooter>
          <span>Footer Content</span>
        </AlertDialogFooter>
      );
      
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <AlertDialogFooter className="custom-footer">
          <span>Footer Content</span>
        </AlertDialogFooter>
      );
      
      const footer = screen.getByText('Footer Content').parentElement;
      expect(footer).toHaveClass('custom-footer');
    });
  });
});