# HotSOS — API & logic phòng

Tài liệu self-contained: đủ để gọi API HotSOS và phân loại trạng thái phòng từ bất kỳ ngôn ngữ nào (Node, browser backend, Go, …). Không phụ thuộc Python hay repo bot.

Múi giờ nghiệp vụ: **Asia/Tokyo (JST)**.

---

## 1. Hằng số & đăng nhập

```
BASE_URL          = https://hk.m-tech.com
APP_BASE          = https://hk.m-tech.com/hotsosmobile_3.0
HOUSEKEEPING_BASE = https://hk.m-tech.com/hotsosmobile_3.0/housekeeping
CLIENT_ID         = F72E6639-CE48-4052-ADF3-D781DC369BF6
REDIRECT_URI      = https%3A%2F%2Fhk.m-tech.com%2Fhotsosmobile_3.0%2Fapp%2FIndex%23%2FexternalLogin%3F
USER_AGENT        = Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```

**Tham số login:** `username`, `password`, `shift` (ca HK, thường `1`).

Cookie session domain: `hk.m-tech.com`. Nên cache cookies + CSRF trên server (không expose password ra frontend).

### 1.1 Luồng OAuth

1. `GET` `{BASE_URL}/v2/authservice/connect/authorize?response_type=id_token&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid%20permissions&nonce=hotsospy&state=hotsospy`  
   → lấy header `Location` (không follow redirect tự động).
2. `GET` login URL từ Location → parse HTML, lấy mọi input `name`/`value` (hidden fields).
3. `POST` login URL, body JSON: các field form + `Username`, `Password`.  
   Headers: `Content-Type: application/json`, `Accept: application/json`.  
   `allow_redirects: false`.
4. Theo `Location` tối đa 8 bước (`GET`, không follow). Nếu URL chứa `ChangePassword` → lỗi: mật khẩu bắt buộc đổi trên HotSOS.  
   Lấy `id_token` từ URL khi có `id_token=` (fragment `#...` hoặc query).
5. `POST` `{APP_BASE}/rpc/Auth/ExternalLogin`  
   Header: `Authorization: Bearer {id_token}` → JSON `user`.
6. `GET` `{APP_BASE}/rpc/Auth/GetVerificationToken` → `{ "tokenHeaderName", "token" }` (CSRF).
7. `GET` `{APP_BASE}/rpc/Auth/GetAccessToken` → `{ "access_token" }` (ít dùng cho housekeeping; CSRF quan trọng hơn).

### 1.2 Header sau khi login

**PUT/POST JSON housekeeping:**

```
Content-Type: application/json
Accept: application/json
{tokenHeaderName}: {token}
```

**GET khách (không Content-Type):**

```
Accept: application/json
{tokenHeaderName}: {token}
```

### 1.3 Kiểm tra session

`PUT {HOUSEKEEPING_BASE}/HousekeepingSupervisor/GetTotals`  
Body: `{"myRoomsFilter":{"shift":1},"shift":1}`  
→ HTTP 200 = còn sống. Fail → refresh CSRF (bước 6) rồi thử lại; vẫn fail → login lại.

---

## 2. API housekeeping

Base: `{HOUSEKEEPING_BASE}/`

### 2.1 `PUT HousekeepingSupervisor/GetTotals`

```json
{
  "myRoomsFilter": { "shift": 1 },
  "shift": 1
}
```

Lọc tầng — `myRoomsFilter`:

```json
{
  "shift": 1,
  "isFiltered": true,
  "roomRanges": [{ "from": 701, "to": 799 }]
}
```

**Tầng → số phòng:** `from = floor * 100 + 1`, `to = floor * 100 + 99`  
(vd. tầng 7 → 701–799; tầng 7–9 → `from: 701`, `to: 999`).

---

### 2.2 `PUT HousekeepingSupervisor/List` — danh sách phòng

| Key | Mô tả |
|-----|--------|
| `myRoomsFilter` | `null` = mọi tầng; hoặc object có `shift`, `isFiltered: true`, `roomRanges` |
| `listFilter` | `shift`, `orderByRoomNumber: 1`, tùy chọn `reservationStatuses: string[]` |
| `search` | `null` hoặc số phòng (vd. `"1201"`) |

**Tất cả phòng:**

```json
{
  "myRoomsFilter": null,
  "listFilter": { "shift": 1, "orderByRoomNumber": 1 },
  "search": null
}
```

