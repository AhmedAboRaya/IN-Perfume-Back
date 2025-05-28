# Aokaze Sushi API Documentation

## 📊 Data Models

### User

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `name` | String | Required | User's full name |
| `email` | String | Required, Unique | User's email address |
| `password` | String | Required, Min length: 6 | Encrypted password |
| `role` | String | Enum: "customer", "admin" | User role |
| `phone` | String | | User's contact number |
| `address` | Object | | User's address information |
| `createdAt` | Date | | Account creation timestamp |
| `resetPasswordToken` | String | | Token for password reset |
| `resetPasswordExpire` | Date | | Expiration date for reset token |
| `twoFactorEnabled` | Boolean | | Whether 2FA is enabled |

### Category

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `name` | String | Required, Unique, 2-50 chars | Category name |
| `description` | String | Max 200 chars | Category description |
| `image` | String | Valid image format | URL to category image |
| `isActive` | Boolean | Default: true | Whether category is active |
| `createdAt` | Date | | Creation timestamp |
| `updatedAt` | Date | | Last update timestamp |

### MenuItem

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `name` | String | Required | Item name |
| `description` | String | Required | Item description |
| `price` | Number | Required | Item price |
| `category` | ObjectId | Required, Ref: "Category" | Reference to category |
| `image` | String | | URL to item image |
| `ingredients` | [String] | | List of ingredients |
| `allergens` | [String] | | List of allergens |
| `ratings` | [String] | | Array of rating objects |
| `spicyLevel` | Number | Range: 0-5 | Spiciness level |
| `isVegetarian` | Boolean | | Whether item is vegetarian |
| `isGlutenFree` | Boolean | | Whether item is gluten-free |
| `isAvailable` | Boolean | | Availability status |
| `isFeatured` | Boolean | | Whether item is featured |
| `ordersCount` | Number | | Number of times ordered |
| `createdAt` | Date | | Creation timestamp |

**Menu Item Ratings**
| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `user` | ObjectId | Required, Ref: "User" | User who rated |
| `rating` | Number | Required, Range: 1-5 | Rating value |
| `comment` | String | Max 500 chars | Optional comment |
| `createdAt` | Date | | Rating timestamp |

### Order

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `orderNumber` | String | Required, Unique | Unique order identifier |
| `customer` | ObjectId | Ref: "User" | Reference to customer |
| `customerDetails` | Object | | Customer information snapshot |
| `items` | Array | | Array of order items |
| `totalPrice` | Number | Required | Total order amount |
| `status` | String | Enum | Current order status |
| `payment` | Object | | Payment details |
| `deliveryAddress` | Object | | Delivery address |
| `deliveryType` | String | Enum: "pickup", "delivery" | Delivery method |
| `deliveryInstructions` | String | | Special delivery instructions |
| `estimatedDeliveryTime` | Date | | Expected delivery time |
| `orderDate` | Date | | Order placement timestamp |

> **Order Status:** "pending", "processing", "completed", "cancelled", "refunded", "delivered"
> 
> **Payment Methods:** "credit_card", "debit_card", "cash", "paypal", "bank_transfer"
> 
> **Payment Status:** "pending", "completed", "failed", "refunded"

### Cart and CartItem

| Model | Field | Type | Constraints | Description |
|-------|-------|------|------------|-------------|
| **Cart** | `user_id` | ObjectId | Ref: "User" | Reference to user |
| | `items` | [ObjectId] | Ref: "CartItem" | Items in cart |
| **CartItem** | `menu_item_id` | ObjectId | Ref: "MenuItem" | Reference to menu item |
| | `quantity` | Number | | Quantity of item |

### Offer

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `title` | String | Required | Offer title |
| `description` | String | Required | Offer description |
| `couponCode` | String | Required, Unique | Discount code |
| `discountPercentage` | Number | Range: 1-100 | Discount percentage |
| `validFrom` | Date | Required | Offer start date |
| `validUntil` | Date | Required | Offer end date |
| `minOrderAmount` | Number | | Minimum order amount |
| `maxDiscountAmount` | Number | | Maximum discount amount |
| `applicableCategories` | [String] | | Categories offer applies to |
| `applicableMenuItems` | [ObjectId] | | Specific items offer applies to |
| `isActive` | Boolean | | Whether offer is active |
| `usageLimit` | Number | | Maximum usage count |
| `currentUsage` | Number | | Current usage count |
| `image` | String | | URL to offer image |
| `createdAt` | Date | | Creation timestamp |

