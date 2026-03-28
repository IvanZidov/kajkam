export interface DailyFact {
  hr: string;
  en: string;
}

export interface QuizQuestion {
  question: { hr: string; en: string };
  options: { hr: string; en: string }[];
  correctIndex: number;
}

export const DAILY_FACTS: DailyFact[] = [
  {
    hr: 'Tekstil i odjeću možeš donirati u Humana ili Crveni križ kontejnere po Zagrebu.',
    en: 'You can donate textiles and clothing to Humana or Red Cross containers across Zagreb.',
  },
  {
    hr: 'Recikliranje jedne aluminijske limenke štedi dovoljno energije za rad TV-a 3 sata.',
    en: 'Recycling one aluminum can saves enough energy to run a TV for 3 hours.',
  },
  {
    hr: 'Plastičnoj boci treba do 450 godina da se razgradi u prirodi.',
    en: 'A plastic bottle takes up to 450 years to decompose in nature.',
  },
  {
    hr: 'Zagreb ima preko 500 zelenih otoka s kontejnerima za recikliranje.',
    en: 'Zagreb has over 500 green islands with recycling containers.',
  },
  {
    hr: 'Recikliranjem papira štedimo 70% energije u usporedbi s proizvodnjom novog papira.',
    en: 'Recycling paper saves 70% of the energy compared to producing new paper.',
  },
  {
    hr: 'Staklena boca se može reciklirati beskonačno puta bez gubitka kvalitete.',
    en: 'A glass bottle can be recycled infinitely without losing quality.',
  },
  {
    hr: 'Prosječan Zagrepčanin proizvede oko 400 kg otpada godišnje.',
    en: 'The average Zagreb citizen produces about 400 kg of waste per year.',
  },
  {
    hr: 'Kompostiranjem biootpada smanjujemo emisije metana na odlagalištima.',
    en: 'Composting bio-waste reduces methane emissions at landfills.',
  },
  {
    hr: 'Jedna tona recikliranog papira spašava 17 stabala.',
    en: 'One ton of recycled paper saves 17 trees.',
  },
  {
    hr: 'Hrvatska mora reciklirati 55% komunalnog otpada do 2025. prema EU direktivi.',
    en: 'Croatia must recycle 55% of municipal waste by 2025 per EU directive.',
  },
  {
    hr: 'Tetrapak ambalaža ide u žuti spremnik zajedno s plastikom i metalom.',
    en: 'Tetra Pak packaging goes in the yellow bin together with plastic and metal.',
  },
  {
    hr: 'Baterije možeš odložiti u crvene kutije u trgovinama i trgovačkim centrima.',
    en: 'You can dispose of batteries in red collection boxes in stores and malls.',
  },
  {
    hr: 'Povratna naknada za boce i limenke u Hrvatskoj iznosi 0,07 EUR po komadu.',
    en: 'The deposit return for bottles and cans in Croatia is 0.07 EUR per piece.',
  },
  {
    hr: 'Plastične vrećice koriste se u prosjeku samo 12 minuta, a traju stotinama godina.',
    en: 'Plastic bags are used for an average of 12 minutes but last hundreds of years.',
  },
  {
    hr: 'Zagreb ima 6 stalnih reciklažnih dvorišta otvorenih Pon-Pet 6-21h i Sub 6-18h.',
    en: 'Zagreb has 6 permanent recycling yards open Mon-Fri 6am-9pm and Sat 6am-6pm.',
  },
  {
    hr: 'Svako kućanstvo u Zagrebu ima pravo na besplatan odvoz glomaznog otpada.',
    en: 'Every household in Zagreb is entitled to free bulky waste pickup.',
  },
  {
    hr: 'Kazna za nepropisno sortiranje otpada u Hrvatskoj može biti do 3.000 EUR.',
    en: 'The fine for improper waste sorting in Croatia can be up to 3,000 EUR.',
  },
  {
    hr: 'Recikliranjem jedne staklene boce uštedimo energiju za rad računala 25 minuta.',
    en: 'Recycling one glass bottle saves enough energy to power a computer for 25 minutes.',
  },
  {
    hr: 'Organski otpad čini oko 30-40% ukupnog komunalnog otpada u Zagrebu.',
    en: 'Organic waste makes up about 30-40% of total municipal waste in Zagreb.',
  },
  {
    hr: 'Istekle lijekove možeš besplatno predati u bilo kojoj ljekarni.',
    en: 'You can return expired medicine for free at any pharmacy.',
  },
  {
    hr: 'Elektronički otpad je najbrže rastući tok otpada u svijetu.',
    en: 'Electronic waste is the fastest growing waste stream in the world.',
  },
  {
    hr: 'Kartonske kutije treba spljoštiti prije bacanja u plavi spremnik — zauzimaju manje mjesta.',
    en: 'Cardboard boxes should be flattened before putting in the blue bin — they take up less space.',
  },
  {
    hr: 'Grad Zagreb dijeli besplatne kompostere kućanstvima s vrtom.',
    en: 'The City of Zagreb distributes free composters to households with gardens.',
  },
  {
    hr: 'Staklenke treba baciti bez poklopaca — poklopac ide u žuti spremnik.',
    en: 'Glass jars should be disposed of without lids — the lid goes in the yellow bin.',
  },
  {
    hr: 'Dnevno se u svijetu proizvede oko 3,5 milijuna tona otpada.',
    en: 'About 3.5 million tons of waste are produced globally every day.',
  },
  {
    hr: 'Kora od banane u bio otpadu postaje nova zemlja, a u miješanom je problem — razgrađuje se i stvara metan na odlagalištu.',
    en: 'A banana peel in bio-waste becomes new soil, but in mixed waste it\'s a problem — it decomposes and produces methane at the landfill.',
  },
  {
    hr: 'Recikliranjem plastike smanjujemo potrošnju nafte jer je plastika naftni derivat.',
    en: 'Recycling plastic reduces oil consumption since plastic is a petroleum product.',
  },
  {
    hr: 'Masne kutije od pizze ne idu u papir — moraju u miješani otpad.',
    en: 'Greasy pizza boxes don\'t go in paper — they must go in mixed waste.',
  },
  {
    hr: 'U EU se reciklira samo oko 30% plastičnog otpada — ostatak završi na odlagalištima ili u prirodi.',
    en: 'Only about 30% of plastic waste is recycled in the EU — the rest ends up in landfills or nature.',
  },
  {
    hr: 'Ulje za kuhanje nikad ne bacaj u sudoper — odnesite ga na reciklažno dvorište.',
    en: 'Never pour cooking oil down the drain — take it to a recycling yard.',
  },
  {
    hr: 'Pelene i higijenski proizvodi idu u miješani otpad, ne u biootpad.',
    en: 'Diapers and hygiene products go in mixed waste, not bio-waste.',
  },
];

