import { Settings, HelpCircle } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="absolute top-0 w-full z-50 bg-surface/80 backdrop-blur-md h-16 flex items-center justify-between px-6 shield-motif shadow-sm">
      <div className="flex items-center gap-3">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwwDTeCVpBkaARcp6yPTZUH7wKiblLAEW2Q1FNWS0zaObIN_ggN3DzIrtPw2bJNJU15d-mmG9uzZMdC1nWGyOLXwljjwBFGghqeF2e6UJj_j5LIWzF_bND0JN0WZN1BzgjHYtFEzoU3y-i8O6HZ0oma7rVAq3CnndvWixM7aIfiK_jKZpI_a3yl5wtJnyEaicOK4MQHh5RSLmzYIWxXq3GCzyHrRVlNUASXGIat93XN5O5FhxJLXMmc2ci6ue-FHK-9RG30etwVJzo" 
          alt="Logo" 
          className="w-8 h-8 object-contain"
        />
        <h1 className="font-black tracking-widest uppercase text-xl text-primary">KAJKAMO?</h1>
      </div>
      <div className="flex items-center gap-4">
        <HelpCircle className="w-6 h-6 text-primary cursor-pointer" />
        <Settings className="w-6 h-6 text-primary cursor-pointer" />
      </div>
    </header>
  );
}
