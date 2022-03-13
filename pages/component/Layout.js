import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Layout (props) {
	const router = useRouter();

	return (
		<div>
			<Head>
				<title>Todos</title>
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
			</Head>
			<div className="wrapper">
				<div className="header">
					<h1 className="header_title">
						<a href="/">{props.title}</a>
					</h1>
					{props.menu ? props.menu : ''}
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