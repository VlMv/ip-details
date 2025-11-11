---
trigger: always_on
---

# Frontend Package Usage Guidelines

## GENERAL PRINCIPLES

1. **Analyze before adding.**
   Before installing any new package, analyze the existing project dependencies.
   Use `package.json`, `pnpm list`, or `npm ls` to check whether similar functionality already exists.

2. **Reuse existing packages.**
   Prefer solutions already present in the project (e.g., UI libraries, utilities, state managers).
   Duplicating libraries or installing overlapping tools is strictly prohibited.

3. **Request approval before installation.**
   If the required functionality is missing:

   * Prepare a short justification (why it’s needed, possible alternatives, and package size).
   * Send a request to the project maintainer or lead developer for **approval**.
   * Only after approval, proceed with installation using the agreed package manager (e.g., `pnpm add package-name`).

4. **Document new dependencies.**
   After installation, document the new package in the project dependency list or internal wiki (purpose, version, usage location).

5. **Avoid unnecessary dependencies.**
   Always consider whether the task can be solved with native browser APIs or existing shared utilities before adding third-party libraries.

## CHECKLIST BEFORE INSTALLING A PACKAGE

1. Is similar functionality already implemented or available in shared/lib?
2. Can this be achieved without a new dependency?
3. Have you checked package popularity, maintenance, and size?
4. Have you received user/maintainer approval to install it?
5. Have you documented the new dependency after installation?