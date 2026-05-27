# Moroccan COD Dashboard (React + Vite)

Simple mobile-first COD dashboard for Moroccan e-commerce using **fake sample data only**.

## Features

- Top stats cards:
  - Total orders
  - Confirmed orders
  - Orders without tracking code
  - Delivered orders
  - Canceled orders
- Orders table columns:
  - `order_id`, `source`, `date_commande`, `client_name`, `phone`, `city`, `product`, `price`, `statut_interne`, `code_colis`, `statut_livraison`
- Filters:
  - Status filter
  - Source filter
  - Search by phone or client name
- Badges:
  - New
  - Confirmed
  - Without tracking code
  - Delivered
  - Canceled
- Clean and responsive UI

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build production files:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Notes

- Uses only hardcoded fake data in `src/App.jsx`.
- No Google Sheets connection.
- No real credentials or API integration.
