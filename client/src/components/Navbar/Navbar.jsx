import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav({ links }) {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, [pathname]);

	return (
		<nav className="container mx-auto px-6 py-3 text-slate-700 text-xl sm:text-2xl">
			<div className="sm:flex justify-between items-center font-bold">
				<Link className="text-center" to="/">
					<h1 className="bg-clip-text bg-size-200 hover:bg-right ">
						trade space
					</h1>
				</Link>
				<div className="flex justify-end sm:justify-between space-x-5 sm:space-x-10 mt-3 sm:mt-0">
					{links.map((link) => link)}
				</div>
			</div>
		</nav>
	);
}
