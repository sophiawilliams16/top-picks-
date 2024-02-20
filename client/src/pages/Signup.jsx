import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginContext } from '../utils/LoginContext';

const SignUp = () => {
	const { login, signUpUser } = useLoginContext();

	const navigate = useNavigate();

	const [formState, setFormState] = useState({
		username: '',
		email: '',
		password: '',
	});

	const handleKeyPress = (e) => {
		// Check if the pressed key is a space
		if (e.key === ' ') {
			e.preventDefault();
		}
	};

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
			const data = await signUpUser(
				formState.username,
				formState.email,
				formState.password,
			);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		if (login.loggedIn) {
			navigate('/');
		}
	}, []);

	return (
		<section className="w-full max-w-xs mx-auto">
			<form
				className="h-full w-full bg-slate-700 rounded-lg text-slate-700 px-8 pt-6 pb-8 mb-4 shadow-2xl"
				onSubmit={handleFormSubmit}
			>
				<div className="mb-4 text-base sm:text-lg">
					<label
						className="block font-bold mb-2 text-slate-100"
						htmlFor="username"
					>
						Username
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
						placeholder="Username"
						name="username"
						id="username"
						type="text"
						value={formState.username}
						required
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4 text-base sm:text-lg">
					<label
						className="block font-bold mb-2 text-slate-100"
						htmlFor="email"
					>
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
						placeholder="Email"
						name="email"
						id="email"
						type="email"
						value={formState.email}
						required
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4 text-base sm:text-lg">
					<label
						className="block font-bold mb-2 text-slate-100"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
						placeholder="Password"
						name="password"
						id="password"
						type="password"
						value={formState.password}
						required
						minLength="8"
						onChange={handleChange}
						onKeyDown={handleKeyPress}
					/>
				</div>
				<div className="flex items-center justify-between text-sm sm:text-base">
					<button
						className="text-slate-700 bg-slate-200 hover:bg-slate-400 font-bold rounded-lg py-2 px-4"
						type="submit"
					>
						Sign Up
					</button>
					<Link
						className="inline-block align-baseline font-bold text-slate-200 hover:text-slate-400"
						to="/login"
					>
						Already signed up?
					</Link>
				</div>
			</form>
		</section>
	);
};

export default SignUp;
