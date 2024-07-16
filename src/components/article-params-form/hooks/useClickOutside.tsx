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
			const root = rootRef.current;
			if (target instanceof Node && !root?.contains(target)) {
				//target.parentElement?.parentElement что бы не работало на вновь отрисованых элементах
				target.parentElement?.parentElement && isOpen && onClick?.();
			}
		};

		//Слушаем событие только при открытой форме
		isOpen && window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [isOpen]);
};
