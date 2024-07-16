import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from 'components/text';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useClickOutsideForm } from './hooks/useClickOutside';
import { useKeyDownListener } from './hooks/useKeyDownListener';

type ArticleParamsProps = {
	updateSettings: (formInputs: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [blogSettings, setBlogSettings] = useState(defaultArticleState);
	const refRootParamForm = useRef<HTMLDivElement | null>(null);

	const handleClick = () => setIsOpen(!isOpen);

	const handleInputChange = (optionKey: string) => {
		return (optionValue: OptionType) => {
			setBlogSettings({
				...blogSettings,
				[optionKey]: optionValue,
			});
		};
	};

	const handleResetButton = () => {
		setBlogSettings(defaultArticleState);
		props.updateSettings(defaultArticleState);
	};

	const handleSubmitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		setIsOpen(false);
		props.updateSettings(blogSettings);
	};

	useClickOutsideForm({
		isOpen,
		rootRef: refRootParamForm,
		onClick: () => handleClick(),
	});

	useKeyDownListener({
		key: 'Escape',
		flag: isOpen,
		callBack: () => setIsOpen(false),
	});

	return (
		<div ref={refRootParamForm}>
			<ArrowButton formState={{ isOpen, handleClick }} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmitForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={blogSettings.fontFamilyOption}
						onChange={handleInputChange('fontFamilyOption')}
						title={'Шрифт'}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={blogSettings.fontSizeOption}
						onChange={handleInputChange('fontSizeOption')}
						title={'Размер шрифта'}
					/>
					<Select
						options={fontColors}
						selected={blogSettings.fontColor}
						onChange={handleInputChange('fontColor')}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={blogSettings.backgroundColor}
						onChange={handleInputChange('backgroundColor')}
						title={'Цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						selected={blogSettings.contentWidth}
						onChange={handleInputChange('contentWidth')}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetButton} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