### ChefSpecialty

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `title` | String | Required | Specialty title |
| `description` | String | Required | Specialty description |
| `prepTime` | Number | Required | Preparation time in minutes |
| `rate` | Number | Range: 0-5 | Rating |
| `calories` | Number | Required | Caloric content |
| `price` | Number | Required | Item price |
| `ingredients` | [String] | Required | List of ingredients |
| `category` | ObjectId | Required, Ref: "Category" | Reference to category |
| `itemProperties` | [String] | Enum | Special properties |
| `image` | String | | URL to specialty image |
| `createdAt` | Date | | Creation timestamp |
| `isFeatured` | Boolean | | Whether specialty is featured |

> **Properties:** "Spicy", "Vegetarian", "Vegan", "Gluten-Free", "Raw", "Contains Nuts", "Contains Shellfish"

### Gallery

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `images` | Array | | Collection of gallery images |
| `createdAt` | Date | | Creation timestamp |

**Gallery Image:**
| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `url` | String | Required | Image URL |
| `publicId` | String | Required | Cloudinary public ID |
| `uploadedAt` | Date | | Upload timestamp |

### Testimonial

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `rate` | Number | Range: 1-5, Required | Rating score |
| `title` | String | Required | Review title |
| `comment` | String | Required | Review content |
| `user` | ObjectId | Ref: "User", Required | Reference to user |
| `status` | String | Enum | Moderation status |
| `createdAt` | Date | | Creation timestamp |

> **Status:** "pending", "approved", "rejected"

## 🪑 Tables & Reservations

### Table

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `tableNumber` | String | Required, Unique | Table identifier |
| `name` | String | Required | Display name for the table |
| `capacity` | Number | Required, Min: 1 | Maximum number of people |
| `location` | String | Required, Enum | Area of the restaurant |
| `description` | String | | Additional table information |
| `position` | Object | | X,Y coordinates on floor plan |
| `isActive` | Boolean | Default: true | Whether table is available for booking |
| `amenities` | [String] | Enum | Special features available |
| `minReservationDuration` | Number | Default: 60 | Minimum booking time (minutes) |
| `maxReservationDuration` | Number | Default: 180 | Maximum booking time (minutes) |
| `images` | [String] | | URLs to table images |
| `metadata` | Object | | Additional custom data |

> **Locations:** "indoor", "outdoor", "patio", "bar", "private-room"
> 
> **Amenities:** "power-outlet", "window-view", "sofa", "high-chair", "wheelchair-accessible"

### Reservation

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `reservationNumber` | String | Unique, Required | Auto-generated unique identifier |
| `customer` | ObjectId | Ref: "User", Required | Reference to user account |
| `customerDetails` | Object | Required | Customer information snapshot |
| `table` | ObjectId | Ref: "Table", Required | Table being reserved |
| `reservationDate` | Date | Required | Date of reservation |
| `startTime` | String | Required, HH:MM format | Reservation start time |
| `endTime` | String | Required, HH:MM format | Reservation end time |
| `partySize` | Number | Required, Min: 1 | Number of guests |
| `status` | String | Enum | Current reservation status |
| `specialRequests` | String | Max: 500 chars | Special accommodations |
| `source` | String | Enum | Reservation booking source |
| `notes` | String | Max: 500 chars | Staff notes about reservation |
| `cancellationReason` | String | | Reason if cancelled |
| `checkedInAt` | Date | | Timestamp when seated |
| `completedAt` | Date | | Timestamp when completed |
| `metadata` | Object | | Additional custom data |

> **Status:** "pending", "confirmed", "seated", "completed", "cancelled", "no-show"
> 
> **Sources:** "website", "phone", "in-person", "mobile-app", "other"

