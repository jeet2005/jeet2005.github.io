import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function TerminalOverlay() {
  const { isTerminalOpen, setIsTerminalOpen } = usePortfolioStore();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: '',
      output: (
        <>
          <div>Welcome to NexoraOS v1.0.4</div>
          <div>Type 'help' for a list of commands.</div>
        </>
      ),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isTerminalOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    let output: React.ReactNode = '';

    const args = trimmedCmd.split(' ');
    const mainCommand = args[0].toLowerCase();

    switch (mainCommand) {
      case 'help':
        output = (
          <div className="ml-4">
            <div>help      - Show this message</div>
            <div>ls        - List system directories</div>
            <div>whoami    - Print user information</div>
            <div>cat       - Read file content (e.g. 'cat resume.pdf')</div>
            <div>clear     - Clear terminal history</div>
            <div>exit      - Close terminal</div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="grid grid-cols-2 gap-4 ml-4 text-blue-400">
            <div>projects/</div>
            <div>certificates/</div>
            <div>research/</div>
            <div>resume.pdf</div>
            <div>secret_keys.txt</div>
          </div>
        );
        break;
      case 'whoami':
        output = <div>Jeet Patel - AI & Flutter Developer | Co-Founder Softwisp-Atlas</div>;
        break;
      case 'cat':
        if (args[1] === 'resume.pdf') {
          output = <div>Downloading resume... [Link pending]</div>;
        } else if (args[1] === 'secret_keys.txt') {
          output = <div className="text-red-500">Access Denied. Nice try.</div>;
        } else if (!args[1]) {
          output = <div>cat: missing file operand</div>;
        } else {
          output = <div>cat: {args[1]}: No such file or directory</div>;
        }
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsTerminalOpen(false);
        return;
      default:
        output = <div>command not found: {mainCommand}</div>;
    }

    setHistory((prev) => [...prev, { command: trimmedCmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'Escape') {
      setIsTerminalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-4xl h-[70vh] bg-[#0a0a0a] border border-[#333] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col font-mono text-green-400 text-sm overflow-hidden"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] border-b border-[#333] px-4 py-2 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsTerminalOpen(false)} />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-gray-400 text-xs tracking-widest">GUEST@NEXORA-OS:~</div>
          <div />
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {history.map((item, i) => (
            <div key={i}>
              {item.command && (
                <div className="flex gap-2">
                  <span className="text-pink-500">guest@nexora</span>
                  <span className="text-gray-400">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-400">$</span>
                  <span className="text-white">{item.command}</span>
                </div>
              )}
              <div className="mt-1 opacity-90">{item.output}</div>
            </div>
          ))}
          
          <div className="flex gap-2 mt-2">
            <span className="text-pink-500">guest@nexora</span>
            <span className="text-gray-400">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-gray-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white caret-green-500"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
