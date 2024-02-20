function Leaderboard() {
	return (
		<section className="h-full w-full px-2 sm:px-8 pt-3 pb-3 mb-4 shadow-2xl bg-slate-300 rounded-lg">
			<div className="grid text-xl sm:text-2xl">
				<p className="text-center p-4">Leaderboard</p>
			</div>
			<div className="my-3">
				{/* .map() here */}
				<div className="my-2 bg-slate-100 p-3 rounded-full">
				#1: Username 
				</div>
				<div className="my-2 bg-slate-100 p-3 rounded-full">
				#2: Username
				</div>
				<div className="my-2 bg-slate-100 p-3 rounded-full">
				#3: Username
				</div>
			</div>
		</section>
	);
}

export default Leaderboard;
