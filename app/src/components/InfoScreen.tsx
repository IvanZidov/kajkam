import type { ElementType, ReactNode } from 'react';
import { X, Calendar, Trash2, Recycle, Truck, AlertTriangle, MapPin, Phone, Scale, Coins, Leaf } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface InfoScreenProps {
  onClose: () => void;
}

const binColors: Record<string, { bg: string; border: string }> = {
  yellow: { bg: 'bg-yellow-100', border: 'border-yellow-400' },
  blue: { bg: 'bg-blue-100', border: 'border-blue-400' },
  brown: { bg: 'bg-amber-100', border: 'border-amber-600' },
  green: { bg: 'bg-green-100', border: 'border-green-500' },
  grey: { bg: 'bg-gray-100', border: 'border-gray-400' },
};

function Section({ icon: Icon, title, children }: { icon: ElementType; title: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4.5 h-4.5 text-primary shrink-0" strokeWidth={2.2} />
        <h3 className="text-xs font-bold uppercase tracking-wider text-primary">{title}</h3>
      </div>
      <div className="pl-7">{children}</div>
    </div>
  );
}

function PreText({ text }: { text: string }) {
  return (
    <p className="text-sm text-on-surface leading-relaxed whitespace-pre-line">{text}</p>
  );
}

function BinCard({ color, text }: { color: string; text: string }) {
  const c = binColors[color] ?? binColors.grey;
  return (
    <div className={`${c.bg} border-l-3 ${c.border} px-3 py-2 mb-2 shield-motif`}>
      <p className="text-xs text-on-surface leading-relaxed">{text}</p>
    </div>
  );
}

export default function InfoScreen({ onClose }: InfoScreenProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[100] bg-surface flex flex-col">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-md h-16 flex items-center justify-between px-6 shield-motif shadow-sm shrink-0">
        <h2 className="font-black tracking-widest uppercase text-lg text-primary">{t.info.title}</h2>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
        >
          <X className="w-5 h-5 text-primary" />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 hide-scrollbar">
        <div className="max-w-lg mx-auto">

          {/* Sorting Rules */}
          <Section icon={Trash2} title={t.info.sortingRules}>
            <BinCard color="yellow" text={t.info.yellowBin} />
            <BinCard color="blue" text={t.info.blueBin} />
            <BinCard color="brown" text={t.info.brownBin} />
            <BinCard color="green" text={t.info.greenBin} />
            <BinCard color="grey" text={t.info.greyBin} />
          </Section>

          {/* Collection Schedule */}
          <Section icon={Calendar} title={t.info.collectionSchedule}>
            <PreText text={t.info.collectionScheduleDesc} />
          </Section>

          {/* Recycling Yards */}
          <Section icon={Recycle} title={t.info.recyclingYards}>
            <PreText text={t.info.recyclingYardsDesc} />
            <div className="mt-2 bg-surface-container-low p-3 shield-motif">
              <PreText text={t.info.recyclingYardsList} />
              <p className="text-xs text-primary font-bold mt-2">{t.info.recyclingYardsHours}</p>
            </div>
          </Section>

          {/* Bulky Waste */}
          <Section icon={Truck} title={t.info.bulkyWaste}>
            <PreText text={t.info.bulkyWasteDesc} />
          </Section>

          {/* Special Waste */}
          <Section icon={AlertTriangle} title={t.info.specialWaste}>
            <PreText text={t.info.specialWasteList} />
          </Section>

          {/* Green Islands */}
          <Section icon={MapPin} title={t.info.greenIslands}>
            <PreText text={t.info.greenIslandsDesc} />
          </Section>

          {/* Deposit Return */}
          <Section icon={Coins} title={t.info.depositReturn}>
            <PreText text={t.info.depositReturnDesc} />
          </Section>

          {/* Composting */}
          <Section icon={Leaf} title={t.info.composting}>
            <PreText text={t.info.compostingDesc} />
          </Section>

          {/* Contacts */}
          <Section icon={Phone} title={t.info.contacts}>
            <PreText text={t.info.contactsList} />
          </Section>

          {/* Fines */}
          <Section icon={Scale} title={t.info.fines}>
            <PreText text={t.info.finesDesc} />
          </Section>

          {/* Source */}
          <p className="text-[10px] text-outline text-center mt-6 mb-4 uppercase tracking-wider">
            {t.info.source}
          </p>
        </div>
      </div>
    </div>
  );
}
