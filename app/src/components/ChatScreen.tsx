import { Info, Bot, Send, Paperclip, Leaf } from 'lucide-react';

export default function ChatScreen() {
  return (
    <div className="flex flex-col flex-1">
      <div className="px-4 py-4">
        <div className="bg-primary-container text-on-primary px-4 py-3 shield-motif flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Leaf className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Tvoj doprinos gradu: +12 ZG Bodova</span>
          </div>
          <Info className="w-5 h-5 text-secondary" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-6 pb-4 hide-scrollbar">
        {/* AI Message */}
        <div className="flex flex-col items-start max-w-[85%]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">ZG Eko-Asistent</span>
          </div>
          <div className="bg-surface-container-low text-on-surface p-4 shield-motif text-sm leading-relaxed">
            Bok! Ja sam tvoj ZG Eko-Asistent. Kako ti mogu pomoći s recikliranjem danas?
          </div>
        </div>

        {/* User Message */}
        <div className="flex flex-col items-end max-w-[85%] self-end">
          <div className="bg-primary text-white p-4 shield-motif text-sm leading-relaxed shadow-md">
            Pozdrav! Gdje mogu baciti stare baterije u blizini Trešnjevke?
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-outline mt-1 mr-2">Dostavljeno</span>
        </div>

        {/* AI Message */}
        <div className="flex flex-col items-start max-w-[85%]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">ZG Eko-Asistent</span>
          </div>
          <div className="bg-surface-container-low text-on-surface p-4 shield-motif text-sm leading-relaxed">
            Za baterije na Trešnjevci imaš nekoliko opcija. Najbliži reciklažni centar je u <span className="font-bold underline">Ulici knezova Branimira</span>, ali možeš ih ostaviti i u bilo kojem većem trgovačkom lancu (Lidl, Konzum) u označene spremnike. Želiš li da ti pokažem kartu?
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 bg-surface">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4 pb-1">
          <button className="whitespace-nowrap bg-surface-container-highest text-primary px-4 py-2 shield-motif text-[11px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors duration-200">
            Kamo idu baterije?
          </button>
          <button className="whitespace-nowrap bg-surface-container-highest text-primary px-4 py-2 shield-motif text-[11px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors duration-200">
            Što je glomazni otpad?
          </button>
          <button className="whitespace-nowrap bg-surface-container-highest text-primary px-4 py-2 shield-motif text-[11px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors duration-200">
            Čašice od jogurta?
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-surface-container-low shield-motif flex items-center px-4 py-3">
            <input 
              type="text" 
              placeholder="Pitaj nešto..." 
              className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-sm text-on-surface placeholder:text-outline"
            />
            <Paperclip className="w-5 h-5 text-outline cursor-pointer hover:text-primary shrink-0 ml-2" />
          </div>
          <button className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform shrink-0">
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
