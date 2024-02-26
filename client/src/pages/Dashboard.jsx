import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../utils/LoginContext';
import CreatePortfolio from '../components/Portfolio/CreatePortfolio';
import InvestmentList from '../components/Dashboard/InvestmentList';
import GetPortfolio from '../components/Portfolio/GetPortfolio';
import CreateInvestment from '../components/Investment/CreateInvestment';

const Dashboard = () => {
	const { login } = useLoginContext();

	const navigate = useNavigate();

	const username = login.username;
	const firstLetterCap = username.charAt(0).toUpperCase();
	const remainingLetters = username.slice(1);
	const capUsername = firstLetterCap + remainingLetters;

	useEffect(() => {
		if (!login.loggedIn) {
			navigate('/login');
		}
	}, [login, navigate]);

	return (
		<section className="w-full mx-auto">
			<div className="max-w-xs px-8 pt-6 pb-8 mb-4 shadow-lg text-xl sm:text-2xl mx-auto text-center font-bold">
				<h1 className='text-slate-700'>
					{capUsername}'s Dashboard
				</h1>
			</div>
			<div className='grid grid-cols-2'>
				<div>
					<CreatePortfolio />
					{login.portfolio.length > 0 && <GetPortfolio />}
					{/* <InvestmentList />
					<CreateInvestment /> */}
				<div>

				</div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
