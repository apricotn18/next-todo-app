import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Todos</title>
				<link rel="preconnect" href="https://fonts.gstatic.com"></link>
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Noto+Sans+JP:wght@400;700;900&display=swap" rel="stylesheet"></link>
			</Head>
			<div className="wrapper">
				<div className="header">
					<div className="header_contents">
						<h1 className="header_title">Todos</h1>
						<div><button className="button button--add">+ add</button></div>
						<div><button className="button button--del">- delete</button></div>
					</div>
					<div>
						<button className="login">あんずさん</button>
					</div>
				</div>
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
			</div>
		</div>
	)
}

export default Home
