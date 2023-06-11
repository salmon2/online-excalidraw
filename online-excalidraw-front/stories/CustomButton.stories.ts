import type { Meta, StoryObj } from '@storybook/react';
import Button from '@components/button';

const meta: Meta<typeof Button> = {
    title: 'My/Button',
    component: Button,    
};
  
export default meta;
type Story = StoryObj<typeof Button>;

export const Small: Story = {
    args: {
        children : 'hello world'
    },
};
  
