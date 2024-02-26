import { useState } from 'react';
import { toast } from 'react-toastify';
import { createPortfolio } from '../../utils/api';
import { useLoginContext } from '../../utils/LoginContext';

function CreatePortfolio() {
	const { login, setLogin } = useLoginContext();

	let portfolioArr = login.portfolio;

	const toastSuccess = (message, icon) =>
		toast.success(message, {
			icon: icon,
			position: 'bottom-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});

	const [formState, setFormState] = useState({
		portfolioName: '',
		portfolioType: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = await createPortfolio(
				formState.portfolioName,
				formState.portfolioType,
				login.id,
			);
			toastSuccess(`Successfully added ${formState.portfolioName}`, '💰');
			setFormState({ portfolioName: '', portfolioType: '' });
			const newPortfolioArr = [...portfolioArr, data._id];
			setLogin({
				loggedIn: true,
				userToken: login.loggedIn,
				id: login.id,
				username: login.username,
				email: login.email,
				portfolio: newPortfolioArr,
				investment: [],
			});
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<section className="w-full max-w-xl mx-auto">
			<form
				className="max-w-sm bg-slate-400 px-8 pt-6 pb-8 mb-4 shadow-2xl mx-auto rounded-lg"
				onSubmit={handleFormSubmit}
			>
				<div className="mb-4 text-base sm:text-lg">
					<label
						className="block font-bold mb-2 text-slate-100"
						htmlFor="portfolioName"
					>
						Ticker
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
						placeholder="Name"
						name="portfolioName"
						id="portfolioName"
						type="text"
						value={formState.portfolioName}
						required
						onChange={handleChange}
					/>
				</div>
				<div className=" text-sm sm:text-base">
					<button
						className="text-slate-100 bg-slate-700 font-bold rounded-full p-4 px-10"
						type="submit"
					>
						Search Ticker
					</button>
				</div>
				<div className="mb-4 text-base sm:text-lg">
					<label
						className="block font-bold mb-2 text-slate-100"
						htmlFor="portfolioType"
					>
						Shares
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
						placeholder="Type"
						name="portfolioType"
						id="portfolioType"
						type="text"
						value={formState.portfolioType}
						required
						onChange={handleChange}
					/>
				</div>
				<div className='grid grid-cols-2 flex place-items-center'>
					<div className="text-sm sm:text-base">
						<button
							className="text-slate-100 bg-slate-700 font-bold rounded-full p-4 px-10"
							type="submit"
						>
							Buy
						</button>
					</div>
					<div className="text-sm sm:text-base">
						<button
							className="text-slate-100 bg-slate-700 font-bold rounded-full p-4 px-10"
							type="submit"
						>
							Sell
						</button>
					</div>
				</div>
			</form>
		</section>
	);
}

export default CreatePortfolio;
