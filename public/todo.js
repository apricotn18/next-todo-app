import { useState } from 'react';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import db from './firebase'

const COMPLETE_CLASS = 'is-complete';

export default function Todo (props) {
	const mylist = props.list;
	const [list, setList] = useState(mylist);
	const [msg, setMsg] = useState('');

	/**
	 * listの状態を更新
	 *
	 * @param {array} options.list todoリスト
	 * @param {string} options.id　itemのid
	 * @param {string} options.target　更新するターゲット
	 * @param {boolean} options.status 更新後の状態
	 * @return {void}
	 */
	const updateListState = ((options) => {
		let newList = options.list;
		for (const i in newList) {
			if (newList[i].key === options.id) {
				mylist[i][options.target] = options.status;
				newList[i][options.target] = options.status;
			}
		};
		setList(newList);
	});

	let isUpdateState = false;
	const doCheck = (e) => {
		// 連打対策
		if (isUpdateState) return;
		isUpdateState = true;

		const targetElement = e.currentTarget;
		const id = targetElement.dataset.id || '';
		const updateCheck = !targetElement.classList.contains(COMPLETE_CLASS);
		const messageElement = document.querySelectorAll('.message')[0];
		updateDoc(doc(db, 'test', id), {
				check: updateCheck,
			}).then(() => {
				// listの状態更新
				updateListState({
					list,
					id,
					target: 'check',
					status: updateCheck,
				});
				// 表示更新
				targetElement.classList.toggle(COMPLETE_CLASS);
				messageElement.textContent = '';
				// 連打対策
				isUpdateState = false;
			}).catch(() => {
				messageElement.textContent = '通信に失敗しました';
			});
	};

	const doDelete = (e) => {
		e.stopPropagation();
		const targetElement = e.currentTarget.closest('li') || e.currentTarget;
		const id = targetElement.dataset.id || '';
		const messageElement = document.querySelectorAll('.message')[0];

		if (confirm('削除しますか？')) {
			deleteDoc(doc(db, 'test', id))
				.then(() => {
					// listの状態更新
					updateListState({
						list,
						id,
						target: 'show',
						status: false,
					});
					// 表示更新
					targetElement.style.display = 'none';
					messageElement.textContent = '';
				}).catch(() => {
					messageElement.textContent = '通信に失敗しました';
				});
		}
	};

	const doFilter = (e) => {
		const condition = e.currentTarget.dataset.filter || '';
		let newList = [];

		switch (condition) {
			case 'complete':
				newList = mylist.filter((item) => item.check);
				break;
			case 'incomplete':
				newList = mylist.filter((item) => !item.check);
				break;
			default:
				newList = mylist;
				break;
		}
		setList(newList);
	};

	return (
		<div>
			<dl className="filter">
				<dt>タスクの絞り込み：</dt>
				<dd><button className="filter_button" onClick={doFilter} data-filter="complete">完了</button></dd>
				<dd><button className="filter_button" onClick={doFilter} data-filter="incomplete">未完了</button></dd>
				<dd><button className="filter_button" onClick={doFilter} data-filter="all">すべて</button></dd>
			</dl>
			<p className="message">{msg}</p>
			<ul className="todo">
				{list.map((item) => {
					return item.show ? (
						<li key={item.key} className={item.check ? COMPLETE_CLASS : ''} onClick={doCheck} data-id={item.key}>
							<div><span className="check"></span></div>
							<p>{item.todo}</p>
							<div className="delete_button_wrapper"><button type="button" className="delete_button" onClick={doDelete}></button></div>
						</li>
					): "";
				})}
			</ul>
		</div>
	);
}