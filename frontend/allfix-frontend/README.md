# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Application Routes

Here is a list of the available routes in the application:

### Public / Landing Pages
- `/` - Landing Page (Redirects to dashboard if authenticated)

### Customer Authentication
- `/login` - Customer Login (Redirects to `/user`)
- `/signup` - Customer Signup
- `/confirm-signup` - Confirm Signup
- `/forgot-password` - Forgot Password

### Auth Callback / Bridges
- `/auth/callback` - OIDC callback route (Redirects to Landing Page)
- `/auth/pms-trusted` - PMS trusted handoff bridge

### Vendor Authentication
- `/vendor-login` - Vendor Login (Redirects to `/vendor`)
- `/vendor-apply` - Vendor Application
- `/vendor-application-submitted` - Vendor Application Submitted

### Staff Authentication
- `/personnel-login` - Personnel Login (Redirects to `/personnel`)
- `/admin-login` - Admin Login (Redirects to `/admin`)

### Protected Routes (Requires Authentication / Specific Roles)
- `/user` - User Dashboard (Customer)
- `/vendor` - Vendor Dashboard (Requires `VENDOR` role)
- `/personnel` - Personnel Dashboard (Requires `PERSONNEL` role)
- `/admin` - Admin Dashboard (Requires `ADMIN` role)


