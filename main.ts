// Entry point for the Steady Hand paper-trading bot (agent-fun/replay/v2).
// The grader runs `node /bot/main.ts`; the wire protocol lives in the vendored
// kit shim and the trading logic in strategy.ts.

import { runBot } from './vendor/makefun-bot.ts';
import { createBot } from './strategy.ts';

await runBot(createBot());
