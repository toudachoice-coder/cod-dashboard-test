import { useMemo, useState } from 'react'

const ordersData = [
  {
    order_id: 'CMD-1001',
    source: 'Facebook Ads',
    date_commande: '2026-05-20',
    client_name: 'Youssef El Amrani',
    phone: '0612345678',
    city: 'Casablanca',
    product: 'Smart Watch X1',
    price: 499,
    statut_interne: 'New',
    code_colis: '',
    statut_livraison: 'Pending',
  },
  {
    order_id: 'CMD-1002',
    source: 'TikTok Shop',
    date_commande: '2026-05-19',
    client_name: 'Salma Benali',
    phone: '0678899001',
    city: 'Rabat',
    product: 'Mini Blender',
    price: 299,
    statut_interne: 'Confirmed',
    code_colis: 'CLS900122',
    statut_livraison: 'In transit',
  },
  {
    order_id: 'CMD-1003',
    source: 'Instagram',
    date_commande: '2026-05-18',
    client_name: 'Mohamed Ait Taleb',
    phone: '0655544433',
    city: 'Marrakech',
    product: 'Portable Vacuum',
    price: 379,
    statut_interne: 'Without tracking code',
    code_colis: '',
    statut_livraison: 'Pending',
  },
  {
    order_id: 'CMD-1004',
    source: 'Website',
    date_commande: '2026-05-17',
    client_name: 'Imane Ouali',
    phone: '0622233344',
    city: 'Fes',
    product: 'Hair Curler Pro',
    price: 420,
    statut_interne: 'Delivered',
    code_colis: 'CLS123498',
    statut_livraison: 'Delivered',
  },
  {
    order_id: 'CMD-1005',
    source: 'Call Center',
    date_commande: '2026-05-16',
    client_name: 'Omar Idrissi',
    phone: '0688765432',
    city: 'Agadir',
    product: 'Massage Gun',
    price: 599,
    statut_interne: 'Canceled',
    code_colis: '',
    statut_livraison: 'Canceled',
  },
  {
    order_id: 'CMD-1006',
    source: 'Facebook Ads',
    date_commande: '2026-05-21',
    client_name: 'Nadia Chraibi',
    phone: '0600112233',
    city: 'Tangier',
    product: 'Kitchen Scale',
    price: 189,
    statut_interne: 'Confirmed',
    code_colis: 'CLS662244',
    statut_livraison: 'Shipped',
  },
]

const statuses = ['All', 'New', 'Confirmed', 'Without tracking code', 'Delivered', 'Canceled']
const sources = ['All', ...new Set(ordersData.map((order) => order.source))]

function App() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [sourceFilter, setSourceFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filteredOrders = useMemo(() => {
    const query = search.toLowerCase().trim()

    return ordersData.filter((order) => {
      const matchStatus = statusFilter === 'All' || order.statut_interne === statusFilter
      const matchSource = sourceFilter === 'All' || order.source === sourceFilter
      const matchSearch =
        !query ||
        order.phone.toLowerCase().includes(query) ||
        order.client_name.toLowerCase().includes(query)

      return matchStatus && matchSource && matchSearch
    })
  }, [search, sourceFilter, statusFilter])

  const stats = useMemo(() => {
    const total = ordersData.length
    const confirmed = ordersData.filter((o) => o.statut_interne === 'Confirmed').length
    const withoutTracking = ordersData.filter((o) => !o.code_colis).length
    const delivered = ordersData.filter((o) => o.statut_interne === 'Delivered').length
    const canceled = ordersData.filter((o) => o.statut_interne === 'Canceled').length

    return { total, confirmed, withoutTracking, delivered, canceled }
  }, [])

  return (
    <main className="container">
      <header className="header">
        <h1>Morocco COD Dashboard</h1>
        <p>Sample data only — no API or Google Sheets connection.</p>
      </header>

      <section className="cards">
        <StatCard title="Total orders" value={stats.total} />
        <StatCard title="Confirmed orders" value={stats.confirmed} />
        <StatCard title="Orders without tracking code" value={stats.withoutTracking} />
        <StatCard title="Delivered orders" value={stats.delivered} />
        <StatCard title="Canceled orders" value={stats.canceled} />
      </section>

      <section className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
          {sources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Search by phone or client name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="table-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>order_id</th>
                <th>source</th>
                <th>date_commande</th>
                <th>client_name</th>
                <th>phone</th>
                <th>city</th>
                <th>product</th>
                <th>price</th>
                <th>statut_interne</th>
                <th>code_colis</th>
                <th>statut_livraison</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.source}</td>
                  <td>{order.date_commande}</td>
                  <td>{order.client_name}</td>
                  <td>{order.phone}</td>
                  <td>{order.city}</td>
                  <td>{order.product}</td>
                  <td>{order.price} MAD</td>
                  <td>
                    <span className={`badge badge-${toBadgeClass(order.statut_interne)}`}>
                      {order.statut_interne}
                    </span>
                  </td>
                  <td>{order.code_colis || '-'}</td>
                  <td>{order.statut_livraison}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

function StatCard({ title, value }) {
  return (
    <article className="card">
      <p>{title}</p>
      <h2>{value}</h2>
    </article>
  )
}

function toBadgeClass(status) {
  return status.toLowerCase().replaceAll(' ', '-').replaceAll('_', '-')
}

export default App
