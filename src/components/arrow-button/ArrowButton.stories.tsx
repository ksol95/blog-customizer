import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';
import { useState } from 'react';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
	tags: ['autodocks'],
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

const ArrowButtonToggle = () => {
	const [isOpen, setIsOpen] = useState(false);
	const handleClick = () => setIsOpen(!isOpen);

	return (
		<>
			<ArrowButton formState={{ isOpen, handleClick }} />
		</>
	);
};

export const ArrowButtonStory: Story = {
	render: () => <ArrowButtonToggle />,
};
