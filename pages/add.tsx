import Layout from './component/Layout';
import db from '../public/firebase'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { addDoc, collection } from "firebase/firestore";

export default function Home () {
	const router = useRouter();
	const [todo, setTodo] = useState('');

	const doChange = (e: any) => {
		setTodo(e.target.value);
	};

	const doSubmit = () => {
		const data = {
			todo,
			check: false,
			time: new Date(),
		};
		addDoc(collection(db, 'test'), data)
			.then(() => {
				router.push('/');
			});
	};

	return (
		<div>
			<Layout title="add Task">
				<form>
					<textarea className="input" onChange={doChange}></textarea>
					<button type="button" className="submit_button" onClick={doSubmit}>登録</button>
				</form>
			</Layout>
		</div>
	)
}
