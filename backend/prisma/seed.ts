// prisma/seed.ts — populates the development database with initial movies.
// Run automatically after `prisma migrate dev`, or manually via `npx prisma db seed`.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const movies = [
  { title: 'The Shawshank Redemption', year: 1994, genre: 'Drama', director: 'Frank Darabont', rating: 9.3, description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', poster: '🏛️' },
  { title: 'The Dark Knight', year: 2008, genre: 'Action', director: 'Christopher Nolan', rating: 9.0, description: 'When the menace known as the Joker wreaks havoc on Gotham City, Batman must confront one of the greatest psychological tests of his ability to fight injustice.', poster: '🦇' },
  { title: 'Inception', year: 2010, genre: 'Sci-Fi', director: 'Christopher Nolan', rating: 8.8, description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', poster: '🌀' },
  { title: 'Parasite', year: 2019, genre: 'Thriller', director: 'Bong Joon-ho', rating: 8.5, description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', poster: '🏠' },
  { title: 'Spirited Away', year: 2001, genre: 'Animation', director: 'Hayao Miyazaki', rating: 8.6, description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.", poster: '🌊' },
  { title: 'The Godfather', year: 1972, genre: 'Drama', director: 'Francis Ford Coppola', rating: 9.2, description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', poster: '🌹' },
  { title: 'Get Out', year: 2017, genre: 'Horror', director: 'Jordan Peele', rating: 7.7, description: "A young African-American visits his white girlfriend's parents for the weekend, where his uneasiness about their reception grows into a shattering nightmare.", poster: '👁️' },
  { title: 'Everything Everywhere All at Once', year: 2022, genre: 'Sci-Fi', director: 'Daniel Kwan & Daniel Scheinert', rating: 7.8, description: 'A middle-aged Chinese immigrant is swept up in an insane adventure where she alone can save the world by exploring other universes.', poster: '🥢' },
  { title: 'La La Land', year: 2016, genre: 'Romance', director: 'Damien Chazelle', rating: 8.0, description: 'A jazz musician and an aspiring actress fall in love while attempting to reconcile their aspirations for the future in Los Angeles.', poster: '🎷' },
  { title: 'Planet Earth II', year: 2016, genre: 'Documentary', director: 'David Attenborough', rating: 9.5, description: 'David Attenborough presents a documentary series exploring how animals meet the challenges of surviving in the most iconic habitats on Earth.', poster: '🌍' },
  { title: 'The Princess Bride', year: 1987, genre: 'Fantasy', director: 'Rob Reiner', rating: 8.1, description: "A bedridden boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to reunite with his true love.", poster: '⚔️' },
  { title: 'Superbad', year: 2007, genre: 'Comedy', director: 'Greg Mottola', rating: 7.6, description: 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.', poster: '🎉' },
];

async function main() {
  console.log('Seeding database...');

  for (const movie of movies) {
    await prisma.movie.create({ data: movie });
  }

  console.log(`Seeded ${movies.length} movies.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
