import Layout from './component/Layout.tsx';

export default function Home () {
	return (
		<div>
			<Layout title="Todos">
				<div>
					<ul className="todo">
						<li className="is-complete">
							<div><button className="check"></button></div>
							<p>完了タスク</p>
						</li>
						<li>
							<div><button className="check"></button></div>
							<p>未完了のタスク</p>
						</li>
						<li>
							<div><button className="check"></button></div>
							<p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
						</li>
					</ul>
				</div>
			</Layout>
		</div>
	)
}
