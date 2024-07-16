import { useEffect } from 'react';

type UseClickOutside = {
	rootRef: React.RefObject<HTMLDivElement>;
	isOpen: boolean;
	onClick: () => void;
};

export const useClickOutsideForm = ({
	isOpen,
	rootRef,
	onClick,
}: UseClickOutside) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClick?.();
			}
		};

		//Слушаем событие только при открытой форме
		isOpen && window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);
};
