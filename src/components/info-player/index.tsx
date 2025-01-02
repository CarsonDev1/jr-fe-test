import Image from 'next/image';
import { FaRegStar } from 'react-icons/fa';
import AvtSkeleton from '@/public/images/avt-skeleton.png';
import AvtPlayer from '@/public/images/avt-player.webp';
import Club from '@/public/images/club-skeleton.png';
import ClubPlayer from '@/public/images/club-player.png';
import Foot from '@/public/images/foot.svg';
import BirthDay from '@/public/images/birthday.svg';
import Height from '@/public/images/height.svg';
import Shirt from '@/public/images/shirt.svg';
import Spain from '@/public/images/spain.svg';
import Argentina from '@/public/images/Argentina.png';
import Stadium from '@/public/images/stadium.svg';
import playerJSON from '@/data/playerInfo.json';

export default function PlayerProfile() {
	const playerData = playerJSON.data.player;

	const dateOfBirth = new Date(playerData.dateOfBirthTimestamp * 1000);
	const formattedDateOfBirth = dateOfBirth.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	});
	const age = new Date().getFullYear() - dateOfBirth.getFullYear();

	const contractUntil = new Date(playerData.contractUntilTimestamp * 1000).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	});

	return (
		<div className='flex flex-col gap-1 lg:flex-row'>
			<div className='flex flex-col justify-center w-full lg:w-1/2 min-h-[204px] bg-primary'>
				<div className='relative py-14 px-3'>
					<button
						className='absolute right-3 top-2 rounded-full p-1 transition-colors hover:bg-white/10'
						aria-label='Add to favorites'
					>
						<FaRegStar className='h-6 w-6 text-white' />
					</button>

					<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 py-5'>
						<div className='relative'>
							<div className='relative size-20 overflow-hidden rounded-full border-2 border-white/10 sm:size-24 bg-white'>
								<Image
									src={AvtPlayer || AvtSkeleton}
									alt={playerData.name}
									width={96}
									height={96}
									className='h-full w-full object-cover'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<h1 className='text-2xl font-bold text-white sm:text-3xl font-inter'>{playerData.name}</h1>

							<div className='flex items-center gap-2'>
								<div className='relative size-10'>
									<Image
										src={ClubPlayer || Club}
										alt={playerData.team.name}
										width={40}
										height={40}
										className='rounded-full'
									/>
								</div>
								<div className='flex flex-col gap-1'>
									<span className='text-white'>{playerData.team.name}</span>
									<p className='text-sm text-gray-400'>Contract until {contractUntil}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 gap-1 min-h-[204px] sm:grid-cols-2 w-full lg:w-1/2'>
				<div className='min-h-16 px-4 py-3 h-full border border-gray-900 bg-primary'>
					<div className='text-sm text-gray-400'>Nationality</div>
					<div className='mt-2 flex items-center gap-2'>
						<div className='relative size-6 overflow-hidden rounded-full'>
							<Image src={Argentina || Spain} width={30} height={30} alt='spain' />
						</div>
						<span className='text-lg font-semibold text-white'>
							{playerData.nationality.name.toUpperCase()}
						</span>
					</div>
				</div>

				<div className='min-h-16 px-4 py-3 h-full border border-gray-900 bg-primary'>
					<div className='text-sm text-gray-400'>Date of birth</div>
					<div className='mt-2 flex items-start gap-2'>
						<div className='relative size-7 overflow-hidden rounded-full'>
							<Image src={BirthDay} width={40} height={40} alt='birthday' />
						</div>
						<div>
							<div className='text-lg font-semibold text-white'> {formattedDateOfBirth}</div>
							<div className='text-sm text-gray-400'>{age} years old</div>
						</div>
					</div>
				</div>

				<div className='min-h-16 px-4 py-3 h-full border border-gray-900 bg-primary'>
					<div className='text-sm text-gray-400'>Height</div>
					<div className='mt-2 flex items-center gap-2'>
						<div className='relative size-7 overflow-hidden rounded-full'>
							<Image src={Height} width={40} height={40} alt='height' />
						</div>
						<span className='text-lg font-semibold text-white'>{playerData.height} cm</span>
					</div>
				</div>

				<div className='min-h-16 px-4 py-3 h-full border border-gray-900 bg-primary'>
					<div className='text-sm text-gray-400'>Preferred foot</div>
					<div className='mt-2 flex items-center gap-2'>
						<div className='relative size-7 overflow-hidden rounded-full'>
							<Image src={Foot} width={40} height={40} alt='height' />
						</div>
						<span className='text-lg font-semibold text-white'>
							{playerData.preferredFoot || 'Unknown'}
						</span>
					</div>
				</div>

				<div className='min-h-16 px-4 py-3 h-full border border-gray-900 bg-primary'>
					<div className='text-sm text-gray-400'>Jersey number</div>
					<div className='mt-2 flex items-center gap-2'>
						<div className='relative size-7 overflow-hidden rounded-full'>
							<Image src={Shirt} width={40} height={40} alt='height' />
						</div>
						<span className='text-lg font-semibold text-white'>19</span>
					</div>
				</div>

				<div className='px-4 py-3 bg-primary'>
					<div className='text-sm text-gray-400'>Position</div>
					<div className='mt-2 flex items-center gap-2'>
						<div className='flex h-6 w-6 items-center justify-center'>
							<div className='relative size-7 overflow-hidden'>
								<Image src={Stadium} width={40} height={40} alt='height' />
							</div>
						</div>
						<span className='text-lg font-semibold text-white'>{playerData.position}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
