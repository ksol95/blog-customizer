import { useEffect } from 'react';

type TuseKeyDownListener = {
	key: string;
	flag: boolean;
	callBack: () => void;
};
export const useKeyDownListener = ({
	key,
	flag,
	callBack,
}: TuseKeyDownListener) => {
	const handleEscKey = (event: KeyboardEvent) =>
		event.key === key && callBack();

	useEffect(() => {
		flag && window.addEventListener('keydown', handleEscKey);
		return () => {
			window.removeEventListener('keydown', handleEscKey);
		};
	}, [flag]);
};
