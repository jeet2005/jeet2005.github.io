import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

interface HistoryItem {
  type: 'command' | 'output' | 'system';
  content: React.ReactNode;
  path?: string;
}

const FILE_SYSTEM: Record<string, Record<string, string | null>> = {
  '~': {
    'projects': null, // null means directory
    'certificates': null,
    'research': null,
    'resume.pdf': 'A link to download the resume is pending...',
    'secret.txt': 'SYSTEM OVERRIDE: Nice try, but the real secrets are in the source code.'
  },
  '~/projects': {
    'nexora.txt': 'Nexora: Explainable AI pipeline for brain tumor prediction.',
    'softwisp.txt': 'Softwisp Atlas: A unified student-startup ecosystem.',
    'eyeX.txt': 'eyeX: The next evolution in computer vision.'
  },
  '~/certificates': {
    'cisco.txt': 'Cisco Networking Academy - Python Essentials 1',
    'oracle.txt': 'Oracle Certified Associate - Java SE 8 Programmer'
  },
  '~/research': {
    'explainable_mri.pdf': 'Open the Research Lab chapter to view this poster.',
    'inference_compute.pdf': 'Open the Research Lab chapter to view this poster.'
  }
};

const BOOT_SEQUENCE = [
  "Initializing jeetOS kernel...",
  "Loading core modules: AI, Flutter, React...",
  "Mounting simulated file system...",
  "Establishing neural link...",
  "Welcome to jeetOS v2.0.0"
];

const NEOFETCH_ART = `
       .           guest@jeetOS
      / \\          OS: jeetOS v2.0.0
     /   \\         Host: Web Browser
    /_____\\        Kernel: React 19.x
   /       \\       Uptime: Unknown
  /_________\\      Shell: jeet-bash
                   CPU: Human Brain (Overclocked)
                   RAM: 100% Ambition
`;

