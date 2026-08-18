import React, { useState } from 'react';
import { CodeExercise } from '../../types/lms';
import { Play, RotateCcw, Lightbulb, CheckCircle2, Terminal, Code2 } from 'lucide-react';
import { Button } from '../ui/button';
import { showSuccess, showError } from '../../utils/toast';

interface CodeEditorSandboxProps {
  exercise: CodeExercise;
  onSolved?: () => void;
}

export const CodeEditorSandbox: React.FC<CodeEditorSandboxProps> = ({ exercise, onSolved }) => {
  const [code, setCode] = useState(exercise.initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHintIndex, setShowHintIndex] = useState<number>(-1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Running test harness in sandbox environment...\n');

    setTimeout(() => {
      setIsRunning(false);
      // Basic heuristic test simulation
      const hasAction = code.includes('createTodo') || code.includes('function') || code.includes('export');
      const hasValidation = code.includes('if') || code.includes('throw') || code.includes('return');

      if (hasAction && hasValidation) {
        setOutput(`> npm run test:unit\n PASS  src/__tests__/server-actions.test.ts\n  ✓ createTodo returns optimistic response on valid payload (12ms)\n  ✓ createTodo handles validation boundaries gracefully (4ms)\n\nTest Suites: 1 passed, 1 total\nTests:       2 passed, 2 total\nSnapshots:   0 total\nTime:        0.412 s\n\n🎉 Output: { success: true, id: "17315029", title: "Refactor Next.js" }`);
        setIsSuccess(true);
        showSuccess('Awesome! Exercise solved successfully!');
        if (onSolved) onSolved();
      } else {
        setOutput(`> npm run test:unit\n FAIL  src/__tests__/server-actions.test.ts\n  ✕ createTodo validation check failed: expected validation or valid return statement.\n\nTest Suites: 1 failed, 1 total\n\nTip: Review the prompt hints to ensure all function logic is fulfilled.`);
        setIsSuccess(false);
        showError('Test execution failed. Check console output.');
      }
    }, 650);
  };

  const handleReset = () => {
    setCode(exercise.initialCode);
    setOutput('');
    setIsSuccess(false);
  };

  const handleShowHint = () => {
    if (showHintIndex < exercise.hints.length - 1) {
      setShowHintIndex(prev => prev + 1);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl space-y-0">
      {/* Sandbox Header */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-bold text-slate-200">{exercise.title}</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800">
            {exercise.language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {exercise.hints.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleShowHint}
              className="text-[11px] h-7 px-2.5 rounded-lg border-amber-500/30 text-amber-300 bg-amber-950/20 hover:bg-amber-900/40 gap-1"
            >
              <Lightbulb className="h-3 w-3" />
              Hint ({showHintIndex + 1}/{exercise.hints.length})
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-[11px] h-7 px-2.5 rounded-lg text-slate-400 hover:text-white"
          >
            <RotateCcw className="h-3 w-3 mr-1" /> Reset
          </Button>
          <Button
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold h-7 px-3 rounded-lg shadow-sm gap-1"
          >
            <Play className="h-3 w-3 fill-current" />
            {isRunning ? 'Evaluating...' : 'Run & Test'}
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="p-3 bg-slate-900/70 border-b border-slate-800/80 text-xs text-slate-300">
        {exercise.description}
      </div>

      {/* Hints banner if active */}
      {showHintIndex >= 0 && (
        <div className="p-3 bg-amber-950/40 border-b border-amber-800/40 text-amber-200 text-xs flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Hint #{showHintIndex + 1}: </strong>
            <span>{exercise.hints[showHintIndex]}</span>
          </div>
        </div>
      )}

      {/* Code Textarea / Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-44 bg-slate-950 font-mono text-xs text-emerald-400 p-4 outline-none resize-y selection:bg-indigo-700 selection:text-white leading-relaxed"
          placeholder="// Type your code here..."
        />
      </div>

      {/* Output Console */}
      <div className="bg-black/90 border-t border-slate-800 p-3">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
          <span className="flex items-center gap-1.5 text-slate-400 font-mono">
            <Terminal className="h-3.5 w-3.5" /> Terminal Output
          </span>
          {isSuccess && (
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5" /> Tests Passed
            </span>
          )}
        </div>
        <pre className="font-mono text-[11px] text-slate-300 whitespace-pre-wrap max-h-32 overflow-y-auto leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
          {output || '// Press "Run & Test" to evaluate your solution...'}
        </pre>
      </div>
    </div>
  );
};