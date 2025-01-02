'use client';
import React, { useState } from 'react';
import { createRandomPlayer, Player, techniquesList } from '@/utils/gameLogic';
import { FaDiceSix, FaPlus, FaTrophy } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import Confetti from 'react-confetti';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { toast } from 'react-toastify';
import 'swiper/css/navigation';
import 'chart.js/auto';
import 'swiper/css';

function checkPassing(techniqueScore: number, defenseScore: number): boolean {
	const defensiveRatio = defenseScore / (techniqueScore + defenseScore);
	return Math.random() >= defensiveRatio;
}

const MiniGame: React.FC = () => {
	const [players, setPlayers] = useState<Player[]>([]);
	const [name, setName] = useState<string>('');
	const [jerseyNumber, setJerseyNumber] = useState<number | ''>('');
	const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
	const [gameResults, setGameResults] = useState<any | null>(null);
	const [isGameActive, setIsGameActive] = useState(false);
	const [commentary, setCommentary] = useState<string[]>([]);

	const handleAddPlayer = () => {
		if (players.length >= 10) {
			toast.warning('You can only add up to 10 players!');
			return;
		}
		if (!name || !jerseyNumber || selectedTechniques.length !== 5) {
			toast.warning('Please enter full player information and select all 5 skills!');
			return;
		}
		const newPlayer: Player = {
			name,
			jerseyNumber: Number(jerseyNumber),
			defenseScore: Math.floor(Math.random() * 5) + 1,
			techniques: selectedTechniques,
		};
		setPlayers([...players, newPlayer]);
		resetForm();
	};

	const handleAddRandomPlayer = () => {
		if (players.length >= 10) {
			toast.warning('You can only add up to 10 players!');
			return;
		}
		const randomPlayer = createRandomPlayer();
		setPlayers([...players, randomPlayer]);
	};

	const resetForm = () => {
		setName('');
		setJerseyNumber('');
		setSelectedTechniques([]);
	};

	const playGame = () => {
		if (players.length !== 10) {
			toast.warning('10 players are required to start the game!');
			return;
		}

		let results: any[] = [];
		let techniqueUsage: { [key: string]: number } = {};
		let newCommentary: string[] = [];

		for (let round = 0; round < 10; round++) {
			let currentPlayers = [...players];
			let penalties: any[] = [];
			while (currentPlayers.length > 1) {
				const passerIndex = Math.floor(Math.random() * currentPlayers.length);
				const passer = currentPlayers[passerIndex];
				const receiverIndex = Math.floor(Math.random() * currentPlayers.length) || 0;
				const receiver = currentPlayers[receiverIndex];

				const technique = passer.techniques[Math.floor(Math.random() * passer.techniques.length)];
				techniqueUsage[technique] = (techniqueUsage[technique] || 0) + 1;

				const techniqueScore = Math.floor(Math.random() * 5) + 1;

				if (checkPassing(techniqueScore, receiver.defenseScore)) {
					newCommentary.push(
						`<span style="color: green;">The ball was successfully passed from ${passer.name} (shirt number: ${passer.jerseyNumber}) sang ${receiver.name} (shirt number: ${receiver.jerseyNumber}) by technique ${technique}.</span>`
					);
				} else {
					newCommentary.push(
						`<span style="color: red;">Pass failed! ${passer.name} be punished instead of ${receiver.name}.</span>`
					);
					penalties.push({
						player: passer,
						penaltyOrder: penalties.length + 1,
					});
					currentPlayers.splice(passerIndex, 1);
				}
			}
			results.push({
				winner: currentPlayers[0],
				penalties,
			});
		}

		let playerScores: { [key: string]: number } = {};
		results.forEach((game) => {
			game.penalties.forEach((penalty: any) => {
				const playerName = penalty.player.name;
				const score = 10 - penalty.penaltyOrder + penalty.player.techniques.length;
				playerScores[playerName] = (playerScores[playerName] || 0) + score;
			});
		});

		const sortedPlayers = Object.entries(playerScores)
			.map(([name, score]) => ({ name, score }))
			.sort((a, b) => b.score - a.score);

		setGameResults({
			results,
			playerScores: sortedPlayers,
			techniqueUsage,
		});
		setCommentary(newCommentary);
		setIsGameActive(true);
	};

	const resetGame = () => {
		setPlayers([]);
		setGameResults(null);
		setIsGameActive(false);
		setCommentary([]);
	};

	return (
		<div className='bg-[#16254D] p-2 md:p-4 lg:p-8'>
			<div className='mx-auto'>
				{!isGameActive ? (
					<>
						<h2 className='text-2xl font-bold md:text-3xl text-white text-center mb-2'>Add Player</h2>
						<div className='max-w-2xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl mb-4 md:mb-6 lg:mb-12'>
							<div className='grid gap-6 mb-6'>
								<div>
									<label className='block text-white font-medium mb-2'>Player name</label>
									<input
										type='text'
										value={name}
										onChange={(e) => setName(e.target.value)}
										className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
										placeholder='Enter player name'
									/>
								</div>
								<div>
									<label className='block text-white font-medium mb-2'>Shirt number</label>
									<input
										type='number'
										value={jerseyNumber}
										onChange={(e) => setJerseyNumber(Number(e.target.value) || '')}
										className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
										placeholder='Enter shirt number'
									/>
								</div>
								<div>
									<label className='block text-white font-medium mb-2'>
										Passing Technique (Choose 5)
									</label>
									<select
										multiple
										value={selectedTechniques}
										onChange={(e) =>
											setSelectedTechniques(
												Array.from(e.target.selectedOptions, (option) => option.value)
											)
										}
										className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-40'
									>
										{techniquesList.map((technique) => (
											<option key={technique} value={technique} className='py-1'>
												{technique}
											</option>
										))}
									</select>
									<p className='text-sm text-white/60 mt-2'>
										*Hold Ctrl/Cmd to select multiple techniques
									</p>
								</div>
							</div>
							<div className='flex gap-4 justify-center'>
								<button
									onClick={handleAddPlayer}
									className='flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg'
								>
									<FaPlus className='w-5 h-5' />
									Add player
								</button>
								<button
									onClick={handleAddRandomPlayer}
									className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg'
								>
									<FaDiceSix className='w-5 h-5' />
									Add random
								</button>
								{players.length === 10 && (
									<button
										onClick={playGame}
										className='flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-lg'
									>
										Play the game
									</button>
								)}
							</div>
						</div>

						<div className='mt-2 md:mt-4 lg:mt-8'>
							<h2 className='text-2xl font-bold text-center text-white mb-4'>Player list</h2>
							{players.length === 0 ? (
								<div className='mx-auto text-center'>
									<span className='text-lg text-white text-center'>No players yet</span>
								</div>
							) : (
								<>
									<div className='hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
										{players.map((player, index) => (
											<div
												key={index}
												className='bg-gradient-to-br from-gray-900 via-blue-900 border border-white/20 rounded-lg p-4 text-white shadow-md'
											>
												<h3 className='text-lg font-semibold'>{player.name}</h3>
												<p>Shirt number: {player.jerseyNumber}</p>
												<p>Defense Points: {player.defenseScore}</p>
												<p>Technique:</p>
												<ul className='list-disc pl-5'>
													{player.techniques.map((technique, idx) => (
														<div className='flex justify-between items-center'>
															<li key={idx}>{technique}</li>
														</div>
													))}
												</ul>
											</div>
										))}
									</div>
									<div className='block md:hidden'>
										<Swiper
											modules={[Navigation]}
											navigation={true}
											spaceBetween={20}
											slidesPerView={'auto'}
											breakpoints={{
												320: { slidesPerView: 1 },
												480: { slidesPerView: 2 },
												640: { slidesPerView: 2.5 },
												1024: { slidesPerView: 'auto' },
											}}
										>
											{players.map((player, index) => (
												<SwiperSlide
													key={index}
													className='bg-gradient-to-br from-gray-900 via-blue-900 border border-white/20 rounded-lg p-4 text-white shadow-md'
												>
													<h3 className='text-lg font-semibold'>{player.name}</h3>
													<p>Shirt number: {player.jerseyNumber}</p>
													<p>Defense Points: {player.defenseScore}</p>
													<p>Technique:</p>
													<ul className='list-disc pl-5'>
														{player.techniques.map((technique, idx) => (
															<div className='flex justify-between items-center'>
																<li key={idx}>{technique}</li>
															</div>
														))}
													</ul>
												</SwiperSlide>
											))}
										</Swiper>
									</div>
								</>
							)}

							{players.length === 10 && (
								<button
									onClick={playGame}
									className='flex mt-4 mx-auto items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-lg'
								>
									Play the game
								</button>
							)}
						</div>
					</>
				) : (
					<>
						<h2 className='text-2xl font-bold text-center mb-8 text-white'>Result</h2>
						{gameResults.playerScores[0] && (
							<Confetti
								width={1820}
								height={window.innerHeight}
								recycle={false}
								numberOfPieces={300}
								className='hidden lg:block'
							/>
						)}
						<div className='text-white'>
							<div className='flex flex-col lg:flex-row gap-10 items-center'>
								<ul className='w-full lg:w-1/2 mx-auto p-4 md:p-6 bg-gradient-to-br from-gray-800 to-blue-900 rounded-lg shadow-lg h-full flex flex-col gap-2'>
									<h3 className='text-xl font-semibold text-center'>Player Ranking:</h3>
									{gameResults.playerScores.map((player: any, index: number) => (
										<li
											key={player.name}
											className={`text-lg flex items-center justify-between p-3 rounded-lg shadow-md ${
												index === 0
													? 'bg-yellow-500 text-white'
													: index === 1
													? 'bg-gray-300 text-black'
													: index === 2
													? 'bg-yellow-800 text-white'
													: 'bg-gray-700'
											}`}
										>
											<span>
												{index + 1}. {player.name} - {player.score} points
											</span>
											{index === 0 && <FaTrophy className='w-6 h-6 text-white ml-2' />}
											{index === 1 && <span className='flex items-center ml-2'>🥈</span>}
											{index === 2 && <span className='flex items-center ml-2'>🥉</span>}
										</li>
									))}
								</ul>

								<div className='w-full lg:w-1/2 mx-auto p-4 md:p-6 bg-gradient-to-br from-gray-800 to-blue-800 rounded-lg shadow-lg h-full'>
									<h3 className='text-2xl font-bold text-center text-white mb-4'>
										Technical Statistics
									</h3>
									<Bar
										data={{
											labels: Object.keys(gameResults.techniqueUsage),
											datasets: [
												{
													label: 'Frequency of Use',
													data: Object.values(gameResults.techniqueUsage),
													backgroundColor: [
														'rgba(255, 99, 132, 0.6)',
														'rgba(54, 162, 235, 0.6)',
														'rgba(255, 206, 86, 0.6)',
														'rgba(75, 192, 192, 0.6)',
														'rgba(153, 102, 255, 0.6)',
														'rgba(255, 159, 64, 0.6)',
													],
													borderColor: [
														'rgba(255, 99, 132, 1)',
														'rgba(54, 162, 235, 1)',
														'rgba(255, 206, 86, 1)',
														'rgba(75, 192, 192, 1)',
														'rgba(153, 102, 255, 1)',
														'rgba(255, 159, 64, 1)',
													],
													borderWidth: 2,
												},
											],
										}}
										options={{
											responsive: true,
											plugins: {
												legend: {
													display: true,
													labels: {
														color: 'white',
														font: {
															size: 14,
														},
													},
												},
											},
											scales: {
												x: {
													ticks: {
														color: 'white',
														font: {
															size: 12,
														},
													},
													grid: {
														color: 'rgba(255, 255, 255, 0.1)',
													},
												},
												y: {
													beginAtZero: true,
													ticks: {
														color: 'white',
														font: {
															size: 12,
														},
													},
													grid: {
														color: 'rgba(255, 255, 255, 0.1)',
													},
												},
											},
										}}
									/>
								</div>
							</div>
							<div className='mt-8'>
								<h3 className='text-2xl font-bold text-center text-white mb-4'>Pass Results</h3>
								<div className='bg-gradient-to-br from-gray-800 to-blue-800 rounded-xl p-6 shadow-lg overflow-y-auto max-h-64'>
									<ul className='space-y-4'>
										{commentary.map((comment, index) => (
											<li
												key={index}
												className='p-3 rounded-lg shadow-md text-sm bg-opacity-30'
												style={{
													backgroundColor: comment.includes('green')
														? 'rgba(34, 197, 94, 1.3)'
														: 'rgba(239, 68, 68, 0.3)',
												}}
												dangerouslySetInnerHTML={{ __html: comment }}
											/>
										))}
									</ul>
								</div>
							</div>
							<div className='mt-8 flex justify-center'>
								<button
									onClick={resetGame}
									className='bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg'
								>
									Play Again
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default MiniGame;
