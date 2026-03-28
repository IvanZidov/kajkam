export interface Reward {
  id: string;
  pointsCost: number;
  icon: string;
  translationKey: string;
}

export const REWARDS: Reward[] = [
  { id: 'zg-bags', pointsCost: 50, icon: 'Package', translationKey: 'zgBags' },
  { id: 'zet-daily', pointsCost: 100, icon: 'Bus', translationKey: 'zetDaily' },
  { id: 'compost', pointsCost: 150, icon: 'Leaf', translationKey: 'compost' },
  { id: 'zet-discount', pointsCost: 300, icon: 'CreditCard', translationKey: 'zetDiscount' },
  { id: 'zoo-ticket', pointsCost: 500, icon: 'PawPrint', translationKey: 'zooTicket' },
];

export const MAX_POINTS_DISPLAY = 500;