### Notification

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `userId` | ObjectId | Ref: "User", Required | User receiving notification |
| `title` | String | Required | Short notification title |
| `message` | String | Required | Notification content |
| `type` | String | Enum, Required | Category of notification |
| `orderId` | ObjectId | Ref: "Order" | Related order (if applicable) |
| `isRead` | Boolean | Default: false | Whether notification is read |
| `readAt` | Date | | Timestamp when marked as read |

> **Types:** "order_status", "order_confirmation", "payment", "promotion", "system"

### Settings

| Field | Type | Description |
|-------|------|-------------|
| `restaurantName` | String | Name of restaurant |
| `logo` | String | URL to restaurant logo |
| `contactInfo` | Object | Contact information |
| `businessHours` | Array | Operating hours |
| `socialMedia` | Object | Social media links |
| `paymentMethods` | Object | Available payment methods |
| `deliverySettings` | Object | Delivery configuration |
| `taxRate` | Number | Applicable tax rate |
| `updatedAt` | Date | Last update timestamp |

**Business Hours:**
| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `day` | String | Enum: days of week | Day of the week |
| `open` | String | | Opening time |
| `close` | String | | Closing time |
| `isClosed` | Boolean | | Whether closed on this day |

## 🛣️ API Endpoints

### 🔑 Authentication Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login user and get token | No |
| `GET` | `/api/auth/logout` | Logout user | No |
| `GET` | `/api/auth/me` | Get current user details | Yes |
| `PUT` | `/api/auth/updatedetails` | Update user profile | Yes |
| `PUT` | `/api/auth/updatepassword` | Update user password | Yes |

#### Register User Request Body Example

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "Boston",
    "state": "MA",
    "zipCode": "02115",
    "country": "USA"
  }
}
```

### 📦 Cart Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/cart` | Get user's cart | Yes |
| `POST` | `/api/cart` | Add item to cart | Yes |
| `PUT` | `/api/cart` | Update cart item quantity | Yes |
| `DELETE` | `/api/cart/:product_id` | Remove item from cart | Yes |
| `DELETE` | `/api/cart/user/:user_id` | Delete entire cart | Yes (Admin) |

#### Add to Cart Request Body Example

```json
{
  "menu_item_id": "60d21b4667d0d8992e610c85",
  "quantity": 2,
  "customizations": {
    "spicyLevel": "medium",
    "noWasabi": true
  }
}
```

### 🍽️ Category Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/categories` | Get all categories | No |
| `GET` | `/api/categories/:id` | Get single category | No |
| `POST` | `/api/categories` | Create new category | Yes (Admin) |
| `PUT` | `/api/categories/:id` | Update category | Yes (Admin) |
| `DELETE` | `/api/categories/:id` | Delete category | Yes (Admin) |

#### Query Parameters for GET /api/categories

| Parameter | Type | Description | Default | Example |
|-----------|------|-------------|---------|---------|
| `page` | Integer | Page number | 1 | `?page=2` |
| `limit` | Integer | Items per page | 10 | `?limit=5` |
| `search` | String | Text search | - | `?search=seafood` |
| `active` | Boolean | Filter active items | - | `?active=true` |

### 👨‍🍳 Chef Specialty Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/chef-specialties` | Get all chef specialties | No |
| `GET` | `/api/chef-specialties/:id` | Get single chef specialty | No |
| `POST` | `/api/chef-specialties` | Create new chef specialty | Yes (Admin) |
| `PUT` | `/api/chef-specialties/:id` | Update chef specialty | Yes (Admin) |
| `DELETE` | `/api/chef-specialties/:id` | Delete chef specialty | Yes (Admin) |
| `GET` | `/api/chef-specialties/featured` | Get featured specialties | No |

### 📷 Gallery Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/gallery` | Get all gallery images | No |
| `POST` | `/api/gallery` | Upload gallery images (max 10) | Yes (Admin) |
| `DELETE` | `/api/gallery/:publicId` | Delete a gallery image | Yes (Admin) |

#### Query Parameters for GET /api/gallery

| Parameter | Type | Description | Default | Example |
|-----------|------|-------------|---------|---------|
| `page` | Integer | Page number | 1 | `?page=2` |
| `limit` | Integer | Items per page | 10 | `?limit=5` |

