# REST API Specification

This document provides the complete API specification for the **MarketingSupport (`mtools`)** backend, covering all endpoints discovered during reverse engineering.

---

## 1. Authentication & Session Endpoints

### 1.1 `GET /auth/me`
Retrieves the currently authenticated user's session claims, Authentik groups, internal role, and session expiration timestamp.

- **Headers**: `Cookie: mtools_session=...`
- **Response `200 OK`**:
  ```json
  {
    "authenticated": true,
    "user": {
      "sub": "5364d7c0a525b59e4c20721b32d64d6531c027fa7a4f6b2f9717d7c9f53cbf89",
      "name": "Chandraveer Singh Solanki",
      "email": "chandraveer1601@gmail.com",
      "email_verified": true,
      "groups": [
        "team:TechProducts",
        "team:ResearchAnalysisBureau",
        "org:1",
        "product:omysha-mtools:editor"
      ],
      "role": "editor"
    },
    "expires_at": 1792873831
  }
  ```

### 1.2 `GET /auth/login`
Initiates the OIDC authentication sequence with Authentik.
- **Query Parameters**:
  - `returnTo` *(optional)*: URL path to return to post-login (e.g. `/dashboard/`).
- **Response**: `302 Found` redirecting to `https://signin.omysha.org/application/o/authorize/?...`

### 1.3 `GET /auth/callback`
Receives the authorization code and state from Authentik, exchanges it for tokens, sets the `mtools_session` cookie, and redirects the user back to the application.
- **Query Parameters**:
  - `code`: Authorization code from Authentik.
  - `state`: Anti-forgery state parameter.
- **Response**: `302 Found` redirecting to `returnTo` path.

### 1.4 `GET /auth/logout`
Terminates the session and invalidates the session cookie.
- **Response**: `302 Found` redirecting to login or root.

---

## 2. Permissions & Scope Endpoints

### 2.1 `GET /api/me/permissions`
Returns the capabilities and role allowed for the requesting user.
- **Response `200 OK`**:
  ```json
  {
    "role": "editor",
    "is_admin": false,
    "actions": {
      "draft": true,
      "schedule": true,
      "publish": true,
      "reply": true,
      "delete": true
    },
    "scope": []
  }
  ```

### 2.2 `GET /api/scope/users`
Lists all users and their assigned brand scopes. **Requires admin privileges.**
- **Response `403 Forbidden`** (if not admin):
  ```json
  {
    "error": "You don’t have access to this. Ask an admin to grant you a role."
  }
  ```

### 2.3 `PUT /api/scope/:username`
Updates role and brand access for a specific user. **Admin only.**
- **Body**:
  ```json
  {
    "role": "editor",
    "scope": ["a4g", "gmfer"]
  }
  ```

---

## 3. Brands & Connections Endpoints

### 3.1 `GET /api/brands`
Lists all registered brands, including persona, tone, rules, anti-patterns, and image presets.
- **Response `200 OK`**:
  ```json
  {
    "data": [
      {
        "id": "88177210-3131-4bb8-b639-1147ea497c74",
        "slug": "a4g",
        "name": "A4G",
        "config": {
          "voice": {
            "tone": "Rigorous, inclusive, intellectually warm",
            "persona": "Thought leadership platform for practitioners"
          },
          "channels": ["linkedin_post", "x", "facebook", "instagram"]
        },
        "created_at": "2026-05-02T12:58:48.371Z",
        "updated_at": "2026-05-19T15:27:06.317Z"
      }
    ]
  }
  ```

### 3.2 `POST /api/brands`
Registers a new brand profile.
- **Body**:
  ```json
  {
    "name": "New Initiative",
    "slug": "new-initiative",
    "config": { ... }
  }
  ```

### 3.3 `GET /api/brands/connections`
Returns social media account connection statuses for all brands across supported networks.
- **Response `200 OK`**:
  ```json
  {
    "data": {
      "a4g": [
        { "platform": "linkedin", "status": "not_connected" },
        { "platform": "facebook", "status": "not_connected" },
        { "platform": "instagram", "status": "not_connected" },
        { "platform": "x", "status": "not_connected" },
        { "platform": "reddit", "status": "not_connected" },
        { "platform": "substack", "status": "not_connected" }
      ]
    }
  }
  ```

