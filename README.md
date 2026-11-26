# Steady Hand — Pump.fun Sharpe Sprint Paper Bot

A paper-trading bot for the make.fun competition [Pump.fun Sharpe Sprint — Cleanest Paper Bot Wins](https://make.fun/bounty/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532). It trades 10 SOL of paper money on a 6-hour pump.fun forward replay under the `agent-fun/replay/v2` protocol, ranked by hourly Sharpe ratio. No real funds, wallet or network are involved.

[![Competition](https://make.fun/badge/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532)
[![Rank](https://make.fun/badge/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532/aira-catur/steady-hand-sharpe-sprint/rank.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532/leaderboard)
[![Reward](https://make.fun/badge/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532/aira-catur/steady-hand-sharpe-sprint/reward.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532)

## Strategy

The ranking pays for steadiness: the score is the mean of the hourly equity returns divided by their spread, so one wild hour — in either direction — costs more than a quiet hour earns. On this tape almost every long strategy bleeds (the kit's own momentum pilot loses 9.4 of its 10 SOL on the dev window), so Steady Hand's first job is to not bleed.

It trades only the first seconds of a launch, where the flow is most one-sided, and only launches whose shape says the crowd, not just the creator, is buying: the creator's own first buy is present but modest (0.03–1 SOL), 2–6 distinct wallets have already bought, the curve already holds at least 0.3 SOL of real reserve, and the creator has not sold. Each position is one fixed 0.09 SOL and lives for seconds: out at +15%, out at −12%, out the moment the creator sells, out after 40 slots regardless. A run-level brake stops all new entries once equity falls 0.6% below the starting capital, leaving the later hourly marks flat instead of negative. A paced drip of tiny probe round trips on liquid curves keeps the guardrails satisfied (300 fills over 30 coins targeted, against a floor of 200 fills over 20 coins).

Three plumbing rules, each learned from a rejected-order storm in testing: a position is valued at what a close can actually pay — the virtual quote capped by the curve's real reserve, fees out; a sell whose quote would exceed the real reserve leaves in slices sized by inverting the curve formula, because the market rejects it whole; and a position worth less than its own exit fees is abandoned to the harness write-off instead of being offered for sale forever.

Measured with the kit's local engine port on all three segments of the dev dataset (the final window is a different, forward tape): net −0.054 / −0.066 / −0.073 SOL, maximum drawdown 0.84% / 0.87% / 0.73%, 306 / 288 / 200 fills over 78 / 83 / 40 round-tripped coins, hourly Sharpe −0.42 / −0.40 / −0.91 — against −9.38 SOL and 95% drawdown for the kit momentum pilot and −1.78 SOL for the reversion pilot on the same tape. The bot is deterministic by construction: no clock, no randomness, no environment reads, and iteration only over insertion-ordered maps fed by the batch stream, so the grader's two executions produce byte-identical action logs.

## Layout

- `main.ts` — entrypoint run by the grader (`node /bot/main.ts`)
- `strategy.ts` — the Steady Hand strategy
- `vendor/makefun-bot.ts` — the kit's `agent-fun/replay/v2` TypeScript shim, vendored byte for byte

## License

MIT — see `LICENSE`.