### 🍣 Menu Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/menu` | Get all menu items | No |
| `GET` | `/api/menu/:id` | Get single menu item | No |
| `POST` | `/api/menu` | Create new menu item | Yes (Admin) |
| `PUT` | `/api/menu/:id` | Update menu item | Yes (Admin) |
| `DELETE` | `/api/menu/:id` | Delete menu item | Yes (Admin) |
| `GET` | `/api/menu/category/:categoryId` | Get items by category | No |
| `GET` | `/api/menu/featured` | Get featured menu items | No |
| `POST` | `/api/menu/:id/rating` | Add rating to menu item | Yes |
| `GET` | `/api/menu/search` | Search menu items | No |

#### Query Parameters for GET /api/menu

| Parameter | Type | Description | Default | Example |
|-----------|------|-------------|---------|---------|
| `page` | Integer | Page number | 1 | `?page=2` |
| `limit` | Integer | Items per page | 10 | `?limit=5` |
| `sort` | String | Sort field and direction | -createdAt | `?sort=price` |
| `category` | String | Category ID filter | - | `?category=60d21b4667d0d8992e610c85` |
| `search` | String | Text search | - | `?search=salmon` |
| `spicyLevel` | Integer | Filter by spicy level | - | `?spicyLevel=2` |
| `isVegetarian` | Boolean | Filter vegetarian | - | `?isVegetarian=true` |
| `isGlutenFree` | Boolean | Filter gluten free | - | `?isGlutenFree=true` |
| `minPrice` | Number | Minimum price | - | `?minPrice=10` |
| `maxPrice` | Number | Maximum price | - | `?maxPrice=25` |

### 🔔 Notification Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/notifications` | Get user notifications | Yes |
| `PUT` | `/api/notifications/:id/read` | Mark notification as read | Yes |
| `PUT` | `/api/notifications/read-all` | Mark all notifications as read | Yes |
| `DELETE` | `/api/notifications/:id` | Delete notification | Yes |
| `POST` | `/api/notifications/send` | Send notification to user | Yes (Admin) |

### 🏷️ Offer Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/offers` | Get all active offers | No |
| `GET` | `/api/offers/:id` | Get single offer | No |
| `POST` | `/api/offers` | Create new offer | Yes (Admin) |
| `PUT` | `/api/offers/:id` | Update offer | Yes (Admin) |
| `DELETE` | `/api/offers/:id` | Delete offer | Yes (Admin) |
| `POST` | `/api/offers/verify` | Verify coupon code | Yes |

#### Query Parameters for GET /api/offers

| Parameter | Type | Description | Default | Example |
|-----------|------|-------------|---------|---------|
| `page` | Integer | Page number | 1 | `?page=2` |
| `limit` | Integer | Items per page | 10 | `?limit=5` |
| `search` | String | Text search | - | `?search=summer` |
| `active` | Boolean | Filter active offers | true | `?active=false` |
| `sort` | String | Sort field and direction | -createdAt | `?sort=validUntil` |

### 🛒 Order Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/orders` | Get all orders (admin) | Yes (Admin) |
| `GET` | `/api/orders/my-orders` | Get user's orders | Yes |
| `GET` | `/api/orders/:id` | Get single order | Yes |
| `POST` | `/api/orders` | Create new order | Yes |
| `PUT` | `/api/orders/:id/status` | Update order status | Yes (Admin) |
| `PUT` | `/api/orders/:id/cancel` | Cancel order | Yes |
| `DELETE` | `/api/orders/:id` | Delete order | Yes (Admin) |
| `POST` | `/api/orders/:id/payment` | Process payment | Yes |
| `GET` | `/api/orders/stats` | Get order statistics | Yes (Admin) |

#### Query Parameters for GET /api/orders

| Parameter | Type | Description | Default | Example |
|-----------|------|-------------|---------|---------|
| `page` | Integer | Page number | 1 | `?page=2` |
| `limit` | Integer | Items per page | 10 | `?limit=5` |
| `status` | String | Filter by status | - | `?status=processing` |
| `startDate` | Date | Filter by start date | - | `?startDate=2023-10-01` |
| `endDate` | Date | Filter by end date | - | `?endDate=2023-10-31` |
| `sort` | String | Sort field | -orderDate | `?sort=totalPrice` |