---

## 4. Campaigns Endpoints

### 4.1 `GET /api/campaigns`
Lists marketing campaigns with pagination and brand filtering.
- **Query Parameters**:
  - `brand_id` *(optional)*: Filter by brand UUID.
  - `status` *(optional)*: Filter by `planned`, `active`, or `completed`.
  - `page` *(default: 1)*: Page number.
  - `limit` *(default: 20)*: Page limit.
- **Response `200 OK`**:
  ```json
  {
    "data": [
      {
        "id": "99fd290f-3b67-4658-b936-cc721d3aa032",
        "brand_id": "313daaac-65c9-41f4-b66a-30fac775e172",
        "brand_name": "A4G Intelex",
        "name": "AI, Work and Society — Essay Contest v1",
        "description": "An open essay contest exploring how artificial intelligence is reshaping work...",
        "status": "planned",
        "starts_at": "2026-05-01T00:00:00.000Z",
        "ends_at": "2026-06-10T00:00:00.000Z",
        "created_at": "2026-05-02T12:58:48.373Z",
        "updated_at": "2026-05-02T12:58:48.373Z"
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 1 }
  }
  ```

### 4.2 `GET /api/campaigns/:id`
Retrieves a single campaign by UUID.

### 4.3 `POST /api/campaigns`
Creates a new campaign.
- **Body**:
  ```json
  {
    "brand_id": "88177210-3131-4bb8-b639-1147ea497c74",
    "name": "Summer Launch 2026",
    "description": "Cross-platform announcement campaign",
    "status": "planned",
    "starts_at": "2026-06-01T00:00:00Z",
    "ends_at": "2026-06-30T00:00:00Z"
  }
  ```

### 4.4 `PUT /api/campaigns/:id`
Updates an existing campaign.

---

## 5. Content Management Endpoints

### 5.1 `GET /api/content`
Lists content items with pagination and multiple filters.
- **Query Parameters**:
  - `brand_id`: Brand UUID filter.
  - `stage`: `draft`, `scheduled`, or `published`.
  - `channel`: Platform filter.
  - `campaign_id`: Campaign UUID filter.
  - `page`: Page index.
  - `limit`: Items per page.
- **Response `200 OK`**:
  ```json
  {
    "data": [
      {
        "id": "087e4e43-e660-4110-ab4c-6e5b306b75d8",
        "brand_id": "88177210-3131-4bb8-b639-1147ea497c74",
        "brand_name": "A4G",
        "campaign_id": null,
        "title": "test encrypt post 1",
        "body": "test encrypt post 1",
        "stage": "published",
        "stage_label": "Published",
        "channel": "facebook",
        "scheduled_at": null,
        "created_at": "2026-07-23T06:48:44.910Z",
        "updated_at": "2026-07-23T06:49:15.566Z",
        "platforms": ["facebook", "instagram"],
        "has_image": true
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 60 }
  }
  ```

### 5.2 `GET /api/content/:id`
Retrieves detailed information for a single content item, including audit publishing logs.
- **Response `200 OK`**:
  ```json
  {
    "id": "087e4e43-e660-4110-ab4c-6e5b306b75d8",
    "brand_id": "88177210-3131-4bb8-b639-1147ea497c74",
    "brand_name": "A4G",
    "campaign_id": null,
    "title": "test encrypt post 1",
    "body": "test encrypt post 1",
    "metadata": {},
    "stage": "published",
    "stage_label": "Published",
    "channel": "facebook",
    "scheduled_at": null,
    "purpose": "visibility",
    "payment": "organic",
    "created_by": "Mohammad Shahjad",
    "updated_by": null,
    "published_by": "Mohammad Shahjad",
    "created_at": "2026-07-23T06:48:44.910Z",
    "updated_at": "2026-07-23T06:49:15.566Z",
    "publishing_logs": [
      {
        "id": "ef33d541-5ac0-42f9-8f30-6b09a01f1a45",
        "status": "published",
        "external_id": "18385820998161590",
        "published_at": "2026-07-23T06:49:15.565721+00:00"
      }
    ]
  }
  ```

