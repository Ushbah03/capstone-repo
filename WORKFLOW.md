# AI-Assisted Workflow Drill Analysis

## 1. Correctness & Edge Cases
- **Round 1 (Vague Prompt):** The initial AI output generated a very simplistic verification model. It used integer-based arithmetic (`frontendWeight + aiWeight !== 100`) which completely fails to account for JavaScript floating-point mathematical inaccuracies (e.g., `0.1 + 0.2 !== 0.3`). Furthermore, values could be manipulated dynamically without layout or validation boundaries.
- **Round 2 (Precise Prompt):** The system implemented an epsilon-based buffer value check (`Math.abs(currentSum - 100) > EPSILON`) to safely evaluate allocation weights. It also introduced immediate boundaries preventing values below 0 or above 100 from triggering incorrect internal state updates.

## 2. Accessibility & Validation
- **Round 1:** The interface relied entirely on generic input tags and native primitive alerts (`alert()`), disrupting screen-reader semantics and degrading user experience.
- **Round 2:** Structural semantic elements with proper `aria-labelledby` and dynamic `aria-describedby` configurations were used. Errors are gracefully rendered inline inside safe container contexts with explicitly designated alert roles.

## 3. Review Effort & Caught AI Deficiencies
During Round 1, the AI assumed a fixed, hardcoded number of exactly two skill vectors, failing to create a modular array pattern that real engineering projects require. Relying on vague commands would require extensive human engineering hours to refactor the entire state model to accept dynamic inputs. Specifying architectural rules in Round 2 kept the file modular, isolated, and readable on the first attempt.