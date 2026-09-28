# vylos-ui

<!-- BEGIN:model-routing-standing-rule -->
## Model routing (David, 2026-08-21 — standing rule, every project)

Before starting any request or task set, decide the best Claude model for each part and say
the plan in one line: **Fable** = judgment-heavy (design, verification, tricky debugging,
anything David reviews directly); **Opus** = long autonomous grinds; **Sonnet** = mechanical
bulk; **Haiku** = trivial checks. Then execute automatically: route every subagent/sweep/
background job to its planned model as the task shape changes (standing permission, never
ask — just say which model took which part). The MAIN session's model cannot be switched by
Claude: when the work ahead no longer fits it, say "Switch me to [model] now" with one line of
why, and keep working at reduced burn until David switches or declines; handoff files must
name the model the next session starts on. All other rules (budget rails, deploy economy,
verification, honesty) still bind — model routing never overrides them.
<!-- END:model-routing-standing-rule -->


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

<!-- BEGIN:context-mechanics-standing-rule -->
## Context mechanics — cache & injection hygiene (standing rule, every project, 2026-09-21)

Complementary to the token-budget rule in this file: that one paces spend against the 5-hour/
weekly window; this one reduces what gets injected into context per turn, which is what the
budget rule is pacing against.

1. A user-level PreToolUse Bash output filter is expected (pipe verbose install/build/test output
   through a `FAIL|ERROR|error:` filter before it's cached). If `/hooks` shows none, say so before
   running a verbose command. Never install or edit the hook script without David reviewing it
   line-by-line first — it changes tool-call behavior. Always check exit status; never infer
   success from empty filtered output.
2. MCP tool deferral (Claude Code default) already keeps unused tool schemas out of context.
   Confirm deferral is active before removing any MCP server for token reasons — a custom
   `ANTHROPIC_BASE_URL`, `ENABLE_TOOL_SEARCH=false`, or an `alwaysLoad` server setting can disable
   it; a plain `ANTHROPIC_AUTH_TOKEN` does not.
3. Subagents inherit the session's model unless told otherwise (per-call param → agent frontmatter
   `model:` → `CLAUDE_CODE_SUBAGENT_MODEL` → inherit). Pass the model on every spawn per the
   model-routing rule above; any `.claude/agents/*.md` file should pin `model:` in frontmatter.
   Each subagent also gets its own fresh, short-TTL cache — that's the actual cost of an
   unnecessary one, not just the model choice.
4. For anything recurring at an interval longer than the prompt-cache TTL (confirm billing mode —
   1h on subscription-within-plan, 5min otherwise), use a fresh-session scheduled task
   (Cowork/Desktop/`create_trigger`) rather than an in-session `/loop` or local `CronCreate` — a
   loop resends full context every fire and a stale one just burns cache misses. Cancel forgotten
   loops; don't shorten their interval to "beat" the TTL.

Token-waste audit prompt + full findings: `docs/claude-playbook/transcripts/2026-09-21_sharbel-token-audit-review.md`.
<!-- END:context-mechanics-standing-rule -->

# Cowork bridge: always on, David out of the loop (David, 2026-09-25, standing rule, all projects)
Claude Code and Cowork work as ONE team on every Vylos/David project and talk to each other directly
through `~/Desktop/Vylos/desktop-docs/COWORK-BRIDGE/`, without routing through David:
`TO-COWORK.md` (Claude Code to Cowork) and `TO-CLAUDE-CODE.md` (Cowork to Claude Code).
Append only, never rewrite or delete an entry.
- Entry header: `## YYYY-MM-DD HH:MM MDT | <sender> | OPEN / INFO / DONE` (time from `date`, never
  guessed), then the ask or result. Results go in files; entries hold paths + one-line summaries.
- **Notify the other side whenever anything new comes up, changes, is added or is finished** (new data,
  a new decision from David, a changed plan, a blocker, a result). Do not wait for David to relay it.
- Read the other side's file at every session start, after every task or batch, and before finishing.
  Act on its OPEN items that fall in your lane without asking David, within the budget and safety rules.
- Claude Code also checks the mailbox on a schedule (Desktop scheduled task `vylos-bridge-check`), so
  new Cowork items get picked up even when no Claude Code session is open.
- Split by strength: Cowork does what needs eyes or David's logged-in browser (videos, paid sites, chart
  reading, desktop files). Claude Code does code, data, backtests, repos, Fable gates and `~/.claude`.
  Each owns the files it creates, never rewrites the other's, never redoes the other's work, and verifies
  what it uses from the other.
- Only David decides: money, purchases, sending messages as David, merges that cost Netlify credits,
  anything irreversible. Either side flags those to David; everything else flows between the two.
- When waiting on the other side inside a session, use a cheap background file watcher
  (`until ls <file>; do sleep 120; done`), never a polling loop that re-sends context.
- Every brief either side writes for the other names this mailbox folder.