### 5.3 `POST /api/content`
Creates a new content item.
- **Body**:
  ```json
  {
    "brand_id": "88177210-3131-4bb8-b639-1147ea497c74",
    "campaign_id": null,
    "title": "Post Title",
    "body": "Post body content...",
    "channel": "x",
    "purpose": "visibility",
    "payment": "organic"
  }
  ```

### 5.4 `PUT /api/content/:id`
Updates content fields (title, body, channel, etc.).

### 5.5 `DELETE /api/content/:id`
Deletes a content item and cascades deletions to targets and logs.

### 5.6 `PUT /api/content/:id/stage`
Transitions a content item between editorial stages (`draft`, `scheduled`, `published`).
- **Body**:
  ```json
  {
    "stage": "scheduled"
  }
  ```

### 5.7 `POST /api/content/import-by-link`
Scrapes an existing social media post (X status, Instagram post, Facebook post) and creates a draft content record.
- **Body**:
  ```json
  {
    "url": "https://x.com/A4GCollab/status/1911460353008877814",
    "brand_id": "88177210-3131-4bb8-b639-1147ea497c74"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "id": "83d2ef5d-8987-42c9-a932-21295076c738",
    "title": "Imported x post",
    "body": "Post text scraped from tweet...",
    "stage": "draft"
  }
  ```

### 5.8 `GET /api/content/:id/image`
Streams the primary image associated with the content item.

---

## 6. Publishing Targets Endpoints

### 6.1 `GET /api/content/:id/targets`
Returns all platform-specific delivery targets for a content item.
- **Response `200 OK`**:
  ```json
  [
    {
      "id": "4680bdba-3399-4745-a57a-1f94efacc1f8",
      "content_item_id": "087e4e43-e660-4110-ab4c-6e5b306b75d8",
      "brand_id": "88177210-3131-4bb8-b639-1147ea497c74",
      "brand_name": "A4G",
      "channel_id": "8bc1d690-5a25-43a6-8b04-d14b2c653e80",
      "platform": "facebook",
      "variant_text": "test encrypt post 1",
      "scheduled_at": null,
      "status": "published",
      "external_id": "1161727453680961_122109513609320476",
      "permalink": "https://www.facebook.com/1161727453680961_122109513609320476",
      "published_at": null,
      "metrics": {},
      "platform_options": {
        "image_url": "/tmp/mtools-uploads/b8198232-3cc0-4c08-9f0b-d87f2349a998.png"
      },
      "deleted_from_platform_at": "2026-07-23T06:50:05.601Z",
      "deleted_by": "Mohammad Shahjad"
    }
  ]
  ```

### 6.2 `PATCH /api/content/:id/targets/:target_id`
Updates a target's tailored copy or scheduled time.
- **Body**:
  ```json
  {
    "variant_text": "Tailored copy for LinkedIn...",
    "scheduled_at": "2026-08-01T10:00:00Z"
  }
  ```

### 6.3 `POST /api/content/:id/targets/:target_id/image`
Uploads a platform-specific image (e.g. cropped for LinkedIn 1:1 vs X 16:9).
- **Content-Type**: `multipart/form-data`
- **Body**: Binary file in field `image`

### 6.4 `POST /api/content/:id/publish-targets`
Immediately publishes selected targets to their external social networks.
- **Body**:
  ```json
  {
    "target_ids": ["4680bdba-3399-4745-a57a-1f94efacc1f8"]
  }
  ```

### 6.5 `POST /api/content/:id/schedule-targets`
Schedules delivery for selected targets.
- **Body**:
  ```json
  {
    "targets": [
      {
        "id": "4680bdba-3399-4745-a57a-1f94efacc1f8",
        "scheduled_at": "2026-08-01T15:00:00Z"
      }
    ]
  }
  ```

### 6.6 `DELETE /api/content/:id/targets/:target_id/platform`
Removes a published post from the remote platform (e.g. calls X API `DELETE /2/tweets/:id` or Meta Graph API `DELETE /{post-id}`).
- **Response `200 OK`**:
  ```json
  {
    "deleted": true,
    "external_id": "2078117478803427529"
  }
  ```

