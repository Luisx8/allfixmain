# Allfix - Product Requirements Document

## 1. Overview
Allfix is a comprehensive service booking platform designed to connect customers with vendors providing a wide variety of services (e.g., aircon cleaning, plumbing, repairs). The platform facilitates the end-to-end booking process, from discovery and scheduling to personnel dispatch, communication, and payment.

## 2. Tech Stack
- **Frontend:** React.js (Vite)
- **Backend:** Spring Boot (Java)
- **Authentication:** AWS Cognito
- **Database:** Supabase (PostgreSQL)
- **Notifications:** SMTP (Email)
- **Payments:** Stripe (Automated), GCash (Manual verification)

## 3. User Roles & Permissions

### 3.1 Customer (User)
- Browses available services and views vendor options.
- Books services by selecting a specific vendor, date, and time.
- Completes payments via Stripe or manual GCash screenshot upload.
- Communicates directly with assigned personnel and vendors via an integrated chat system.

### 3.2 Vendor (Company / Manager)
- Acts as a management entity over multiple personnel.
- Receives booking requests tailored to their company.
- Approves or rejects incoming booking requests.
- Assigns specific personnel to approved tasks.
- Participates in chats with the customer and the personnel.

### 3.3 Personnel (Worker)
- The on-site worker dispatched to perform the actual service.
- Views assigned tasks and schedules.
- Updates task statuses (e.g., On the way, In progress, Completed).
- Communicates with both the customer and their vendor manager via chat.

### 3.4 Admin
- Oversees the entire platform. Admin roles are categorized (RBAC - Role-Based Access Control) to manage specific domains.
- Approves/rejects vendor applications.
- Manages platform data across the board (add/edit/delete services, categories, users, etc.).
- Verifies manual GCash payments by reviewing uploaded screenshots before confirming booking statuses.

## 4. Core Workflows

### 4.1 Booking Flow
1. **Discovery:** Customer selects a desired service category.
2. **Selection:** Customer browses available vendors offering that service and selects a vendor.
3. **Scheduling:** Customer selects an available date and time slot.
4. **Approval:** The selected Vendor is notified and must accept the booking.
5. **Dispatch:** Upon acceptance, the Vendor assigns a specific Personnel to the site.
6. **Execution:** Personnel travels to the site, communicates via chat if needed, and marks the task as complete upon finish.

### 4.2 Payment Flow
- **Stripe:** Customers can pay digitally and automatically via Stripe checkout.
- **GCash (Manual):** Customers select GCash, transfer funds manually, and upload a screenshot of the receipt. The platform flags this transaction for Admin review. An Admin validates the screenshot and manually confirms the payment status, updating the booking.

### 4.3 Communication
- A unified multi-party chat room is created for each booking allowing Customer, Vendor, and Personnel to communicate seamlessly.

## 5. Future Considerations
- Expand automated payment gateways (direct GCash API integration).
- Expand notification channels (Push Notifications, SMS).
