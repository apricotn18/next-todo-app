// TODO: doCheckした時のfirebase更新

import Layout from './component/Layout';
import { useEffect, useState } from 'react';
import Link from "next/link";
import db from '../public/firebase'
import { collection, getDocs } from "firebase/firestore";

const COMPLETE_CLASS = 'is-complete';

export default function Home () {
	type todoList = {
		todo: string;
		check: boolean;
		timestamp: number;
	};

	const mydata: any[] = [];
	const [data, setData] = useState(mydata);
	const [msg, setMsg] = useState('start');

	const sortByTime = (array: todoList[]): todoList[] => {
		console.log(array);
		return array.sort((a, b) => {
			return a.timestamp > b.timestamp ? 1 : -1;
		});
	};

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
					setData(sortByTime(mydata));
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
	}

	return (
		<div>
			<Layout title="Todo List" menu={(
				<div>
					<Link href="/add"><a className="button button--add">追加</a></Link>
					<Link href="/delete"><a className="button button--del">削除</a></Link>
				</div>
			)}>
				{msg === 'start' || msg === 'todo set' ? "" :<p className="massege">{msg}</p>}
				<ul className="todo">
					{data.length !== 0 ? data.map((item) => {
						return (
					<li key={item.key} className={item.check ? COMPLETE_CLASS : ''} onClick={doCheck}>
						<div><button className="check"></button></div>
						<p>{item.todo}</p>
					</li>
						)
					}) : ""}
				</ul>
			</Layout>
		</div>
	)
}
