import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Layout (props) {
	const router = useRouter();

	return (
		<div>
			<Head>
				<title>Todos</title>
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
				{/* eslint-disable-next-line */}
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Noto+Sans+JP:wght@400;700;900&display=swap" rel="stylesheet" />
			</Head>
			<div className="wrapper">
				<div className="header">
					<h1 className="header_title">{props.title}</h1>
						{router.route === '/' ?
							<div>
								<a href="./add" className="button button--add">追加</a>
								<a href="./add" className="button button--del">削除</a>
							</div>
						: ''}
				</div>
				<section>
					{props.children}
				</section>
				<div className="footer">
					<small>&#169; 2022  ANZU</small>
				</div>
			</div>
		</div>
	)
}