**Due out (nhóm out):**

```json
{
  "myRoomsFilter": {
    "shift": 1,
    "isFiltered": true,
    "roomRanges": [{ "from": 701, "to": 799 }]
  },
  "listFilter": {
    "shift": 1,
    "reservationStatuses": [
      "Due Out",
      "Checked Out",
      "Due In\\Checked Out",
      "Due In\\Out"
    ],
    "orderByRoomNumber": 1
  },
  "search": null
}
```

**Stay Over:** `"reservationStatuses": ["Stay Over"]`  
**Checked In** (lọc kabuse phía client): `"reservationStatuses": ["Checked In"]`  
**Chỉ Checked Out:** `"reservationStatuses": ["Checked Out"]`

**Response:** mảng object phòng (assignment).

---

### 2.3 `GET HousekeepingSupervisor/Filter`

Metadata filter.

### 2.4 `GET HousekeepingSupervisor/RoomFilter`

Metadata lọc phòng.

### 2.5 `GET RoomAssignments/GetGuestsWithPreferences`

```
GET .../RoomAssignments/GetGuestsWithPreferences?assignmentId={id}&shift={shift}
```

**Response:** mảng guest — mỗi phần tử có `adultsCount`, `childrenCount`, `reservationStatus`, …

Cần `assignmentId` từ object phòng.

---

## 3. Object phòng (từ `List`)

| Field | Ví dụ | Ý nghĩa |
|-------|--------|---------|
| `displayRoomNumber` | `"702"`, `"1201"` | Số phòng |
| `assignmentId` | số | Gọi GetGuestsWithPreferences |
| `reservationStatus` | string | Trạng thái đặt phòng |
| `assignStatus` | string | Giao việc HK |
| `cleanStatus` | `dirty` / `clean` / `inspected` / `pickup` | Tiến độ dọn |
| `cleanTaskName` | string | Tên task |
| `cleanTaskId` | `1` = Out Clean, `5` = Stay Linen | |
| `arrivalDate` | ISO hoặc `{ "_i": "..." }` | |
| `departureDate` | tương tự | 10 ký tự đầu = `YYYY-MM-DD` |
| `customerName` | string | Tên khách |
| `credits` | number | Credits HK |

**Tầng từ số phòng:** bỏ ký tự không phải số, rồi `floor = parseInt(digits) / 100` (integer).  
vd. `"702"` → 7, `"1201"` → 12.

**Ví dụ:**

```json
{
  "displayRoomNumber": "702",
  "assignmentId": 12345,
  "reservationStatus": "Due Out",
  "assignStatus": "Assigned",
  "cleanStatus": "dirty",
  "cleanTaskName": "Out Clean アウトメイク",
  "cleanTaskId": 1,
  "arrivalDate": "2026-07-14T15:00:00",
  "departureDate": "2026-07-16T11:00:00"
}
```

---

## 4. Logic trạng thái phòng

### 4.1 `reservationStatus`

| Giá trị | Ý nghĩa |
|---------|---------|
| `Due Out` | Checkout hôm nay, khách **chưa** out |
| `Checked Out` | Khách đã rời (out thuần) |
| `Due In\Checked Out` | Out/in — khách cũ đã rời, có khách in |
| `Due In\Out` | Cùng nhóm due out, chưa out |
| `Stay Over` | Ở tiếp |
| `Checked In` | Đang ở — + Out Clean task → **kabuse** |

**Nhóm due out (filter API):**  
`Due Out`, `Checked Out`, `Due In\Checked Out`, `Due In\Out`

**Chờ out (client):** `Due Out`, `Due In\Out`

### 4.2 Đã out — `classifyOutDone(room)`

| Return | Điều kiện |
|--------|-----------|
| `"out"` | `reservationStatus === "Checked Out"` |
| `"out_in"` | `reservationStatus === "Due In\\Checked Out"` |
| `null` | còn lại |

### 4.3 `cleanStatus`

| Giá trị | Ý nghĩa |
|---------|---------|
| `dirty` | Chưa dọn |
| `clean`, `inspected` | Đã dọn |
| `pickup` | Đã dọn hôm trước, chưa có khách vào |

```
isCleaned  = cleanStatus ∈ { "clean", "inspected" }   (so sánh lower-case)
isDirty    = cleanStatus === "dirty"
isPickup   = cleanStatus === "pickup"
```

### 4.4 Kabuse — `isKabuse(room)`

