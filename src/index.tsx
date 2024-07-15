import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [blogSettings, setBlogSettings] = useState(defaultArticleState);
	const updateSettings = (value: ArticleStateType) => setBlogSettings(value);
	return (
		<div
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
			<ArticleParamsForm
				settings={blogSettings}
				updateSettings={updateSettings}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
