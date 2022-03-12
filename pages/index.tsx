import Layout from './component/Layout';
import { db } from './component/firebase'
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";

export default function Home () {
	type todoList = {
		todo: string;
		check: boolean;
	};

	const mydata: any[] = [];
	const [data, setData] = useState(mydata);

	useEffect(() => {
		getDocs(collection(db, 'test'))
			.then((res) => {
				res.forEach((doc) => {
					const item: any = doc.data();
					mydata.push({
						key: doc.id,
						todo: item.todo,
						check: item.check,
					});
				});
				setData(mydata);
			});
	}, []);

	return (
		<div>
			<Layout title="Todos">
				<div>
					<ul className="todo">
						{data.map((item) => {
							return (
						<li key={item.key} className={item.check ? 'is-complete' : ''}>
							<div><button className="check"></button></div>
							<p>{item.todo}</p>
						</li>
							)
						})}
					</ul>
				</div>
			</Layout>
		</div>
	)
}
