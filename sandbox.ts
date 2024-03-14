// @ts-nocheck
// this is used on val.town, not from the web component

import * as SuperJSON from 'npm:superjson@2.2.1';

type Log = {
  type: string;
  args: unknown[];
  time: number;
  stack: string;
};

async function execute(code: string): Promise<{logs: Log[]}> {
  try {
    const blob = new Blob([code], {
      type: 'text/tsx'
    });
    const url = URL.createObjectURL(blob);
    const markStackStart = crypto.randomUUID();
    const markStackEnd = crypto.randomUUID();
    function cleanStack(stack: string) {
      let lines: string[] = [];
      for (const line of stack.split('\n')) {
        if (line.includes(markStackEnd)) break;
        lines.push(line.replace(url, 'input.tsx'));
        if (line.includes(markStackStart)) {
          lines = [];
        }
      }
      return lines.join('\n');
    }
    const logs: Log[] = [];
    globalThis.console = new Proxy(console, {
      get(target, key) {
        const real = target[key];
        if (typeof real === 'function' && typeof key === 'string') {
          const fn = function (...args: any[]) {
            logs.push({
              type: key,
              args,
              time: Date.now(),
              stack: cleanStack(new Error().stack)
            });
            return real.call(this, ...args);
          };
          Object.defineProperty(fn, 'name', {
            writable: true,
            value: markStackStart
          });
          return fn;
        }
      }
    });
    async function run() {
      try {
        await import(url);
      } catch (e) {
        logs.push({
          type: 'error',
          args: [e],
          time: Date.now(),
          stack: cleanStack(e.stack)
        });
      }
    }
    Object.defineProperty(run, 'name', {
      writable: true,
      value: markStackEnd
    });
    await run();
    URL.revokeObjectURL(url);
    return {
      logs
    };
  } catch (error) {
    return {
      logs: [
        {
          type: 'error',
          args: [error],
          time: Date.now(),
          stack: new Error().stack.replace(/^.+\n/, '')
        }
      ]
    };
  }
}
export const serializedExecute = async (code: string) =>
  SuperJSON.stringify(await execute(code));
