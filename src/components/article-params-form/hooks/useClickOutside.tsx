import { useEffect } from 'react';

type UseClickOutside = {
	rootRef: React.RefObject<HTMLDivElement>;
	isOpen: boolean;
	onClick: () => void;
};

const itOutside = (element: Node, root: HTMLDivElement) => {
	if (!root.contains(element)) {
		let parent = element.parentElement;
		while (parent !== null) {
			parent = parent.parentElement;
			if (parent == document.body) return true;
		}
	}
	return parent === null ? true : false;
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
			const outside = itOutside(target as Node, root as HTMLDivElement);
			if (target instanceof Node && outside) onClick?.();
		};

		//Слушаем событие только при открытой форме
		isOpen && window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [isOpen]);
};
