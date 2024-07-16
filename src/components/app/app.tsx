import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [blogSettings, setBlogSettings] = useState(defaultArticleState);
	const updateSettings = (value: ArticleStateType) => setBlogSettings(value);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': blogSettings.fontFamilyOption.value,
					'--font-size': blogSettings.fontSizeOption.value,
					'--font-color': blogSettings.fontColor.value,
					'--container-width': blogSettings.contentWidth.value,
					'--bg-color': blogSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm updateSettings={updateSettings} />
			<Article />
		</main>
	);
};
