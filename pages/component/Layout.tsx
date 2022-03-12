import Head from 'next/head';

export default function Layout (props: any) {
	return (
		<div>
			<Head>
				<title>Todos</title>
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Noto+Sans+JP:wght@400;700;900&display=swap" rel="stylesheet" />
			</Head>
			<div className="wrapper">
				<div className="header">
					<div className="header_contents">
						<h1 className="header_title">{props.title}</h1>
						<div><button className="button button--add">+ add</button></div>
						<div><button className="button button--del">- delete</button></div>
					</div>
					<div>
						<button className="login">あんずさん</button>
					</div>
				</div>
				{props.children}
			</div>
		</div>
	)
}