### 📅 Reservation Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/reservations` | Get all reservations (admin) | Yes (Admin) |
| `GET` | `/api/reservations/my-reservations` | Get user's reservations | Yes |
| `GET` | `/api/reservations/:id` | Get single reservation | Yes |
| `POST` | `/api/reservations` | Create new reservation | Yes |
| `PUT` | `/api/reservations/:id/status` | Update reservation status | Yes (Admin) |
| `DELETE` | `/api/reservations/:id` | Cancel reservation | Yes |
| `GET` | `/api/reservations/available-slots` | Get available time slots | No |
| `GET` | `/api/reservations/available-tables` | Get available tables | No |
| `POST` | `/api/reservations/:id/check-in` | Check in reservation | Yes (Admin) |
| `GET` | `/api/reservations/floor-plan` | Get floor plan availability | Yes (Admin) |

#### Query Parameters for GET /api/reservations

| Parameter | Type | Description | Default | Example |
|-----------|------|-------------|---------|---------|
| `page` | Integer | Page number | 1 | `?page=2` |
| `limit` | Integer | Items per page | 10 | `?limit=5` |
| `status` | String | Filter by status | - | `?status=confirmed` |
| `date` | Date | Filter by date | - | `?date=2023-11-15` |
| `sort` | String | Sort field | -reservationDate | `?sort=partySize` |

#### Query Parameters for GET /api/reservations/available-slots

| Parameter | Type | Description | Required | Example |
|-----------|------|-------------|----------|---------|
| `date` | Date | Reservation date | Yes | `?date=2023-11-15` |
| `partySize` | Integer | Number of guests | Yes | `?partySize=4` |
| `duration` | Integer | Duration in minutes | No | `?duration=120` |

### ⚙️ Settings Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/settings` | Get restaurant settings | No |
| `PUT` | `/api/settings/general` | Update general settings | Yes (Admin) |
| `PUT` | `/api/settings/business-hours` | Update business hours | Yes (Admin) |
| `PUT` | `/api/settings/social-media` | Update social media links | Yes (Admin) |
| `PUT` | `/api/settings/delivery` | Update delivery settings | Yes (Admin) |
| `PUT` | `/api/settings/payment` | Update payment settings | Yes (Admin) |

### 🪑 Table Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/tables` | Get all tables | No |
| `GET` | `/api/tables/:id` | Get a specific table | No |
| `POST` | `/api/tables` | Create a new table | Yes (Admin) |
| `PUT` | `/api/tables/:id` | Update a table | Yes (Admin) |
| `DELETE` | `/api/tables/:id` | Delete a table | Yes (Admin) |
| `GET` | `/api/tables/by-location/:location` | Get tables by location | No |
| `PUT` | `/api/tables/:id/status` | Toggle table status | Yes (Admin) |
| `POST` | `/api/tables/:id/images` | Upload table images | Yes (Admin) |
| `DELETE` | `/api/tables/:id/images/:imageId` | Delete table image | Yes (Admin) |

#### Query Parameters for GET /api/tables

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `location` | String | Filter by location | `?location=indoor` |
| `minCapacity` | Number | Minimum capacity | `?minCapacity=4` |
| `isActive` | Boolean | Filter by active status | `?isActive=true` |
| `amenities` | String | Filter by amenities (comma separated) | `?amenities=window-view,sofa` |
| `sort` | String | Sort fields | `?sort=capacity,-tableNumber` |