export default function TerminalOverlay() {
  const { isTerminalOpen, setIsTerminalOpen } = usePortfolioStore();
  const [isBooting, setIsBooting] = useState(true);
  const [hasBooted, setHasBooted] = useState(false);
  
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTerminalOpen && !hasBooted) {
      setIsBooting(true);
      setHistory([]);
      let i = 0;
      const interval = setInterval(() => {
        if (i < BOOT_SEQUENCE.length) {
          setHistory(prev => [...prev, { type: 'system', content: BOOT_SEQUENCE[i] }]);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsBooting(false);
            setHasBooted(true);
            setHistory(prev => [
              ...prev, 
              { type: 'output', content: "Type 'help' to see available commands." }
            ]);
          }, 500);
        }
      }, 300);
      return () => clearInterval(interval);
    } else if (isTerminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalOpen, hasBooted]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isBooting]);

  if (!isTerminalOpen) return null;

  const getDirectoryContents = (path: string) => {
    return Object.keys(FILE_SYSTEM[path] || {});
  };

  const isDirectory = (path: string, item: string) => {
    const dir = FILE_SYSTEM[path];
    return dir && dir[item] === null;
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Echo command to history
    setHistory(prev => [...prev, { type: 'command', content: trimmedCmd, path: currentPath }]);

    const args = trimmedCmd.split(' ').filter(Boolean);
    const mainCommand = args[0].toLowerCase();
    let output: React.ReactNode = '';

    switch (mainCommand) {
      case 'help':
        output = (
          <div className="ml-4">
            <div>help      - Show this message</div>
            <div>ls        - List directory contents</div>
            <div>cd        - Change directory</div>
            <div>pwd       - Print working directory</div>
            <div>cat       - Read file content</div>
            <div>whoami    - Print user information</div>
            <div>date      - Show system date and time</div>
            <div>neofetch  - Show system information</div>
            <div>echo      - Print arguments</div>
            <div>sudo      - Execute command as superuser</div>
            <div>clear     - Clear terminal history</div>
            <div>exit      - Close terminal</div>
          </div>
        );
        break;
      case 'ls':
        const contents = getDirectoryContents(currentPath);
        if (contents.length === 0) {
          output = '';
        } else {
          output = (
            <div className="flex gap-4 ml-4 flex-wrap">
              {contents.map(item => (
                <div key={item} className={isDirectory(currentPath, item) ? 'text-blue-400 font-bold' : 'text-gray-200'}>
                  {item}{isDirectory(currentPath, item) ? '/' : ''}
                </div>
              ))}
            </div>
          );
        }
        break;
      case 'cd':
        const target = args[1];
        if (!target || target === '~') {
          setCurrentPath('~');
        } else if (target === '..') {
          if (currentPath !== '~') {
            const parts = currentPath.split('/');
            parts.pop();
            setCurrentPath(parts.join('/') || '~');
          }
        } else {
          // Check if target directory exists
          const possiblePath = currentPath === '~' ? `~/${target}` : `${currentPath}/${target}`;
          const currentDir = FILE_SYSTEM[currentPath];
          
          if (currentDir && currentDir[target] === null && FILE_SYSTEM[possiblePath]) {
            setCurrentPath(possiblePath);
          } else {
            output = <div>cd: {target}: No such directory</div>;
          }
        }
        break;
      case 'pwd':
        output = <div>{currentPath.replace('~', '/home/guest')}</div>;
        break;
      case 'cat':
        const file = args[1];
        if (!file) {
          output = <div>cat: missing file operand</div>;
        } else {
          const dir = FILE_SYSTEM[currentPath];
          if (dir && dir[file] !== undefined) {
            if (dir[file] === null) {
              output = <div>cat: {file}: Is a directory</div>;
            } else {
              output = <div className="text-gray-200">{dir[file]}</div>;
            }
          } else {
            output = <div>cat: {file}: No such file or directory</div>;
          }
        }
        break;
      case 'whoami':
        output = <div>Jeet Patel - AI & Flutter Developer | Co-Founder Softwisp-Atlas</div>;
        break;
      case 'date':
        output = <div>{new Date().toString()}</div>;
        break;
      case 'echo':
        output = <div>{args.slice(1).join(' ')}</div>;
        break;
      case 'sudo':
        output = <div className="text-red-500">jeetOS incident reported. This action will be logged. Nice try.</div>;
        break;
      case 'neofetch':
        output = <pre className="text-green-400 font-mono text-xs md:text-sm">{NEOFETCH_ART}</pre>;
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

    if (output) {
      setHistory(prev => [...prev, { type: 'output', content: output }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'Escape') {
      setIsTerminalOpen(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-4xl h-[70vh] bg-[#0a0a0a] border border-[#333] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col font-mono text-green-400 text-sm overflow-hidden rounded-md"
        onClick={() => !isBooting && inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] border-b border-[#333] px-4 py-2 flex items-center justify-between select-none">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsTerminalOpen(false)} />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-gray-400 text-xs tracking-widest">GUEST@JEET-OS:~</div>
          <div />
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {history.map((item, i) => (
            <div key={i}>
              {item.type === 'command' && (
                <div className="flex gap-2">
                  <span className="text-pink-500 font-bold">guest@jeetOS</span>
                  <span className="text-gray-400">:</span>
                  <span className="text-blue-400 font-bold">{item.path}</span>
                  <span className="text-gray-400">$</span>
                  <span className="text-white">{item.content}</span>
                </div>
              )}
              {item.type === 'output' && (
                <div className="mt-1 opacity-90 break-words">{item.content}</div>
              )}
              {item.type === 'system' && (
                <div className="text-green-500 font-bold">{item.content}</div>
              )}
            </div>
          ))}
          
          {!isBooting && (
            <div className="flex gap-2 mt-2">
              <span className="text-pink-500 font-bold">guest@jeetOS</span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-400 font-bold">{currentPath}</span>
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
                autoFocus
              />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
