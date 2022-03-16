import { useState } from 'react';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import db from '../public/firebase'

const COMPLETE_CLASS = 'is-complete';

export default function Todo (props: any) {
	type todoList = {
		key: string;
		todo: string;
		check: boolean;
	};

	const mylist = props.list;
	const [list, setList] = useState(mylist);

	let isUpdateState = false;
	const doCheck = (e: any) => {
		// 連打対策
		if (isUpdateState) return;
		isUpdateState = true;

		const targetElement = e.currentTarget;
		const id = targetElement.dataset.id;
		const index = targetElement.dataset.index;
		const updateCheck = list[index].check;

		updateDoc(doc(db, 'test', id), {
				check: updateCheck,
			}).then(() => {
				// 表示更新
				targetElement.classList.toggle(COMPLETE_CLASS);
				// listの状態更新
				const newList = list;
				newList[index].check = !updateCheck;
				setList(newList);
				// 連打対策
				isUpdateState = false;
			}).catch(() => {
				// setMsg('更新に失敗しました');
			});
	};

	const doDelete = (e: any) => {
		e.stopPropagation();
		const targetElement = e.currentTarget.closest('li');
		const id = targetElement.dataset.id;
		const index = targetElement.dataset.index;

		if (confirm('削除しますか？')) {
			deleteDoc(doc(db, 'test', id))
				.then(() => {
					// 表示更新
					targetElement.style.display = 'none';
					// listの状態更新
					const newList = list;
					newList.splice(index, 1);
					setList(newList);
					// 表示するTodoがない場合
					if (newList.length === 0) {
						// setMsg('Todoがありません');
					}
				});
		}
	};

	const doFilter = (e: any) => {
		const condition = e.currentTarget.dataset.filter;
		let newSort = [];

		if (condition === 'complete') {
			newSort = mylist.filter((item: todoList) => item.check);
		} else if (condition === 'incomplete') {
			newSort = mylist.filter((item: todoList) => !item.check);
		} else {
			newSort = mylist;
		}
		setList(newSort);
	};

	return (
		<div>
			<dl className="filter">
				<dt>タスクの絞り込み：</dt>
				<dd><button className="filter_button" onClick={doFilter} data-filter="complete">完了</button></dd>
				<dd><button className="filter_button" onClick={doFilter} data-filter="incomplete">未完了</button></dd>
				<dd><button className="filter_button" onClick={doFilter} data-filter="all">すべて</button></dd>
			</dl>
			<ul className="todo">
				{list.length !== 0 ? list.map((item: todoList, index: number) => {
					return (
						<li key={item.key} className={item.check ? COMPLETE_CLASS : ''} onClick={doCheck} data-id={item.key} data-index={index}>
							<div><span className="check"></span></div>
							<p>{item.todo}</p>
							<div className="delete_button_wrapper"><button type="button" className="delete_button" onClick={doDelete}></button></div>
						</li>
					)
				}) : ""}
			</ul>
		</div>
	)
}