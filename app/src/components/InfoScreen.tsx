import type { ElementType, ReactNode } from 'react';
import { ArrowLeft, Calendar, Trash2, Recycle, Truck, AlertTriangle, MapPin, Phone, Scale, Coins, Leaf, BookOpen } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface InfoScreenProps {
  onBack: () => void;
}

const BIN_STYLES: Record<string, string> = {
  yellow: 'bg-[#FFF9C4] border-l-[#F9A825]',
  blue: 'bg-[#E3F2FD] border-l-[#1976D2]',
  brown: 'bg-[#EFEBE9] border-l-[#6D4C41]',
  green: 'bg-[#E8F5E9] border-l-[#388E3C]',
  grey: 'bg-[#F5F5F5] border-l-[#616161]',
};

function Section({ icon: Icon, title, children }: { icon: ElementType; title: string; children: ReactNode }) {
  return (
    <div className="bg-surface-container-lowest shield-motif p-6 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary-container p-2 shield-motif">
          <Icon className="w-4 h-4 text-white" strokeWidth={2.2} />
        </div>
        <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-primary">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function TextBlock({ text }: { text: string }) {
  return (
    <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">{text}</p>
  );
}

function BinCard({ color, text }: { color: string; text: string }) {
  const style = BIN_STYLES[color] ?? BIN_STYLES.grey;
  return (
    <div className={`${style} border-l-3 px-3 py-2.5 shield-motif`}>
      <p className="text-xs text-on-surface leading-relaxed">{text}</p>
    </div>
  );
}

export default function InfoScreen({ onBack }: InfoScreenProps) {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-6 space-y-4">
      {/* Header */}
      <div className="mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary mb-4 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-xs font-bold uppercase tracking-wider">{t.info.title}</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-primary-container p-3 shield-motif">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.15em] text-outline uppercase block">{t.common.appName}</span>
            <h1 className="text-3xl font-black tracking-tight text-primary leading-none uppercase">{t.info.title}</h1>
          </div>
        </div>
      </div>

      {/* Sorting Rules */}
      <Section icon={Trash2} title={t.info.sortingRules}>
        <div className="space-y-2">
          <BinCard color="yellow" text={t.info.yellowBin} />
          <BinCard color="blue" text={t.info.blueBin} />
          <BinCard color="brown" text={t.info.brownBin} />
          <BinCard color="green" text={t.info.greenBin} />
          <BinCard color="grey" text={t.info.greyBin} />
        </div>
      </Section>

      {/* Collection Schedule */}
      <Section icon={Calendar} title={t.info.collectionSchedule}>
        <TextBlock text={t.info.collectionScheduleDesc} />
      </Section>

      {/* Recycling Yards */}
      <Section icon={Recycle} title={t.info.recyclingYards}>
        <TextBlock text={t.info.recyclingYardsDesc} />
        <div className="mt-3 bg-surface-container-low p-4 shield-motif">
          <TextBlock text={t.info.recyclingYardsList} />
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider mt-3">{t.info.recyclingYardsHours}</p>
        </div>
      </Section>

      {/* Bulky Waste */}
      <Section icon={Truck} title={t.info.bulkyWaste}>
        <TextBlock text={t.info.bulkyWasteDesc} />
      </Section>

      {/* Special Waste */}
      <Section icon={AlertTriangle} title={t.info.specialWaste}>
        <TextBlock text={t.info.specialWasteList} />
      </Section>

      {/* Green Islands */}
      <Section icon={MapPin} title={t.info.greenIslands}>
        <TextBlock text={t.info.greenIslandsDesc} />
      </Section>

      {/* Deposit Return */}
      <Section icon={Coins} title={t.info.depositReturn}>
        <TextBlock text={t.info.depositReturnDesc} />
      </Section>

      {/* Composting */}
      <Section icon={Leaf} title={t.info.composting}>
        <TextBlock text={t.info.compostingDesc} />
      </Section>

      {/* Contacts */}
      <Section icon={Phone} title={t.info.contacts}>
        <TextBlock text={t.info.contactsList} />
      </Section>

      {/* Fines */}
      <Section icon={Scale} title={t.info.fines}>
        <TextBlock text={t.info.finesDesc} />
      </Section>

      {/* Source */}
      <p className="text-[10px] text-outline text-center pt-2 pb-4 uppercase tracking-wider">
        {t.info.source}
      </p>
    </div>
  );
}