### 🗣️ Testimonial Controller

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/testimonials` | Get all testimonials | No |
| `POST` | `/api/testimonials` | Create a new testimonial | Yes |
| `PUT` | `/api/testimonials/:id/status` | Update testimonial status | Yes (Admin) |
| `DELETE` | `/api/testimonials/:id` | Delete a testimonial | Yes |

#### Query Parameters for GET /api/testimonials

| Parameter | Type | Description | Default | Example |
|-----------|------|-------------|---------|---------|
| `page` | Integer | Page number | 1 | `?page=2` |
| `limit` | Integer | Items per page | 10 | `?limit=5` |
| `status` | String | Filter by status (admin only) | "approved" | `?status=pending` |
| `sort` | String | Sort (newest or oldest) | "newest" | `?sort=oldest` |

## 📅 Advanced Reservation Features

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/reservations/analytics` | Get reservation analytics | Yes (Admin) |
| `POST` | `/api/reservations/reschedule/:id` | Reschedule reservation | Yes |
| `PATCH` | `/api/reservations/:id/party-size` | Update party size | Yes |
| `POST` | `/api/reservations/confirm/:id` | Confirm reservation | Yes (Admin/Staff) |
| `GET` | `/api/reservations/daily` | Get daily reservation schedule | Yes (Admin/Staff) |
| `POST` | `/api/reservations/bulk-status-update` | Update multiple reservation statuses | Yes (Admin) |
| `GET` | `/api/reservations/no-shows` | Get no-show statistics | Yes (Admin) |
| `GET` | `/api/reservations/waiting-list` | Get waiting list | Yes (Admin/Staff) |

### Query Parameters for GET /api/reservations/analytics

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `startDate` | ISO Date | Start of analysis period | `?startDate=2024-04-01` |
| `endDate` | ISO Date | End of analysis period | `?endDate=2024-04-30` |
| `groupBy` | String | Group results (day, week, month) | `?groupBy=week` |

### Query Parameters for GET /api/reservations/daily

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `date` | ISO Date | Date to view | `?date=2024-05-01` |
| `location` | String | Filter by location | `?location=indoor` |

### Request Body Example (Reschedule Reservation)

```json
{
  "reservationDate": "2024-05-12",
  "startTime": "18:30",
  "endTime": "20:30",
  "notifyCustomer": true
}
```

### Request Body Example (Bulk Status Update)

```json
{
  "reservationIds": [
    "60d21b4667d0d8992e610c85",
    "60d21b4667d0d8992e610c86"
  ],
  "status": "confirmed"
}
```

## 🔔 Advanced Notification Features

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `DELETE` | `/api/notifications/:id` | Delete notification | Yes |
| `PATCH` | `/api/notifications/mark-all-read` | Mark all notifications as read | Yes |
| `POST` | `/api/notifications/reservation` | Create reservation notification | Yes (Admin) |
| `GET` | `/api/notifications/analytics` | Get notification engagement analytics | Yes (Admin) |
| `POST` | `/api/notifications/bulk` | Send notification to multiple users | Yes (Admin) |

### Request Body Example (Create Reservation Notification)

```json
{
  "userId": "60d21b4667d0d8992e610c85",
  "title": "Reservation Reminder",
  "message": "Your reservation at Aokaze Sushi is tomorrow at 7:00 PM",
  "type": "system",
  "additionalData": {
    "reservationId": "60d21b4667d0d8992e610c90"
  }
}
```

### Request Body Example (Bulk Notification)

```json
{
  "userIds": [
    "60d21b4667d0d8992e610c85",
    "60d21b4667d0d8992e610c86"
  ],
  "title": "Special Weekend Event",
  "message": "Join us this weekend for a special Omakase tasting menu!",
  "type": "promotion"
}
```

