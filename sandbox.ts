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
        return fn;
      }
    }
  });
  const logs: Log[] = [];
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

  const blob = new Blob([code], {
    type: 'text/tsx'
  });
  const url = URL.createObjectURL(blob);

  const start = performance.now();
  try {
    await run();
    return {
      ok: true,
      duration: performance.now() - start,
      logs
    };
  } catch (error) {
    return {
      ok: false,
      duration: (performance.now() = start),
      error: error.message
    };
  }
}
export const serializedExecute = async (code: string) =>
  SuperJSON.stringify(await execute(code));
