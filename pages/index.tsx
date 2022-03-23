import Layout from './component/Layout';
import Todo from '../public/todo.js';
import { useEffect, useState } from 'react';
import Link from "next/link";
import db from '../public/firebase'
import { collection, query, orderBy, getDocs } from "firebase/firestore";

type todoList = {
	key: string;
	todo: string;
	check: boolean;
	show: boolean;
}
type setStateTodo = React.Dispatch<React.SetStateAction<todoList[]>>;
type setStateMessage = React.Dispatch<React.SetStateAction<string>>;

export default function Home () {
	let mylist: todoList[] = [];
	const [list, setList]: [todoList[], setStateTodo] = useState(mylist);
	const [msg, setMsg]: [string, setStateMessage] = useState('start');

	useEffect(() => { // リロードされても再取得しないようにする
		getDocs(query(collection(db, 'test'), orderBy('timestamp')))
			.then((res: any) => {
				if (res.docs.length !== 0) {
					res.forEach((doc: any) => {
						const item: any = doc.data();
						mylist.push({
							key: doc.id,
							todo: item.todo,
							check: item.check,
							show: true, // 表示するか（削除されていないか）
						});
					});
					setList(mylist);
					setMsg('todo set');
				} else {
					setMsg('Todoがありません');
				}
			}).catch(() => {
				setMsg('データ取得に失敗しました');
			});
	}, []);

	return (
		<div>
			<Layout title="Todo List" menu={(
				<Link href="/add">
					<a className="add_button">
						<img src="./add.png" alt="+" width={15} height={15} className="icon_add" />
						<span className="add_text">追加</span>
					</a>
				</Link>
			)}>
				{list.length === 0 && msg !== 'start'
					? <p className="message">todoリストがありません</p>
					: <Todo list={list} />
				}
			</Layout>
		</div>
	)
}
