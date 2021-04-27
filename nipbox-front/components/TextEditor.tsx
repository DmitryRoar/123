import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import List from '@editorjs/list';
import LinkTool from '@editorjs/link';
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';
import Delimiter from '@editorjs/delimiter';

const EDITOR_JS_TOOLS = {
	list: List,
	linkTool: LinkTool,
	header: Header,
	simpleImage: SimpleImage,
	delimiter: Delimiter
};

const EditorJsContainer = dynamic(
	() => {
		return import('react-editor-js');
	},
	{ ssr: false }
);

interface TextEditorProps {
	onChange: (data: any) => any;
	saveCb?: (data) => any;
	data?: any;
}

export default function TextEditor({
	onChange,
	data = {
		time: 1556098174501,
		blocks: [
			{
				type: 'paragraph',
				data: {
					text: 'Пишите сoдержание пoста здесь',
				},
			},
		],
		version: '2.12.4',
	},
}: TextEditorProps) {
	const [editorState, setEditorState] = useState();

	useEffect(() => {
		console.log(editorState);
		// const data = editorState
	}, [editorState]);

	return (
		<EditorJsContainer
			instanceRef={(instanse) => {
				//@ts-ignore
				setEditorState(instanse);
			}}
			data={data}
			tools={EDITOR_JS_TOOLS}
			onChange={onChange}
			holder="customEditor"
		>
			<div id="customEditor" />
		</EditorJsContainer>
	);
}
