import React, { useState } from 'react';

export default function TerminalContact() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'INITIATING SECURE COMM LINK...' },
    { type: 'system', text: 'WAITING FOR INPUT...' }
  ]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      if (!command) return;

      const newHistory = [...history, { type: 'user', text: `$ ${input}` }];
      
      setTimeout(() => {
        let response = '';
        if (command === 'help') {
          response = 'Available commands: email, github, linkedin, clear';
        } else if (command === 'email') {
          response = 'Contacting at dev@example.com...';
          window.location.href = 'mailto:dev@example.com';
        } else if (command === 'github') {
          response = 'Opening signal: github.com/username';
          window.open('https://github.com', '_blank');
        } else if (command === 'linkedin') {
          response = 'Bypassing firewall: linkedin.com/in/username';
          window.open('https://linkedin.com', '_blank');
        } else if (command === 'clear') {
          setHistory([]);
          setInput('');
          return;
        } else {
          response = `Command unrecognized: ${command}. Type 'help' for options.`;
        }

        setHistory([...newHistory, { type: 'system', text: response }]);
      }, 400);

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-40 relative z-10 w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl px-4 md:px-0">
        <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight text-center mb-16">
          Terminal Access
        </h2>
        
        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl shadow-2xl overflow-hidden glass-panel">
          <div className="bg-[#111111] px-4 py-3 border-b border-white/5 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <div className="ml-4 font-mono text-xs text-gray-500">guest@masterpiece:~</div>
          </div>

          <div className="p-6 h-[300px] overflow-y-auto font-mono text-sm space-y-3 custom-scrollbar">
            {history.map((line, i) => (
              <div 
                key={i} 
                className={`${line.type === 'system' ? 'text-[#00F0FF]' : 'text-gray-300'} break-words`}
              >
                {line.text}
              </div>
            ))}
            
            <div className="flex items-center space-x-2 mt-4 text-[#B200FF]">
              <span className="shrink-0">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                placeholder="Type 'help' and press Enter..."
                className="w-full bg-transparent border-none outline-none text-white focus:ring-0 placeholder-gray-600 font-mono"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            {/* Blinking cursor effect simulated by Framer usually, but simple CSS here is safer to fix disappearance */}
             <style dangerouslySetInnerHTML={{ __html: `
               .custom-scrollbar::-webkit-scrollbar { width: 6px; }
               .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
               .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
               .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
            `}} />
          </div>
        </div>
      </div>
    </section>
  );
}
