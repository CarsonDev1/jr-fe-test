import Image from 'next/image';
import matchList from '@/data/matchList.json';

// Import team logos
import Palmas from '@/public/images/UD_Las_Palmas.png';
import Girona from '@/public/images/Girona_FC.png';
import Sociedad from '@/public/images/Real_Sociedad.png';
import Betis from '@/public/images/Real_Betis.png';
import Cadiz from '@/public/images/Cadiz_CF.svg';
import Deportivo from '@/public/images/Deportivo_Alaves.png';
import Manchester_City from '@/public/images/Manchester_City.svg';
import AC_Milan from '@/public/images/AC_Milan.png';
import Barcelona from '@/public/images/FC_Barcelona.png';
import Chelsea from '@/public/images/club-loan.png';
import Cagliari from '@/public/images/Cagliari_Calcio.png';
import Como from '@/public/images/club-player.png';
import Udinese from '@/public/images/Udinese_Calcio.png';
import Bologna from '@/public/images/Bologna_FC.png';
import Atalanta from '@/public/images/Atalanta.webp';
import Hellas from '@/public/images/Hellas_Verona_FC.png';
import Napoli from '@/public/images/Napoli.png';
import Parma from '@/public/images/Parma_Calcio.png';
import Torino from '@/public/images/Torino_FC.png';
import Celtic from '@/public/images/Celtic_FC.png';
import Chair from '@/public/images/chair.png';
import Club from '@/public/images/club-skeleton.png';

// Create a mapping for teams to images
const teamImages = {
	'UD Las Palmas': Palmas,
	'Girona FC': Girona,
	'Real Sociedad': Sociedad,
	'Real Betis': Betis,
	Cadiz: Cadiz,
	'Deportivo Alavés': Deportivo,
	'Manchester City': Manchester_City,
	'AC Milan': AC_Milan,
	'FC Barcelona': Barcelona,
	Chelsea: Chelsea,
	Cagliari: Cagliari,
	Como: Como,
	'Celtic FC': Celtic,
	Udinese: Udinese,
	Bologna: Bologna,
	Atalanta: Atalanta,
	'Hellas Verona': Hellas,
	Napoli: Napoli,
	Parma: Parma,
	Torino: Torino,
};

export default function MatchesList() {
	const matchData = matchList.data.events;

	return (
		<div className='bg-primary p-4'>
			<h2 className='mb-4 text-lg font-semibold text-white'>MATCHES</h2>
			<div className='flex flex-col gap-2'>
				{matchData.map((match, index) => (
					<div
						key={index}
						className='flex items-center justify-between rounded px-4 py-3 bg-gradient-to-r from-[#09379447] via-[#09379447] to-[#09379447] hover:bg-white/5'
					>
						<div className='flex items-center gap-3'>
							<div className='flex w-16 flex-col gap-2'>
								<span className='text-sm text-second'>
									{new Date(match.startTimestamp * 1000)
										.toLocaleDateString('vi-VN', {
											day: '2-digit',
											month: '2-digit',
										})
										.replace('-', '/')}
								</span>
								<span className='text-xs text-second uppercase'>{match.status.type}</span>
							</div>

							<div className=''>
								<div className='mb-1 flex items-center gap-3'>
									<Image
										src={teamImages[match.homeTeam.name as keyof typeof teamImages] || Club}
										alt={match.homeTeam.name}
										width={50}
										height={50}
										className='rounded-full size-7 object-contain'
									/>
									<span
										className={`text-sm ${
											match.homeScore.current > match.awayScore.current
												? 'text-white'
												: match.homeScore.current < match.awayScore.current
												? 'text-second'
												: 'text-white'
										}`}
									>
										{match.homeTeam.name}
									</span>
								</div>

								<div className='flex items-center gap-3'>
									<Image
										src={teamImages[match.awayTeam.name as keyof typeof teamImages] || Club}
										alt={match.awayTeam.name}
										width={50}
										height={50}
										className='rounded-full size-7 object-contain'
									/>
									<span
										className={`text-sm ${
											match.awayScore.current > match.homeScore.current
												? 'text-white'
												: match.awayScore.current < match.homeScore.current
												? 'text-second'
												: 'text-white'
										}`}
									>
										{match.awayTeam.name}
									</span>
								</div>
							</div>
						</div>

						<div className='flex items-center gap-3 w-16 md:w-20'>
							<div className='flex flex-col items-center'>
								<span
									className={`text-sm text-white py-1 px-2 rounded-t-md ${
										match.homeScore.current > match.awayScore.current
											? 'bg-blue-400'
											: match.homeScore.current < match.awayScore.current
											? 'bg-blue-800'
											: 'bg-blue-400'
									} w-7 md:w-9 h-10 md:h-12 flex items-center justify-center`}
								>
									{match.homeScore.current}
								</span>
								<span
									className={`text-sm text-white py-1 px-2 rounded-b-md w-full ${
										match.awayScore.current > match.homeScore.current
											? 'bg-blue-400 font-bold'
											: match.awayScore.current < match.homeScore.current
											? 'bg-blue-800'
											: 'bg-blue-400'
									} w-7 md:w-9 h-10 md:h-12 flex items-center justify-center`}
								>
									{match.awayScore.current}
								</span>
							</div>

							{match.awayScore.corner > 0 ? (
								<div
									className={`size-6 md:size-8 flex justify-center text-center items-center rounded-sm ${
										match.awayScore.corner >= 8 ? 'bg-green-500' : 'bg-orange-500'
									}`}
								>
									<span className='text-white font-bold'>{match.awayScore.corner}</span>
								</div>
							) : (
								<Image src={Chair} width={24} height={24} alt='chair' />
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
