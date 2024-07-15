import { SyntheticEvent, useState } from 'react';
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

type ArticleParamsProps = {
	updateSettings: (formInputs: ArticleStateType) => void;
	settings: ArticleStateType;
};
export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleArrowClick = () => setIsOpen(!isOpen);

	const handleInputChange = (optionItem: string) => {
		return (value: OptionType) => {
			props.updateSettings({
				...props.settings,
				[optionItem]: value,
			});
		};
	};

	const handleResetButton = () => {
		props.updateSettings(defaultArticleState);
	};

	const handleSubmitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		setIsOpen(false);
		props.updateSettings(props.settings);
	};

	return (
		<>
			<ArrowButton onClick={handleArrowClick} formState={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmitForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={props.settings.fontFamilyOption}
						onChange={handleInputChange('fontFamilyOption')}
						title={'Шрифт'}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={props.settings.fontSizeOption}
						onChange={handleInputChange('fontSizeOption')}
						title={'Размер шрифта'}
					/>
					<Select
						options={fontColors}
						selected={props.settings.fontColor}
						onChange={handleInputChange('fontColor')}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={props.settings.backgroundColor}
						onChange={handleInputChange('backgroundColor')}
						title={'Цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						selected={props.settings.contentWidth}
						onChange={handleInputChange('contentWidth')}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetButton} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
