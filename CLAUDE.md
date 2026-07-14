# polaris-ui

<!-- BEGIN:token-budget-standing-rule -->
---

## Token budget — stay inside the 5-hour window (standing rule, every project)

**The goal is availability, not frugality.** Never exhaust the 5-hour usage window — being useful all
day beats being maximally thorough once. Getting blocked is the only failure mode that matters. Watch
the rolling **weekly** total too, not just the block.

**The measured fact that drives every rule below:** in a real heavy block, ~94% of tokens consumed were
**input + cache-writes**, not output (output was 6%). Context is re-sent and re-cached every turn, so
**context size is a tax paid on every subsequent turn** — cost ≈ context size × number of turns. A 5k
raw dump at turn 10 does not cost 5k; it costs 5k *again* on every turn after it.

Rules, in order of measured impact:
1. **Never let bulk output into context.** Filter at the source (`grep`, `jq`, `node -e`, `--stat`,
   `head`). No raw HTML, full JSON payloads, build logs, or whole large files. Read file *slices*
   (`offset`/`limit`); whole-file reads are for files being edited.
2. **Collapse turns.** Every turn re-reads and re-writes the whole context. Batch independent tool
   calls into one message. Don't re-probe what's already proven; don't re-read what was just written.
3. **Delegate bulk reading to scoped subagents.** A subagent's context is discarded — only its final
   message returns — so delegating bulky reading is *cheaper* than inlining, which gets taxed forever.
   Standing permission; never ask. But throttle their **input** (`--stat`/grep first, full material only
   where warranted) and put mechanical work on `sonnet`/`haiku`, reserving `opus` for judgment.
4. **Prefer a fresh session over a bloated one.** Accumulated context is the biggest multiplier.
   Checkpoint state to a file at natural boundaries and start clean.

**Thresholds** — a `[token-budget]` line is injected each turn on David's machine; obey it:
- **OK (<60%)** — work normally.
- **CAUTION (≥60%)** — throttle now (batch, filter harder, delegate bulk reads) and say so out loud.
- **CRITICAL (≥85%)** — stop expanding scope, checkpoint, recommend a fresh session. Never silently
  push through a red budget to "just finish" — that is exactly how the window gets burned.

**Ask before the window-killers:** multi-agent Workflows, `ultracode`, fan-outs beyond ~3 agents,
whole-repo sweeps, exhaustive audits. State the projected cost and let David decide knowingly.

**Unattended / scheduled runs:** self-limit hard — nobody is there to stop you. If a check stalls or
would blow the budget, note it honestly in the output and move on. An incomplete check reported as
incomplete always beats a burned window.

Full version and monitor (David's machine): `~/.claude/CLAUDE.md` · `node ~/.claude/bin/token-budget.mjs --report`
<!-- END:token-budget-standing-rule -->
