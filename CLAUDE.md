# polaris-ui

<!-- BEGIN:token-budget-standing-rule -->
---

## Token budget — stay inside the 5-hour window (standing rule, every project)

**The goal is availability, not frugality — and availability means never blocked AND never idle.**
Never exhaust the 5-hour usage window; being useful all day beats being maximally thorough once. But
unused capacity **expires worthless** at the block reset — it does not roll over. A window that ends
with budget left over is a window that was wasted, not saved. Downing tools at 85% fails the goal
exactly as badly as burning out at 150%. Watch the rolling **weekly** total too, not just the block.

**Throttling means working SMALLER, never working LESS OFTEN. Do not stop.** A budget rail changes
*how* work is done (cheaper), never *whether* it happens. The rails are self-imposed pacing targets
calibrated from observed history — **not** the server's real cap, which is unpublished and unreadable
from inside a session. The only thing that legitimately halts work is a **real server throttle**, not
a percentage. As of 2026-07-14 no throttle has ever been observed: blocks of 7.43M → 11.71M → 11.93M
each survived un-throttled, so every rail below is inference, not fact.

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
   Checkpoint state to a file at natural boundaries and start clean. This is an argument about *context
   bloat*, which is **separate** from budget — never smuggle it in as a reason to stop working.

**Thresholds** — a `[token-budget]` line is injected each turn on David's machine; obey it. These are
the exact labels it prints, and none of them mean stop:
- **OK (<60%)** — work normally.
- **THROTTLE (≥60%)** — throttle the *shape* of the work, not the amount: batch aggressively, filter
  harder at the source, delegate bulk reads, stop exploratory probing. Say so out loud. **Keep going.**
- **CHEAP-MODE (≥85% of the block)** — keep working, on the cheapest viable path. Checkpoint state to
  disk *as you go* so nothing is lost if the window does close. Don't start a new **large-scope** thing
  without asking (see below) — but absolutely continue the current work, and take on new *small* work.
  **Do not stop. Do not "checkpoint and wait."**
- **WEEK-TIGHT (≥85% of the rolling 7d)** — *this* is the rail that actually protects multi-day
  availability, so it outranks the block rail: the weekly total is what a couple of hours' wait cannot
  recover. Go genuinely conservative — cheaper models, fewer turns. Still not a stop.

**If a rail is exceeded and no throttle occurs, that is DATA, not an emergency.** It means the rail is
too low. Say so, raise `blockBudget` toward the observed-survivable figure, and carry on.

**Ask before the window-killers:** multi-agent Workflows, `ultracode`, fan-outs beyond ~3 agents,
whole-repo sweeps, exhaustive audits. State the projected cost and let David decide knowingly.

**Unattended / scheduled runs:** self-limit hard — nobody is there to stop you. If a check stalls or
would blow the budget, note it honestly in the output and move on. An incomplete check reported as
incomplete always beats a burned window.

Full version and monitor (David's machine): `~/.claude/CLAUDE.md` · `node ~/.claude/bin/token-budget.mjs --report`
<!-- END:token-budget-standing-rule -->
