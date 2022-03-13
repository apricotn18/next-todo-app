// TODO: doCheckした時のfirebase更新

import Layout from './component/Layout';
import db from '../public/firebase'
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";

const COMPLETE_CLASS = 'is-complete';

export default function Home () {
	type todoList = {
		todo: string;
		check: boolean;
	};

	const mydata: any[] = [];
	const [data, setData] = useState(mydata);
	const [msg, setMsg] = useState('connect..');

	useEffect(() => {
		getDocs(collection(db, 'test'))
			.then((res) => {
				if (res !== null) {
					res.forEach((doc) => {
						const item: any = doc.data();
						mydata.push({
							key: doc.id,
							todo: item.todo,
							check: item.check,
						});
					});
					setData(mydata);
					setMsg('');
				} else {
					setMsg('Todoがありません');
				}
			}).catch(() => {
				setMsg('データ取得に失敗しました');
			});
	}, []);

	const doCheck = (e: any) => {
		e.currentTarget.classList.toggle(COMPLETE_CLASS);
	}

	return (
		<div>
			<Layout title="Todos">
				<div>
					<ul className="todo">
						{data.length !== 0 ? data.map((item) => {
							return (
						<li key={item.key} className={item.check ? COMPLETE_CLASS : ''} onClick={doCheck}>
							<div><button className="check"></button></div>
							<p>{item.todo}</p>
						</li>
							)
						}) : <li className="is-empty">{msg}</li>}
					</ul>
				</div>
			</Layout>
		</div>
	)
}