export const DAILY_QUIZZES: QuizQuestion[] = [
  {
    question: {
      hr: 'U koji spremnik ide tetrapak ambalaža u Zagrebu?',
      en: 'Which bin does Tetra Pak packaging go in Zagreb?',
    },
    options: [
      { hr: 'Žuti (plastika i metal)', en: 'Yellow (plastic & metal)' },
      { hr: 'Plavi (papir)', en: 'Blue (paper)' },
      { hr: 'Zeleni (staklo)', en: 'Green (glass)' },
      { hr: 'Sivi (miješani)', en: 'Grey (mixed)' },
    ],
    correctIndex: 0,
  },
  {
    question: {
      hr: 'Što NIJE dozvoljeno baciti u smeđi spremnik za biootpad?',
      en: 'What is NOT allowed in the brown bio-waste bin?',
    },
    options: [
      { hr: 'Ljuske jaja', en: 'Eggshells' },
      { hr: 'Kuhana hrana', en: 'Cooked food' },
      { hr: 'Talog kave', en: 'Coffee grounds' },
      { hr: 'Kore od banana', en: 'Banana peels' },
    ],
    correctIndex: 1,
  },
  {
    question: {
      hr: 'Koliko stalnih reciklažnih dvorišta ima Zagreb?',
      en: 'How many permanent recycling yards does Zagreb have?',
    },
    options: [
      { hr: '3', en: '3' },
      { hr: '6', en: '6' },
      { hr: '10', en: '10' },
      { hr: '12', en: '12' },
    ],
    correctIndex: 1,
  },
  {
    question: {
      hr: 'Gdje se mogu odložiti istekli lijekovi?',
      en: 'Where can you dispose of expired medicine?',
    },
    options: [
      { hr: 'Miješani otpad', en: 'Mixed waste' },
      { hr: 'Bilo koja ljekarna', en: 'Any pharmacy' },
      { hr: 'Zeleni otok', en: 'Green island' },
      { hr: 'Biootpad', en: 'Bio-waste' },
    ],
    correctIndex: 1,
  },
  {
    question: {
      hr: 'Koliko iznosi povratna naknada za boce i limenke u Hrvatskoj?',
      en: 'How much is the deposit return for bottles and cans in Croatia?',
    },
    options: [
      { hr: '0,03 EUR', en: '0.03 EUR' },
      { hr: '0,05 EUR', en: '0.05 EUR' },
      { hr: '0,07 EUR', en: '0.07 EUR' },
      { hr: '0,10 EUR', en: '0.10 EUR' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Kamo ide masna kutija od pizze?',
      en: 'Where does a greasy pizza box go?',
    },
    options: [
      { hr: 'Papir (plavi)', en: 'Paper (blue)' },
      { hr: 'Plastika (žuti)', en: 'Plastic (yellow)' },
      { hr: 'Miješani otpad', en: 'Mixed waste' },
      { hr: 'Biootpad', en: 'Bio-waste' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Koliko dugo treba plastičnoj boci da se razgradi u prirodi?',
      en: 'How long does it take a plastic bottle to decompose in nature?',
    },
    options: [
      { hr: '10 godina', en: '10 years' },
      { hr: '50 godina', en: '50 years' },
      { hr: '150 godina', en: '150 years' },
      { hr: 'Do 450 godina', en: 'Up to 450 years' },
    ],
    correctIndex: 3,
  },
  {
    question: {
      hr: 'Što treba napraviti sa staklenkama prije bacanja u zeleni spremnik?',
      en: 'What should you do with glass jars before putting them in the green bin?',
    },
    options: [
      { hr: 'Razbiti ih', en: 'Break them' },
      { hr: 'Skinuti poklopac', en: 'Remove the lid' },
      { hr: 'Omotati u papir', en: 'Wrap in paper' },
      { hr: 'Ništa posebno', en: 'Nothing special' },
    ],
    correctIndex: 1,
  },
  {
    question: {
      hr: 'Gdje idu baterije?',
      en: 'Where do batteries go?',
    },
    options: [
      { hr: 'Miješani otpad', en: 'Mixed waste' },
      { hr: 'Žuti spremnik', en: 'Yellow bin' },
      { hr: 'Crvene kutije u trgovinama', en: 'Red boxes in stores' },
      { hr: 'Zeleni spremnik', en: 'Green bin' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Koliko stabala spasi jedna tona recikliranog papira?',
      en: 'How many trees does one ton of recycled paper save?',
    },
    options: [
      { hr: '5', en: '5' },
      { hr: '10', en: '10' },
      { hr: '17', en: '17' },
      { hr: '25', en: '25' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Što NIJE dozvoljeno u zelenom spremniku za staklo?',
      en: 'What is NOT allowed in the green glass bin?',
    },
    options: [
      { hr: 'Staklene boce', en: 'Glass bottles' },
      { hr: 'Staklene tegle', en: 'Glass jars' },
      { hr: 'Ogledala', en: 'Mirrors' },
      { hr: 'Boce od vina', en: 'Wine bottles' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Kako možeš naručiti besplatan odvoz glomaznog otpada u Zagrebu?',
      en: 'How can you schedule free bulky waste pickup in Zagreb?',
    },
    options: [
      { hr: 'Nazvati 112', en: 'Call 112' },
      { hr: 'Nazvati 0800 0018', en: 'Call 0800 0018' },
      { hr: 'Poslati SMS', en: 'Send an SMS' },
      { hr: 'Odnijeti u park', en: 'Take it to a park' },
    ],
    correctIndex: 1,
  },
  {
    question: {
      hr: 'Kamo ide stara odjeća u Zagrebu?',
      en: 'Where does old clothing go in Zagreb?',
    },
    options: [
      { hr: 'Miješani otpad', en: 'Mixed waste' },
      { hr: 'Plavi spremnik', en: 'Blue bin' },
      { hr: 'Humana/Crveni križ kontejneri', en: 'Humana/Red Cross containers' },
      { hr: 'Biootpad', en: 'Bio-waste' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Koliko puta se staklo može reciklirati?',
      en: 'How many times can glass be recycled?',
    },
    options: [
      { hr: '5 puta', en: '5 times' },
      { hr: '10 puta', en: '10 times' },
      { hr: '50 puta', en: '50 times' },
      { hr: 'Beskonačno', en: 'Infinitely' },
    ],
    correctIndex: 3,
  },
  {
    question: {
      hr: 'Kolika je kazna za ilegalno odlaganje otpada u Hrvatskoj?',
      en: 'What is the fine for illegal dumping in Croatia?',
    },
    options: [
      { hr: 'Do 500 EUR', en: 'Up to 500 EUR' },
      { hr: 'Do 1.000 EUR', en: 'Up to 1,000 EUR' },
      { hr: 'Do 5.000 EUR', en: 'Up to 5,000 EUR' },
      { hr: 'Do 10.000 EUR', en: 'Up to 10,000 EUR' },
    ],
    correctIndex: 3,
  },
  {
    question: {
      hr: 'Kamo ide ulje za kuhanje?',
      en: 'Where does cooking oil go?',
    },
    options: [
      { hr: 'U sudoper', en: 'Down the drain' },
      { hr: 'Miješani otpad', en: 'Mixed waste' },
      { hr: 'Biootpad', en: 'Bio-waste' },
      { hr: 'Reciklažno dvorište', en: 'Recycling yard' },
    ],
    correctIndex: 3,
  },
  {
    question: {
      hr: 'Koji otpad se u Zagrebu odvozi jednom mjesečno?',
      en: 'Which waste is collected once a month in Zagreb?',
    },
    options: [
      { hr: 'Miješani', en: 'Mixed' },
      { hr: 'Plastika', en: 'Plastic' },
      { hr: 'Papir', en: 'Paper' },
      { hr: 'Staklo', en: 'Glass' },
    ],
    correctIndex: 3,
  },
  {
    question: {
      hr: 'Što treba napraviti s kartonskim kutijama prije bacanja?',
      en: 'What should you do with cardboard boxes before disposing?',
    },
    options: [
      { hr: 'Namočiti ih', en: 'Soak them' },
      { hr: 'Spljoštiti ih', en: 'Flatten them' },
      { hr: 'Izrezati ih', en: 'Cut them' },
      { hr: 'Omotati trakom', en: 'Wrap with tape' },
    ],
    correctIndex: 1,
  },
  {
    question: {
      hr: 'Koliko zelenih otoka ima Zagreb?',
      en: 'How many green islands does Zagreb have?',
    },
    options: [
      { hr: 'Oko 100', en: 'About 100' },
      { hr: 'Oko 250', en: 'About 250' },
      { hr: 'Preko 500', en: 'Over 500' },
      { hr: 'Preko 1000', en: 'Over 1000' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Kamo idu pelene?',
      en: 'Where do diapers go?',
    },
    options: [
      { hr: 'Biootpad', en: 'Bio-waste' },
      { hr: 'Plastika', en: 'Plastic' },
      { hr: 'Papir', en: 'Paper' },
      { hr: 'Miješani otpad', en: 'Mixed waste' },
    ],
    correctIndex: 3,
  },
  {
    question: {
      hr: 'Što se događa s elektroničkim otpadom u trgovini?',
      en: 'What happens with electronic waste at stores?',
    },
    options: [
      { hr: 'Ne prihvaćaju ga', en: 'They don\'t accept it' },
      { hr: 'Prihvaćaju 1-za-1 pri kupnji novog', en: 'Accept 1-for-1 when buying new' },
      { hr: 'Naplaćuju odvoz', en: 'They charge for pickup' },
      { hr: 'Samo vikendom', en: 'Weekends only' },
    ],
    correctIndex: 1,
  },
  {
    question: {
      hr: 'Koliko energije štedimo recikliranjem papira u usporedbi s novim?',
      en: 'How much energy do we save recycling paper vs making new?',
    },
    options: [
      { hr: '30%', en: '30%' },
      { hr: '50%', en: '50%' },
      { hr: '70%', en: '70%' },
      { hr: '90%', en: '90%' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Što je stiropor i kamo ide?',
      en: 'What is styrofoam and where does it go?',
    },
    options: [
      { hr: 'Plastika (žuti)', en: 'Plastic (yellow)' },
      { hr: 'Miješani otpad', en: 'Mixed waste' },
      { hr: 'Reciklažno dvorište', en: 'Recycling yard' },
      { hr: 'Papir (plavi)', en: 'Paper (blue)' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Koliko otpada prosječan Zagrepčanin proizvede godišnje?',
      en: 'How much waste does the average Zagreb citizen produce per year?',
    },
    options: [
      { hr: 'Oko 150 kg', en: 'About 150 kg' },
      { hr: 'Oko 250 kg', en: 'About 250 kg' },
      { hr: 'Oko 400 kg', en: 'About 400 kg' },
      { hr: 'Oko 600 kg', en: 'About 600 kg' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Kamo ide žarulja?',
      en: 'Where does a light bulb go?',
    },
    options: [
      { hr: 'Staklo (zeleni)', en: 'Glass (green)' },
      { hr: 'Miješani otpad', en: 'Mixed waste' },
      { hr: 'Reciklažno dvorište', en: 'Recycling yard' },
      { hr: 'Plastika (žuti)', en: 'Plastic (yellow)' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Što NE ide u žuti spremnik za plastiku?',
      en: 'What does NOT go in the yellow plastic bin?',
    },
    options: [
      { hr: 'Limenke', en: 'Cans' },
      { hr: 'PET boce', en: 'PET bottles' },
      { hr: 'Igračke', en: 'Toys' },
      { hr: 'Folije', en: 'Foils' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Koliki postotak komunalnog otpada Hrvatska mora reciklirati prema EU?',
      en: 'What percentage of municipal waste must Croatia recycle per EU rules?',
    },
    options: [
      { hr: '25%', en: '25%' },
      { hr: '35%', en: '35%' },
      { hr: '45%', en: '45%' },
      { hr: '55%', en: '55%' },
    ],
    correctIndex: 3,
  },
  {
    question: {
      hr: 'Koji je najbrže rastući tok otpada u svijetu?',
      en: 'What is the fastest growing waste stream in the world?',
    },
    options: [
      { hr: 'Plastični otpad', en: 'Plastic waste' },
      { hr: 'Prehrambeni otpad', en: 'Food waste' },
      { hr: 'Elektronički otpad', en: 'Electronic waste' },
      { hr: 'Tekstilni otpad', en: 'Textile waste' },
    ],
    correctIndex: 2,
  },
  {
    question: {
      hr: 'Kamo idu vrećice čaja?',
      en: 'Where do tea bags go?',
    },
    options: [
      { hr: 'Papir (plavi)', en: 'Paper (blue)' },
      { hr: 'Biootpad (smeđi)', en: 'Bio-waste (brown)' },
      { hr: 'Miješani otpad', en: 'Mixed waste' },
      { hr: 'Plastika (žuti)', en: 'Plastic (yellow)' },
    ],
    correctIndex: 1,
  },
];

export function getTodayIndex(total: number): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return dayOfYear % total;
}