### 6.7 `GET /api/content/:id/substack-export`
Generates formatted markdown and metadata for manual Substack newsletter publication.
- **Response `200 OK`**:
  ```json
  {
    "text": "test encrypt post 1",
    "image_url": "/api/content/087e4e43-e660-4110-ab4c-6e5b306b75d8/image"
  }
  ```

### 6.8 `POST /api/content/:id/targets/substack/mark-posted`
Attaches the published Substack article URL once manually posted.
- **Body**:
  ```json
  {
    "url": "https://omysha.substack.com/p/my-article"
  }
  ```

---

## 7. Editorial Views: Kanban & Calendar

### 7.1 `GET /api/kanban`
Returns cards formatted for the Kanban board view, grouped by editorial stage (`draft`, `scheduled`, `published`).
- **Query Parameters**:
  - `brand_id`: Brand UUID filter.
- **Response `200 OK`**:
  ```json
  [
    {
      "id": "58b1a4bb-30bf-4da3-ba04-e30de272e312",
      "title": "Women make up about 22% of the global AI workforce.",
      "purpose": "visibility",
      "payment": "organic",
      "created_by": "K. Rubeena",
      "brand_id": "88177210-3131-4bb8-b639-1147ea497c74",
      "brand_name": "A4G",
      "brand_slug": "a4g",
      "stage": "draft",
      "stage_label": "Draft",
      "targets": [
        {
          "id": "7108940a-2082-48b2-a55c-ec205cdb5bdc",
          "platform": "facebook",
          "status": "draft"
        }
      ]
    }
  ]
  ```

### 7.2 `GET /api/calendar`
Returns calendar events for scheduled and published posts across a date range.
- **Query Parameters**:
  - `start`: ISO date `YYYY-MM-DD`.
  - `end`: ISO date `YYYY-MM-DD`.
  - `brand_id` *(optional)*: Brand filter.

---

## 8. Engagement Inbox Endpoints

### 8.1 `GET /api/engagement/inbox`
Fetches recent comments and interactions across social channels.
- **Query Parameters**:
  - `brand_id`: Filter by brand.
  - `campaign_id`: Filter by campaign.
- **Response `200 OK`**:
  ```json
  {
    "comments": [],
    "error": null
  }
  ```

### 8.2 `POST /api/engagement/reply`
Posts a comment reply directly to the originating platform.
- **Body**:
  ```json
  {
    "target_id": "4680bdba-3399-4745-a57a-1f94efacc1f8",
    "comment_id": "122105882241320476_1388793936470317",
    "message": "❤️",
    "approved": true
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "in_reply_to": "122105882241320476_1388793936470317"
  }
  ```

---

## 9. Analytics & Audit Endpoints

### 9.1 `GET /api/analytics/past-posts`
Returns published post metrics sorted by engagement or date.
- **Query Parameters**:
  - `sort_by`: `engagement` or `date`.
  - `sort_dir`: `asc` or `desc`.
  - `limit`: Number of posts.

### 9.2 `GET /api/analytics/rollups`
Calculates aggregated engagement totals and averages grouped by brand and platform.
- **Response `200 OK`**:
  ```json
  {
    "buckets": [
      {
        "key": { "brand": "a4g" },
        "post_count": 13,
        "engagement_total": 29,
        "engagement_avg": 9.67
      }
    ],
    "count": 8
  }
  ```

### 9.3 `GET /api/publishing-log`
Returns the immutable audit log of publishing actions, deletions, errors, and imports.
- **Query Parameters**:
  - `brand_id`: Filter by brand.
- **Response `200 OK`**:
  ```json
  {
    "entries": [
      {
        "id": "e649fbf7-092a-4e3a-8219-3410764c07e5",
        "status": "deleted_from_platform",
        "external_id": "1161727453680961_122109513609320476",
        "created_at": "2026-07-23T06:50:05.603Z",
        "published_at": null,
        "created_by": "Mohammad Shahjad",
        "response": { "deleted": true, "raw_response": { "success": true } },
        "content_id": "087e4e43-e660-4110-ab4c-6e5b306b75d8",
        "content_title": "test encrypt post 1",
        "brand_name": "A4G",
        "platform": "facebook"
      }
    ],
    "limit": 100,
    "offset": 0
  }
  ```
