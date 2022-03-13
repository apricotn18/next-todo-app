// TODO: doCheckした時のfirebase更新

import Layout from './component/Layout';
import { useEffect, useState } from 'react';
import Link from "next/link";
import db from '../public/firebase'
import { collection, doc, query, orderBy, deleteDoc, getDocs } from "firebase/firestore";

const COMPLETE_CLASS = 'is-complete';

export default function Home () {
	type todoList = {
		key: string;
		todo: string;
		check: boolean;
	};

	const mydata: todoList[] = [];
	const [data, setData] = useState(mydata);
	const [msg, setMsg] = useState('start');

	useEffect(() => { // リロードされても再取得しないようにする
		getDocs(query(collection(db, 'test'), orderBy('timestamp')))
			.then((res) => {
				if (res.docs.length !== 0) {
					res.forEach((doc) => {
						const item: any = doc.data();
						mydata.push({
							key: doc.id,
							todo: item.todo,
							check: item.check,
						});
					});
					setData(mydata);
					setMsg('todo set');
				} else {
					setMsg('Todoがありません');
				}
			}).catch(() => {
				setMsg('データ取得に失敗しました');
			});
	}, []);

	const doCheck = (e: any) => {
		e.currentTarget.classList.toggle(COMPLETE_CLASS);
	};

	const doDelete = (e: any) => {
		e.stopPropagation();
		const id = e.currentTarget.dataset.id;

		if (confirm('削除しますか？')) {
			deleteDoc(doc(db, 'test', id))
				.then(() => {
					const filterData = data.filter(item => item.key !== id);
					setData(filterData);
					if (filterData.length === 0) {
						setMsg('Todoがありません');
					}
				});
		}
	};

	return (
		<div>
			<Layout title="Todo List" menu={(
				<div>
					<Link href="/add"><a className="button button--add">追加</a></Link>
				</div>
			)}>
				{msg === 'start' || msg === 'todo set' ? "" :<p className="massege">{msg}</p>}
				<ul className="todo">
					{data.length !== 0 ? data.map((item) => {
						return (
					<li key={item.key} className={item.check ? COMPLETE_CLASS : ''} onClick={doCheck}>
						<div><button className="check"></button></div>
						<p>{item.todo}</p>
						<div className="delete_button_wrapper"><button type="button" className="delete_button" onClick={doDelete} data-id={item.key}></button></div>
					</li>
						)
					}) : ""}
				</ul>
			</Layout>
		</div>
	)
}
