import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

interface HistoryItem {
  type: 'command' | 'output' | 'system' | 'error';
  content: React.ReactNode;
  path?: string;
}

const FILE_SYSTEM: Record<string, Record<string, string | null>> = {
  '~': {
    'projects': null,
    'certificates': null,
    'research': null,
    'resume.txt': 'My resume is available at: /Jeet_Patel_Resume.txt (Click "View Resume" on the homepage!)',
    'secret.txt': 'SYSTEM OVERRIDE: Nice try, but the real secrets are in the source code.',
    '.env': 'OPENAI_API_KEY=sk-nice-try-recruiters\nDB_PASS=iloveflutter'
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

const PROGRAMMING_JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I've got a really good UDP joke to tell you, but I don't know if you'll get it.",
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'"
];

const COWSAY = (text: string) => `
  ${'_'.repeat(text.length + 2)}
< ${text} >
  ${'-'.repeat(text.length + 2)}
         \\   ^__^ 
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
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
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Global escape key for matrix mode
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isMatrixMode && e.key === 'Escape') {
        setIsMatrixMode(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isMatrixMode]);

  // Boot sequence and focus
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
              { type: 'output', content: "Type 'help' to see available commands. Try 'matrix' or 'joke'!" }
            ]);
          }, 500);
        }
      }, 300);
      return () => clearInterval(interval);
    } else if (isTerminalOpen && inputRef.current && !isMatrixMode && !isCrashed) {
      inputRef.current.focus();
    }
  }, [isTerminalOpen, hasBooted, isMatrixMode, isCrashed]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isBooting, isCrashed]);

  if (!isTerminalOpen) return null;

  const getDirectoryContents = (path: string, showHidden = false) => {
    const contents = Object.keys(FILE_SYSTEM[path] || {});
    if (showHidden) return contents;
    return contents.filter(item => !item.startsWith('.'));
  };

  const isDirectory = (path: string, item: string) => {
    const dir = FILE_SYSTEM[path];
    return dir && dir[item] === null;
  };

  const simulatePing = (url: string) => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < 4) {
        setHistory(prev => [...prev, { type: 'output', content: `64 bytes from ${url}: icmp_seq=${count + 1} ttl=115 time=${Math.floor(Math.random() * 50 + 10)} ms` }]);
        count++;
      } else {
        clearInterval(interval);
        setHistory(prev => [...prev, { type: 'system', content: `--- ${url} ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss` }]);
      }
    }, 1000);
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    setHistory(prev => [...prev, { type: 'command', content: trimmedCmd, path: currentPath }]);

    const args = trimmedCmd.split(' ').filter(Boolean);
    const mainCommand = args[0].toLowerCase();
    let output: React.ReactNode = '';

    switch (mainCommand) {
      case 'help':
        output = (
          <div className="ml-4">
            <div className="text-pink-400 mb-1">--- Basics ---</div>
            <div>ls [-a]   - List directory contents</div>
            <div>cd        - Change directory</div>
            <div>pwd       - Print working directory</div>
            <div>cat       - Read file content</div>
            <div>clear     - Clear terminal history</div>
            <div>exit      - Close terminal</div>
            <div className="text-pink-400 mt-2 mb-1">--- Advanced ---</div>
            <div>whoami    - Print user information</div>
            <div>date      - Show system date and time</div>
            <div>neofetch  - Show system information</div>
            <div>ping      - Ping a website</div>
            <div>github    - Open GitHub profile</div>
            <div>linkedin  - Open LinkedIn profile</div>
            <div>weather   - Check local weather</div>
            <div className="text-pink-400 mt-2 mb-1">--- Fun ---</div>
            <div>joke      - Hear a programming joke</div>
            <div>cowsay    - The cow says...</div>
            <div>matrix    - Enter the matrix</div>
          </div>
        );
        break;
      case 'ls':
        const showHidden = args.includes('-a') || args.includes('-al') || args.includes('-la');
        const contents = getDirectoryContents(currentPath, showHidden);
        if (contents.length === 0) {
          output = '';
        } else {
          output = (
            <div className="flex gap-4 ml-4 flex-wrap">
              {contents.map(item => (
                <div key={item} className={isDirectory(currentPath, item) ? 'text-blue-400 font-bold' : (item.startsWith('.') ? 'text-gray-500' : 'text-gray-200')}>
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
              output = <div className={file.endsWith('.json') || file.startsWith('.') ? "text-yellow-400" : "text-gray-200 whitespace-pre-wrap"}>{dir[file]}</div>;
            }
          } else {
            output = <div>cat: {file}: No such file or directory</div>;
          }
        }
        break;
      case 'whoami':
        output = <div>Jeet Patel - The one who builds.</div>;
        break;
      case 'date':
        output = <div>{new Date().toString()}</div>;
        break;
      case 'echo':
        output = <div>{args.slice(1).join(' ')}</div>;
        break;
      case 'sudo':
        if (args[1] === 'rm' && args[2] === '-rf' && args[3] === '/') {
          setIsCrashed(true);
          setTimeout(() => {
            setIsTerminalOpen(false);
            setIsCrashed(false);
          }, 4000);
          output = (
            <div className="flex flex-col gap-2 mt-4">
              <div className="text-red-500 font-bold text-xl mb-2">KERNEL PANIC: ATTEMPTED TO DELETE SIMULATION.</div>
              <div className="text-red-400 animate-pulse">Deleting /home/guest...</div>
              <div className="text-red-400 animate-pulse">Deleting /boot...</div>
              <div className="text-red-400 animate-pulse">Shutting down neural link...</div>
            </div>
          );
        } else {
          output = <div className="text-red-500">jeetOS incident reported. This action has been logged.</div>;
        }
        break;
      case 'neofetch':
        output = <pre className="text-green-400 font-mono text-xs md:text-sm">{NEOFETCH_ART}</pre>;
        break;
      case 'weather':
        output = (
          <div className="text-yellow-400">
            [Ahmedabad, Gujarat, India]<br/>
            Condition: Sunny & Extremely Hot (Standard)<br/>
            Temp: 42°C (107°F)<br/>
            Forecast: 100% chance of shipping code.
          </div>
        );
        break;
      case 'github':
        window.open('https://github.com/jeet2005', '_blank');
        output = <div>Opening GitHub...</div>;
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/jeetpatel1908/', '_blank');
        output = <div>Opening LinkedIn...</div>;
        break;
      case 'joke':
        output = <div className="text-yellow-400">{PROGRAMMING_JOKES[Math.floor(Math.random() * PROGRAMMING_JOKES.length)]}</div>;
        break;
      case 'cowsay':
        const text = args.slice(1).join(' ') || "Moo.";
        output = <pre className="text-white font-mono text-xs md:text-sm">{COWSAY(text)}</pre>;
        break;
      case 'ping':
        if (!args[1]) {
          output = <div>ping: missing url</div>;
        } else {
          simulatePing(args[1]);
          output = <div>PING {args[1]} (192.168.1.1): 56 data bytes</div>;
        }
        break;
      case 'matrix':
        setIsMatrixMode(true);
        output = <div>Entering the Matrix... Press ESC to exit.</div>;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsTerminalOpen(false);
        return;
      default:
        const sassyResponses = [
          `command not found: ${mainCommand}`,
          `Are you sure you typed that right? '${mainCommand}' is not a thing here.`,
          `Try typing 'help' before you break something.`,
          `'${mainCommand}'? Really?`
        ];
        output = <div>{sassyResponses[Math.floor(Math.random() * sassyResponses.length)]}</div>;
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
        ref={terminalRef}
        className={`w-full max-w-4xl h-[70vh] bg-[#0a0a0a] border border-[#333] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col font-mono text-green-400 text-sm overflow-hidden rounded-md transition-all duration-300 ${isCrashed ? 'scale-[1.05] shadow-[0_0_100px_rgba(255,0,0,0.8)] border-red-500' : ''}`}
        onClick={() => !isBooting && !isMatrixMode && !isCrashed && inputRef.current?.focus()}
      >
        {isMatrixMode ? (
          <div className="w-full h-full relative overflow-hidden bg-black flex flex-col items-center justify-center">
            <div className="text-green-500 font-bold animate-pulse text-2xl mb-4 z-10 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">THE MATRIX HAS YOU</div>
            <button 
              onClick={() => setIsMatrixMode(false)}
              className="z-10 px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors"
            >
              WAKE UP (ESC)
            </button>
            <div className="absolute inset-0 opacity-40 bg-[url('https://media.giphy.com/media/A06zQhI4KpDPm/giphy.gif')] bg-cover bg-center pointer-events-none mix-blend-screen" />
          </div>
        ) : (
          <>
            {/* Terminal Header */}
            <div className={`${isCrashed ? 'bg-red-900' : 'bg-[#1a1a1a]'} border-b border-[#333] px-4 py-2 flex items-center justify-between select-none transition-colors`}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsTerminalOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className={`text-xs tracking-widest ${isCrashed ? 'text-red-300 font-bold' : 'text-gray-400'}`}>
                {isCrashed ? 'SYSTEM FAILURE' : 'GUEST@JEET-OS:~'}
              </div>
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
              
              {!isBooting && !isCrashed && (
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
          </>
        )}
      </div>
    </div>
  );
}
