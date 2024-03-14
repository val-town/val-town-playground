// @ts-nocheck
// (c) easrng 2024 all rights reserved

import * as SuperJSON from 'npm:superjson@2.2.1';

type Log = {
  level: string;
  args: unknown[];
};

async function execute(
  code: string
): Promise<{ok: true; logs: Log[]} | {ok: false; error: string}> {
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
              level: key,
              args
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
          level: 'error',
          args: [e.message]
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
      ok: true,
      logs
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message
    };
  }
}
export const serializedExecute = async (code: string) =>
  SuperJSON.stringify(await execute(code));
