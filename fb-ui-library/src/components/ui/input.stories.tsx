import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

const meta = {
  title: 'ShadCN/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        type="text"
        placeholder="Text input"
      />
      <Input
        type="email"
        placeholder="Email input"
      />
      <Input
        type="password"
        placeholder="Password input"
      />
      <Input
        type="number"
        placeholder="Number input"
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};
