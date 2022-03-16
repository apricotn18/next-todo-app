import Layout from './component/Layout';
import Todo from './Todo';
import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import db from '../public/firebase'
import { collection, query, orderBy, getDocs } from "firebase/firestore";

export default function Home () {
	type todoList = {
		key: string;
		todo: string;
		check: boolean;
	};

	let mylist: todoList[] = [];
	const [list, setList] = useState(mylist);
	const [msg, setMsg] = useState('start');

	useEffect(() => { // リロードされても再取得しないようにする
		getDocs(query(collection(db, 'test'), orderBy('timestamp')))
			.then((res) => {
				if (res.docs.length !== 0) {
					res.forEach((doc) => {
						const item: any = doc.data();
						mylist.push({
							key: doc.id,
							todo: item.todo,
							check: item.check,
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
				<div>
					<Link href="/add">
						<a className="add_button">
							<Image src={require("../public/add.png")} alt="+" width={15} height={15} className="icon_add" />
							<span className="add_text">追加</span>
						</a>
					</Link>
				</div>
			)}>
				{msg === 'start' || msg === 'todo set' ? "" :<p className="massege">{msg}</p>}
				<Todo list={list} />
			</Layout>
		</div>
	)
}
