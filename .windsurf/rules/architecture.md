---
trigger: always_on
---

# Feature-Sliced Design Architecture Rules

## CRITICAL PRINCIPLES

1. Organization by ENTITY (not feature): book/, user/, order/
2. Folders created ONLY when files exist (NO empty folders)
3. File names MUST match primary export names
4. Stores MUST be in hooks/ folder (NOT model/)
5. Component folder name MUST match component name
6. **External exports MUST be performed from the root folder of the entity via the `index.ts` file, and exports MUST be named (no `*` re-exports).**
   *(Example: `entities/book/index.ts`, `features/genre/index.ts`)*

## LAYER STRUCTURE

```
app/       - initialization, providers, routing
pages/     - route-level pages
widgets/   - composite blocks
features/  - user interactions
entities/  - business entities
shared/    - reusable infrastructure
```

Import hierarchy (higher can import from lower):

```
pages → widgets → features → entities → shared
```

## ENTITY SLICE STRUCTURE

Standard pattern for any entity (book, user, order, etc.):

```
[layer]/[entity-name]/
  api/                          # Only if API files exist
    hooks/                      # Query hooks
      use[Entity]Query.ts
    mutations/                  # Mutation hooks
      use[Action][Entity]Mutation.ts
    [entity]Api.ts              # API functions
  
  hooks/                        # Only if hooks/stores exist
    use[Entity]Store.ts         # State management
    use[Feature].ts             # Custom hooks
  
  ui/                          # Only if components exist
    [ComponentName]/            # Folder name = component name
      index.ts                  # Exports component
      [ComponentName].tsx       # Implementation
      hooks/                    # Component-specific hooks
        use[Component]Store.ts
      ui/                       # Child components
        [ChildName]/
          index.ts
          [ChildName].tsx
  
  lib/                         # Only if utilities exist
  config/                      # Only if config exists
  index.ts                     # REQUIRED - public API
```

## NAMING CONVENTIONS

### Components

* File: `PascalCase`
* Folder: Must match component name
* Export: Must match file and folder name

Example:

```
ui/BookCard/
  index.ts         # export { BookCard } from './BookCard'
  BookCard.tsx     # export const BookCard = () => {...}
```

### Hooks

* Pattern: `use[Name].ts`
* File name must match hook function name

Example:

```
hooks/useBookData.ts    # export const useBookData = () => {...}
```

### Stores

* Pattern: `use[Entity]Store.ts`
* File name must match store hook name
* Location: MUST be in hooks/ folder

Example:

```
hooks/useBookStore.ts   # export const useBookStore = create(...)
```

### API Files

* Base: `[entity]Api.ts`
* Queries: `use[Entity]Query.ts`
* Mutations: `use[Action][Entity]Mutation.ts`

Examples:

```
api/bookApi.ts
api/hooks/useBookQuery.ts
api/mutations/useCreateBookMutation.ts
```

## IMPORT RULES

CORRECT - through public API:

```typescript
import { BookCard, useBookStore } from '@/entities/book'
import { BookForm } from '@/features/book'
```

INCORRECT - direct internal imports:

```typescript
import { BookCard } from '@/entities/book/ui/BookCard/BookCard'
```

Rules:

* Always import through index.ts (public API)
* Respect layer hierarchy
* No same-level imports (features/book cannot import from features/user)
* shared/ can be imported by any layer
* **External exports MUST be named (no `*` re-exports) and performed from the entity’s root index.ts.**

## COMMON MISTAKES TO AVOID

```
WRONG                           CORRECT
-----                           -------
model/useBookStore.ts      →    hooks/useBookStore.ts
hooks/bookStore.ts         →    hooks/useBookStore.ts
ui/Card/BookCard.tsx       →    ui/BookCard/BookCard.tsx
features/book-form/        →    features/book/
Creating empty folders     →    Create only when files exist
Same-level imports         →    Import only from lower layers
```

## FILE CREATION CHECKLIST

Before creating any file or folder:

1. Is folder name matching component name?
2. Is file name matching primary export name?
3. Is store placed in hooks/ not model/?
4. Is entity organization used (not feature)?
5. Are you creating folder without files? (NO empty folders)
6. Are you using index.ts for exports?
7. Are query and mutation hooks separated?
8. Are you importing through public API?
9. **Are you using named exports from index.ts (no `*` re-exports)?**

## CONCRETE EXAMPLES

### Entity: entities/book/

```
entities/book/
  api/
    hooks/
      useBookQuery.ts          # export const useBookQuery = () => {...}
    bookApi.ts                 # export const getBook = ...
  hooks/
    useBookStore.ts            # export const useBookStore = create(...)
  ui/
    BookCard/
      index.ts                 # export { BookCard } from './BookCard'
      BookCard.tsx             # export const BookCard = () => {...}
      ui/
        BookCover/
          index.ts
          BookCover.tsx
  lib/
    formatBook.ts
  index.ts                     # export { BookCard, useBookStore }
```

### Feature: features/book/

```
features/book/
  api/
    hooks/
      useBooksQuery.ts
    mutations/
      useCreateBookMutation.ts
      useUpdateBookMutation.ts
    bookApi.ts
  hooks/
    useBookFormStore.ts
    useBookValidation.ts
  ui/
    BookForm/
      index.ts
      BookForm.tsx
      hooks/
        useFormStore.ts        # Component-specific store
      ui/
        FormFields/
          index.ts
          FormFields.tsx
  index.ts
```

### Widget: widgets/book/

```
widgets/book/
  ui/
    BookList/
      index.ts
      BookList.tsx
    BookFilters/
      index.ts
      BookFilters.tsx
  hooks/
    useBookListStore.ts
    useBookFilters.ts
  index.ts
```

## DECISION TREE

When creating a new file:

1. Which layer? (pages/widgets/features/entities/shared)

2. Which entity? (book/user/order/etc)

3. What type?

   * Component → ui/[ComponentName]/
   * Hook → hooks/use[Name].ts
   * Store → hooks/use[Entity]Store.ts
   * API → api/[entity]Api.ts
   * Query → api/hooks/use[Entity]Query.ts
   * Mutation → api/mutations/use[Action]Mutation.ts

4. Does folder exist? If NO, create it

5. Match naming: file name = export name

6. Export through index.ts (named export, no `*`)

## KEY PRINCIPLES SUMMARY

ENTITY-FIRST: Organize by domain entities (book, user, order), not by features
NO EMPTY FOLDERS: Create structure only when files are added
NAMING CONSISTENCY: File name must match primary export name
STORES IN HOOKS: Never in separate model/ folder
PUBLIC API: Always export through index.ts
LAYER HIERARCHY: Respect import rules between layers
COMPONENT STRUCTURE: Folder name = component name = file name = export name
**EXPORTS: Must be named (no `*`) and defined in the root `index.ts` of the entity or feature**
