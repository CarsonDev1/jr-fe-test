export type Player = {
	name: string;
	jerseyNumber: number;
	defenseScore: number;
	techniques: string[];
};

export const techniquesList = [
	'Neymar Rainbow Flick',
	'El Tornado',
	'Waka Waka',
	'Sombrero Flick',
	'Okocha Sombrero Flick',
	'Bolasie Flick',
	'Fake Pass',
	'Ball Roll Chop',
	'Ball Roll Cut',
	'Ball Hop',
	'Simple Rainbow',
];

export function createRandomPlayer(): Player {
	const defenseScore = Math.floor(Math.random() * 5) + 1;
	const randomTechniques = Array.from(
		{ length: 5 },
		() => techniquesList[Math.floor(Math.random() * techniquesList.length)]
	);

	return {
		name: `Player ${Math.floor(Math.random() * 100)}`,
		jerseyNumber: Math.floor(Math.random() * 100),
		defenseScore,
		techniques: randomTechniques,
	};
}