```
reservationStatus === "Checked In"
AND (cleanTaskId === 1 OR cleanTaskName chứa "Out Clean"
     OR cleanTaskName === "Out Clean アウトメイク")
```

### 4.5 Thay giường — `isLinen(room)`

```
reservationStatus === "Stay Over"
AND (cleanTaskId === 5 OR cleanTaskName === "Stay Make Linen リネン交換")
```

### 4.6 Số khách (pax)

Gọi `GetGuestsWithPreferences`. Lọc guest theo `reservationStatus` của **phòng**:

| Trạng thái phòng | Guest records dùng |
|------------------|-------------------|
| `Due In\Checked Out` | chỉ guest có `reservationStatus === "Due In"` |
| `Checked Out` | chỉ `"Checked Out"` |
| `Due Out` | `"Due Out"` hoặc `"Checked Out"` |
| khác | loại guest `"Checked Out"` |

Gộp `adultsCount` / `childrenCount` từ các record đã lọc:

1. 0 record → `(0, 0)`
2. 1 record → lấy adults/children của record đó
3. Nhiều record cùng `(adults, children)` và (adults > 1 hoặc children > 0) → lấy một lần (không nhân)
4. Mỗi record đều `(1, 0)` → adults = số record, children = 0
5. Còn lại → cộng adults, cộng children

Format hiển thị: `2👤 1👶` (chỉ hiện phần > 0).

Khách **in** riêng (out/in): lọc guest `reservationStatus === "Due In"` rồi gộp như trên.

### 4.7 `departureDate`

Nếu object: lấy `_i` hoặc `departureDate`.  
Chuỗi → 10 ký tự đầu = `YYYY-MM-DD`.  
So sánh ngày: `normalize(date).replace("/", "-").slice(0, 10)`.

---

## 5. Cách lấy từng nhóm phòng

```
# Tất cả phòng tầng 7–9
List với myRoomsFilter roomRanges 701–999

# Due out
List với reservationStatuses = nhóm due out

# Stay
List với reservationStatuses = ["Stay Over"]

# Kabuse
List Checked In → filter isKabuse

# Pickup
List (tầng) → filter isPickup

# Linen
stayAll → filter isLinen
stay thường = stayAll − linen

# Thống kê out đã / chưa  (KHÔNG dùng departureDate)
outRooms = due out list
outDone  = classifyOutDone(room) !== null
outPending = còn lại

# Departure theo ngày
List (tầng) → filter parseDepartureDate(room) === "YYYY-MM-DD"
(out_only: chỉ lấy due out list rồi filter ngày)

# Tra cứu
List search="1201" → khớp exact displayRoomNumber → GetGuestsWithPreferences
```

**Thống kê tổng:**

```
out_total   = len(outRooms)
out_done    = count(classifyOutDone !== null)
out_pending = out_total - out_done
stay        = len(stayAll) - len(linen)
linen       = count(isLinen in stayAll)
pickup      = count(isPickup)
kabuse      = count(isKabuse)
```

---

## 6. `tileState` — một phòng → một trạng thái UI

`classifyRoomTile(room)` — **ưu tiên cao → thấp:**

1. `pickup` — `isPickup`
2. `kabuse` — `isKabuse`
3. `out_pending` — `Due Out` / `Due In\Out`
4. `out_done_clean` / `out_done_dirty` — `Checked Out`
5. `out_in_clean` / `out_in_dirty` — `Due In\Checked Out`
6. `linen_clean` / `linen` — Stay Over + linen
7. `stay_clean` / `stay_dirty` / `stay` — Stay Over
8. `other`

| `tileState` | Điều kiện |
|-------------|-----------|
| `out_pending` | Due Out / Due In\\Out |
| `out_done_dirty` | Checked Out + dirty |
| `out_done_clean` | Checked Out + clean/inspected |
| `out_in_dirty` | Due In\\Checked Out + dirty |
| `out_in_clean` | Due In\\Checked Out + clean/inspected |
| `stay` | Stay Over, không linen, cleanStatus khác dirty/clean |
| `stay_dirty` | Stay Over + dirty |
| `stay_clean` | Stay Over + clean/inspected |
| `linen` | Stay Over + linen + chưa clean |
| `linen_clean` | Stay Over + linen + clean/inspected |
| `kabuse` | Checked In + Out Clean |
| `pickup` | cleanStatus pickup |
| `other` | còn lại |

