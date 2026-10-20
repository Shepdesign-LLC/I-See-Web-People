# Security Specification & Test Definitions

## 1. Data Invariants
- **Seance Entries (`/seance_entries/{entryId}`)**:
  - Publicly readable to browse the field ledger.
  - Can only be created by an authenticated user (`request.auth != null`) where `authorId == request.auth.uid`.
  - Document IDs must conform to `^[a-zA-Z0-9_-]+$` with length $\le 128$.
  - Required fields: `spiritNumber`, `title`, `clientAlias`, `status`, `authorId`.
  - String sizes must be bounded (`title <= 140`, `notes <= 1000`).
  - Terminal state locking: Updates are restricted to author or admin (`ryan@shepdesign.com`), and immutable fields (`authorId`, `spiritNumber`) cannot be modified.

- **Inquiries (`/inquiries/{inquiryId}`)**:
  - Anyone can create an inquiry to summon shepdesign, but payload must have validated shape: `name`, `email`, `notes`, `status == 'summoned'`.
  - Read access is restricted to the sender (`resource.data.senderId == request.auth.uid`) or the administrator (`request.auth.token.email == 'ryan@shepdesign.com'`).
  - Strict key checks to prevent arbitrary payload poisoning.

- **User Profiles (`/users/{userId}`)**:
  - A user can only write to `/users/{userId}` where `userId == request.auth.uid`.
  - Users cannot escalate their own role to 'admin'; default role must be 'visitor' or 'keeper'.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Seance Create**: `{ title: 'Ghost', authorId: 'anon' }` without `request.auth` -> `PERMISSION_DENIED`.
2. **Author Identity Spoofing**: User `uid_alice` creates seance entry with `authorId: 'uid_bob'` -> `PERMISSION_DENIED`.
3. **Ghost Field Injection (Shadow Field Attack)**: Creating seance entry with unapproved field `{ isSuperAdmin: true }` -> `PERMISSION_DENIED`.
4. **Giant String Buffer Poisoning**: Seance entry `title` of length 5,000 characters -> `PERMISSION_DENIED`.
5. **Path ID Injection**: Document ID `../../evil_root` or with special symbols -> `PERMISSION_DENIED`.
6. **Inquiry PII Snooping**: User `uid_alice` attempting to `get()` an inquiry submitted by `uid_bob` -> `PERMISSION_DENIED`.
7. **Privilege Escalation on User Profile**: User setting `role: 'admin'` on `/users/{uid}` -> `PERMISSION_DENIED`.
8. **Immutability Breach on Update**: Changing `spiritNumber` or `authorId` on an existing seance entry -> `PERMISSION_DENIED`.
9. **Status Outcome Tampering**: Modifying terminal state from non-admin account -> `PERMISSION_DENIED`.
10. **Inquiry Status Forgery**: Creating inquiry with `status: 'reviewed'` instead of `'summoned'` -> `PERMISSION_DENIED`.
11. **Blanket Query Scraping**: Non-admin querying all `/inquiries` without filtering by `senderId` -> `PERMISSION_DENIED`.
12. **Malformed Coordinates**: Providing non-number coordinates for radar -> `PERMISSION_DENIED`.

## 3. Test Runner Invariant
All 12 dirty payloads are rejected by rules before relational read or storage.
