import Layout from './component/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import db from '../public/firebase'
import { addDoc, collection, Timestamp } from "firebase/firestore";

type dataList = {
	todo: string;
	check: boolean;
	timestamp: any;
}
type setStateInput = React.Dispatch<React.SetStateAction<string>>;
type setStateMessage = React.Dispatch<React.SetStateAction<string>>;

export default function Add () {
	const router = useRouter();
	const [input, setInput]: [string, setStateInput] = useState('');
	const [msg, setMsg]: [string, setStateMessage] = useState('');

	const doChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const doSubmit = () => {
		if (input.length === 0) return setMsg('1文字以上入力してください');

		const data: dataList = {
			todo: input,
			check: false,
			timestamp: Timestamp.now(),
		};
		addDoc(collection(db, 'test'), data)
			.then(() => {
				router.push('/');
			});
	};

	return (
		<div>
			<Layout title="add Task">
				<p className="message">{msg}</p>
				<form>
					<textarea className="input" onChange={doChange} autoFocus></textarea>
					<button type="button" className="submit_button" onClick={doSubmit}>登録</button>
				</form>
			</Layout>
		</div>
	)
}
