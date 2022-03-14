import Layout from './component/Layout';
import { useEffect, useState } from 'react';
import Link from "next/link";
import db from '../public/firebase'
import { collection, doc, query, orderBy, deleteDoc, getDocs, updateDoc } from "firebase/firestore";

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

	let isUpdateCheckState = false;
	const doCheck = (e: any) => {
		// 連打対策
		if (isUpdateCheckState) return;
		isUpdateCheckState = true;

		const targetElement = e.currentTarget;
		const id = targetElement.dataset.id;
		const shouldChecked = e.currentTarget.classList.contains(COMPLETE_CLASS);
		updateDoc(doc(db, 'test', id), {
				check: !shouldChecked,
			}).then(() => {
				targetElement.classList.toggle(COMPLETE_CLASS);
				isUpdateCheckState = false;
			}).catch(() => {
				setMsg('更新に失敗しました');
			});
	};

	const doDelete = (e: any) => {
		e.stopPropagation();
		const id = e.currentTarget.closest('li').dataset.id;

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
					<Link href="/add"><a className="add_button"><img src={`add.png`} width="15px" height="15px" />追加</a></Link>
				</div>
			)}>
				{msg === 'start' || msg === 'todo set' ? "" :<p className="massege">{msg}</p>}
				<ul className="todo">
					{data.length !== 0 ? data.map((item) => {
						return (
							<li key={item.key} className={item.check ? COMPLETE_CLASS : ''} onClick={doCheck} data-id={item.key}>
								<div><span className="check"></span></div>
								<p>{item.todo}</p>
								<div className="delete_button_wrapper"><button type="button" className="delete_button" onClick={doDelete}></button></div>
							</li>
						)
					}) : ""}
				</ul>
			</Layout>
		</div>
	)
}
