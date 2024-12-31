import Image from 'next/image';
import Link from 'next/link';
import { PiUserLight } from 'react-icons/pi';
import Logo from '@/public/images/logo.png';
import Ball from '@/public/images/ball.png';

export default function Header() {
	return (
		<header className='bg-gradient-to-r from-[#091557] via-[#122690] to-[#203397] px-4 py-4 md:px-8 sticky top-0 z-50 w-full'>
			<div className='mx-auto flex items-center justify-between flex-wrap md:flex-nowrap'>
				<div className='flex items-center gap-4 md:gap-10'>
					<Link href='/' className='flex items-center'>
						<Image src={Logo} width={140} height={20} alt='logo' className='w-24 md:w-32' />
					</Link>
					<div className='flex items-center gap-2'>
						<div className='flex items-center gap-2 rounded px-3 py-2.5 border-2 border-transparent bg-clip-border'>
							<div className='rounded-full bg-gradient-to-r from-[#1456FF80] via-[#658BEC80] to-[#092E8D80] p-[2px]'>
								<div className='flex items-center gap-2 bg-gradient-to-r from-[#1553EF] via-[#0C3089] to-[#0C1A4C] px-3 py-1.5 rounded-full'>
									<Image src={Ball} width={40} height={40} alt='ball' className='size-5' />
									<span className='text-sm font-medium text-white'>FOOTBALL</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='flex items-center'>
					<button className='rounded-full p-2 bg-[#08124d]'>
						<PiUserLight className='text-white size-4' />
					</button>
				</div>
			</div>
		</header>
	);
}
