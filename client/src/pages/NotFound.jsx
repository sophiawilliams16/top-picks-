import { useLocation } from 'react-router-dom';
import { LoginProvider } from '../utils/LoginContext';
import Nav from '../components/Navbar/Nav';

function NotFound() {
	let location = useLocation();
	return (
		<section className="min-h-screen">
			<LoginProvider>
				<Nav />
				<div className="flex items-center justify-center flex-col">
					<div className="justify-center text-xl sm:text-2xl">
						<div className="font-bold text-slate-700 text-center">
							<h1 className="mt-4 mb-4">
								No match for <code>{location.pathname}</code>
							</h1>
						</div>
					</div>
				</div>
			</LoginProvider>
		</section>
	);
}

export default NotFound;
