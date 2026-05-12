# RYVA Security Specification

## Data Invariants
1. A **User** profile is immutable once created, except for `wishlist`, `displayName`, and `savedAddresses`.
2. A **Product** can only be created, updated, or deleted by an `admin`.
3. An **Order** must have a valid `userId` matching the authenticated user.
4. An **Order**'s `items` must be an array of valid RYVA products.
5. `total` in **Order** must match the sum of item prices.

## Identity, Integrity, and State Payloads (Dirty Dozen)
1. Creating a product as a non-admin user.
2. Updating a product's price as a customer.
3. Reading another user's order history.
4. Creating an order for another user ID.
5. Deleting a product as an anonymous user.
6. Injecting a 1MB string into a `name` field of a product.
7. Spoofing `createdAt` to be in the future.
8. Updating a user's `role` to `admin` via the client.
9. Modifying an order after it has been `shipped`.
10. Listing the `users` collection without admin privileges.
11. Reading an order without being the owner or an admin.
12. Bulk-reading user PII (emails, addresses).

## Evaluation Matrix

| Collection | Identity Spoofing | State Shortcutting | Resource Poisoning | PII Protection |
|------------|-------------------|--------------------|--------------------|----------------|
| users      | Blocked (isOwner) | Blocked (Role Lock)| Validated (Type/Size)| Isolated (Owner only)|
| products   | Blocked (isAdmin) | Blocked (Admin only)| Validated (Type/Size)| N/A (Public) |
| orders     | Blocked (matchUid)| Blocked (Status lock)| Validated (Type/Size)| Owner/Admin only |