**Nhãn gợi ý:**

| tileState | label |
|-----------|--------|
| `out_pending` | Out · chờ khách rời |
| `out_done_dirty` | Out · chưa dọn |
| `out_done_clean` | Out · đã dọn xong |
| `out_in_dirty` | Out/In · chưa dọn |
| `out_in_clean` | Out/In · sẵn sàng |
| `stay` | Stay |
| `stay_dirty` | Stay · chưa dọn |
| `stay_clean` | Stay · đã dọn |
| `linen` | Thay giường · chưa dọn |
| `linen_clean` | Thay giường · xong |
| `kabuse` | Kabuse |
| `pickup` | Pickup |
| `other` | Khác |

---

## 7. Pseudocode — logic phòng

```
function classifyOutDone(room):
  if room.reservationStatus == "Checked Out": return "out"
  if room.reservationStatus == "Due In\\Checked Out": return "out_in"
  return null

function isCleaned(room):
  return lower(room.cleanStatus) in {"clean", "inspected"}

function isDirty(room):
  return lower(room.cleanStatus) == "dirty"

function isPickup(room):
  return lower(room.cleanStatus) == "pickup"

function isOutCleanTask(room):
  return room.cleanTaskId == 1
      or room.cleanTaskName == "Out Clean アウトメイク"
      or "Out Clean" in room.cleanTaskName

function isKabuse(room):
  return room.reservationStatus == "Checked In" and isOutCleanTask(room)

function isLinen(room):
  return room.cleanTaskId == 5
      or room.cleanTaskName == "Stay Make Linen リネン交換"
  // thường kèm Stay Over khi lọc nhóm stay

function floorsToRoomRange(floorFrom, floorTo):
  if floorFrom > floorTo: swap
  return { from: floorFrom * 100 + 1, to: floorTo * 100 + 99 }

function roomFloor(roomNumber):
  digits = stripNonDigits(roomNumber)
  if empty: return null
  return int(digits) // 100

function parseDepartureDate(room):
  raw = room.departureDate
  if raw is object: raw = raw._i or raw.departureDate
  if not string: return null
  return raw[0:10]

function classifyRoomTile(room):
  if isPickup(room): return "pickup"
  if isKabuse(room): return "kabuse"
  status = trim(room.reservationStatus)
  outCat = classifyOutDone(room)
  if status in {"Due Out", "Due In\\Out"}: return "out_pending"
  if outCat == "out": return isCleaned(room) ? "out_done_clean" : "out_done_dirty"
  if outCat == "out_in": return isCleaned(room) ? "out_in_clean" : "out_in_dirty"
  if status == "Stay Over":
    if isLinen(room): return isCleaned(room) ? "linen_clean" : "linen"
    if isCleaned(room): return "stay_clean"
    if isDirty(room): return "stay_dirty"
    return "stay"
  return "other"

function paxPairFromRecords(records):
  if empty: return (0, 0)
  counts = [(max(0, adultsCount), max(0, childrenCount)) for each]
  if len == 1: return counts[0]
  if all same and (adults > 1 or children > 0): return counts[0]
  if all are (1, 0): return (len(counts), 0)
  return (sum adults, sum children)

function activeGuestRecords(guests, room):
  status = room.reservationStatus
  if status == "Due In\\Checked Out":
    return guests where guest.reservationStatus == "Due In"
  if status == "Checked Out":
    return guests where guest.reservationStatus == "Checked Out"
  if status == "Due Out":
    return guests where guest.reservationStatus in {"Due Out", "Checked Out"}
  return guests where guest.reservationStatus != "Checked Out"

function assignmentGuestCounts(guests, room):
  return paxPairFromRecords(activeGuestRecords(guests, room))
```

---

## 8. Lưu ý kỹ thuật

1. **CSRF + cookie** phải gửi kèm mọi request housekeeping sau login.
2. Chuỗi `Due In\Checked Out` trong JSON/API là một backslash: `"Due In\\Checked Out"` trong literal code.
3. Mỗi phòng lấy pax = +1 request `GetGuestsWithPreferences` — nên lazy / batch / cache.
4. `shift` phải khớp ca đang mở trên HotSOS Mobile.
5. Credential HotSOS chỉ ở server-side; frontend không gọi HotSOS trực tiếp nếu tránh CORS/leak.
6. Session file/cookie cache không chia sẻ nhiều máy cùng lúc dễ bị invalid.
