import Head from 'next/head';
import Link from "next/link";

export default function Layout (props) {
	return (
		<div>
			<Head>
				<title>Todos</title>
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
			</Head>
			<div className="wrapper">
				<div className="header">
					<h1 className="header_title">
						<Link href="/"><a>{props.title}</a></Link>
					</h1>
					{props.menu ? props.menu : ''}
				</div>
				<section>
					{props.children}
				</section>
			</div>
		</div>
	)
}