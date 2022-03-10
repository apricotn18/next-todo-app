import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/home.module.scss';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Todo</title>
			</Head>
			<div className={styles.test}>てすと</div>
		</div>
	)
}

export default Home
