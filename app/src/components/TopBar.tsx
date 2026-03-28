import { Settings, HelpCircle } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="absolute top-0 w-full z-50 bg-surface/80 backdrop-blur-md h-16 md:h-18 flex items-center justify-between px-6 md:px-8 shield-motif shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-8 h-8 md:w-10 md:h-10 object-contain lg:hidden"
        />
        <h1 className="font-black tracking-widest uppercase text-xl md:text-2xl text-primary lg:hidden">KAJKAMO?</h1>
      </div>
      <div className="flex items-center gap-4 md:gap-5">
        <HelpCircle className="w-6 h-6 md:w-7 md:h-7 text-primary cursor-pointer" />
        <Settings className="w-6 h-6 md:w-7 md:h-7 text-primary cursor-pointer" />
      </div>
    </header>
  );
}
