# Task BE-048: Check API readiness

**Endpoint**: `GET /api/health`

**Owner**: Member 1 · **Priority**: Must (operational) · **Requirement**: Deployment readiness

**Dependencies**: BE-001. Dependencies describe contracts and integration order; use fixtures to begin development before the corresponding endpoint is complete.

## 1. API Documentation

- **Method**: `GET`
- **URL**: `/api/health`
- **Access**: Public
- **Authentication**: `None`
- **Content-Type**: `application/json`

### Request body

None. Do not send a JSON body.

### Success response (200)

```json
{
  "status": "success",
  "message": "Check API readiness successful",
  "data": {
    "service": "abe-garage-api",
    "ready": true
  }
}
```

Examples use representative fixture records. Responses may have more/fewer array elements; fields and types are contractual. Nullable fields remain present as null. Where a task documents a restricted role projection, that projection replaces the general example for that role.

### Errors

- 400 Invalid input (unless this task specifies a different public-token rule)
- 503 Service unavailable
- 500 Unexpected server error

Shared error format (field errors apply to validation failures):

```json
{
  "status": "error",
  "message": "Validation failed",
  "data": {
    "errors": {
      "email": "Enter a valid email address"
    }
  }
}
```

Non-validation errors use `data: null`, except explicitly documented safe metadata. See [shared conventions](../CONVENTIONS.md).

## 2. Instructions

1. Define route and middleware in `backend/src/api/setup/routes/setup.route.js`.
2. Add `healthValidation` in `backend/src/api/setup/validations/setup.validation.js`.
3. Implement `healthController` in `backend/src/api/setup/controller/setup.controller.js`. Extract allowlisted inputs and verified actor context only.
4. Implement `healthService` in `backend/src/api/setup/service/setup.service.js`. Keep business rules and SQL out of controllers.
5. Share transactions, money/status helpers and notification adapter as described in foundation tasks; do not duplicate other modules’ logic.
6. On errors call `next(error)` from controller catches or use the shared async wrapper. Do not send competing error formats.

## 3. Logic & Git Instructions

### Logic steps

1. Check database connectivity with a short timeout and initialized schema marker. Return200 only when application is ready; otherwise503 with generic Service unavailable and data {ready:false}.
2. Do not expose database hostname,password,SQL,environment or stack trace. Public monitoring response is minimal.

### Git workflow

```bash
git checkout dev
git pull --ff-only origin dev
git checkout -b codex/be-048-health
# Implement and run task-specific checks
git add <changed-files>
git commit -m "[BE-048] Check API readiness"
git push -u origin codex/be-048-health
```

Open a PR into dev with requirement IDs, examples and test evidence. One teammate reviews. Coordinate shared route registration through Member 1; module files belong to their listed owner.

### PR checklist and acceptance criteria

- [ ] Successful request returns 200 and exactly the documented safe response shape.
- [ ] Works without staff login; applies documented rate limits and public-field restrictions.
- [ ] Verify 503 Service unavailable.
- [ ] Invalid/unknown input fields are rejected; no unexpected database changes occur on failure.
- [ ] GET has no data-changing side effects; list pagination/counts stay consistent.
- [ ] All errors go through centralized error middleware; no sensitive fields or stack traces escape.

## 4. Logic Diagram

```mermaid
flowchart TD
    A["GET /api/health"] --> B["Validate public request and apply rate limits"]
    B --> C["Validate allowed input"]
    C --> D["Read records and apply safe projection"]
    D --> E["Return 200 documented response"]
    B -. Failure .-> F["Centralized error middleware"]
    C -. Failure .-> F
    D -. Failure .-> F
```
