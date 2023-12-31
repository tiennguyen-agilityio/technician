import type { Meta, StoryObj } from '@storybook/react';
import { NotificationIcon } from '@/assets/icons';

import IconButton from '.';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    isActive: true,
    icon: <NotificationIcon />,
  },
};