## 🗓️ Operating Hours & Availability

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/operating-hours` | Get restaurant operating hours | No |
| `PUT` | `/api/operating-hours` | Update operating hours | Yes (Admin) |
| `POST` | `/api/operating-hours/special` | Add special hours for date | Yes (Admin) |
| `DELETE` | `/api/operating-hours/special/:id` | Remove special hours | Yes (Admin) |
| `GET` | `/api/operating-hours/closed-dates` | Get all closed dates | No |

### Request Body Example (Update Operating Hours)

```json
{
  "monday": { "open": "11:00", "close": "22:00", "isClosed": false },
  "tuesday": { "open": "11:00", "close": "22:00", "isClosed": false },
  "wednesday": { "open": "11:00", "close": "22:00", "isClosed": false },
  "thursday": { "open": "11:00", "close": "23:00", "isClosed": false },
  "friday": { "open": "11:00", "close": "23:00", "isClosed": false },
  "saturday": { "open": "12:00", "close": "23:00", "isClosed": false },
  "sunday": { "open": "12:00", "close": "21:00", "isClosed": false }
}
```

### Request Body Example (Special Hours)

```json
{
  "date": "2024-05-25",
  "open": "16:00",
  "close": "22:00",
  "isClosed": false,
  "reason": "Memorial Day Weekend"
}
```

## 📜 Wait List Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `POST` | `/api/waitlist` | Add party to waitlist | Yes (Staff/Admin) |
| `GET` | `/api/waitlist` | Get current waitlist | Yes (Staff/Admin) |
| `DELETE` | `/api/waitlist/:id` | Remove from waitlist | Yes (Staff/Admin) |
| `PATCH` | `/api/waitlist/:id/notify` | Mark customer as notified | Yes (Staff/Admin) |
| `PATCH` | `/api/waitlist/:id/convert` | Convert to reservation | Yes (Staff/Admin) |

### Request Body Example (Add to Waitlist)

```json
{
  "customerName": "John Smith",
  "phoneNumber": "123-456-7890",
  "partySize": 4,
  "estimatedWait": 30,
  "notes": "Prefers window seating"
}
```

### Request Body Example (Convert to Reservation)

```json
{
  "tableId": "60d21b4667d0d8992e610c85",
  "startTime": "19:30",
  "endTime": "21:30"
}
```

## 🔁 Reservation Workflows

The reservation system supports the following workflows:

### Customer Reservation Flow

1. Customer checks table availability using `/api/reservations/availability`
2. Customer creates reservation with `/api/reservations`
3. Customer receives confirmation notification
4. Customer can view reservation with `/api/reservations/my-reservations`
5. Customer can cancel if needed with `/api/reservations/:id/cancel`
6. Customer checks in at restaurant with `/api/reservations/:id/check-in`

### Staff Reservation Management Flow

1. Staff views daily schedule using `/api/reservations/daily`
2. Staff confirms arrivals with `/api/reservations/:id/status`
3. Staff handles walk-ins by creating new reservations
4. Staff manages table status throughout service
5. Staff completes reservations after guests leave

### Waitlist Management Flow

1. Host adds walk-in customers to waitlist if no tables available
2. Host monitors table availability
3. Host notifies customers when table becomes available
4. Host converts waitlist entry to reservation when customer returns

### ⚙️ Settings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/settings` | Get restaurant settings | No |
| `PUT` | `/api/settings` | Update restaurant settings | Yes (Admin) |
| `PUT` | `/api/settings/business-hours` | Update business hours | Yes (Admin) |
| `PUT` | `/api/settings/payment-methods` | Update payment methods | Yes (Admin) |
| `PUT` | `/api/settings/delivery` | Update delivery settings | Yes (Admin) |
| `PUT` | `/api/settings/tax-rate` | Update tax rate | Yes (Admin) |

## 🔐 Authentication & Authorization

The API uses JWT (JSON Web Token) for authentication. To access protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

### Authorization Levels

- **Public Routes**: Accessible without authentication
- **Protected Routes**: Requires valid JWT token
- **Admin Routes**: Requires valid JWT token with admin role

## 🚫 Error Handling

The API follows a consistent error response format:

```json
{
  "success": false,
  "message": "Error message",
  "error": {} // Additional error details in development mode
}
```

HTTP status codes are appropriately used:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## 📁 File Uploads

File uploads are handled using multer middleware. The following endpoints support file uploads:

- POST `/api/menu` (image)
- PUT `/api/menu/:id` (image)
- POST `/api/offers` (image)
- PUT `/api/offers/:id` (image)
- POST `/api/chef-specialties` (image)
- PUT `/api/chef-specialties/:id` (image)
- POST `/api/categories` (image)
- PUT `/api/categories/:id` (image)
- POST `/api/gallery` (multiple images)

For image uploads, use the `multipart/form-data` content type with the appropriate field name (usually `image` or `images` for multiple files).

## 🛠️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/aokaze_sushi
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/AhmedAboRaya/Aokaze-Sushi.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see above section)
4. Start the server:
   ```bash
   npm run dev
   ```

---

© 2024 Aokaze Sushi Restaurant API