import { useMemo, useState } from 'react'

const TODAY = new Date('2026-05-29T12:00:00')

const ordersData = [
  {
    order_id: 'CM-2031',
    source: 'Celia Mode 2026',
    date_commande: '2026-05-29T09:20:00',
    client_name: 'Salma El Harrak',
    phone: '0612345678',
    city: 'Casablanca',
    product: 'Verrou fenêtre coulissante - Pack 2',
    price: 139,
    statut_interne: '',
    code_colis: '',
    statut_livraison: '',
  },
  {
    order_id: 'CM-2030',
    source: 'Celia Mode 2026',
    date_commande: '2026-05-28T18:45:00',
    client_name: 'Nadia Benkirane',
    phone: '0661122334',
    city: 'Rabat',
    product: 'Clé USB Quran',
    price: 199,
    statut_interne: 'Confirmé',
    code_colis: '',
    statut_livraison: '',
  },
  {
    order_id: 'NY-1108',
    source: 'New Year',
    date_commande: '2026-05-28T14:15:00',
    client_name: 'Yassine Amrani',
    phone: '0700112233',
    city: 'Marrakech',
    product: 'Verrou fenêtre coulissante - Pack 4',
    price: 199,
    statut_interne: 'Confirmé',
    code_colis: 'SDT-805533',
    statut_livraison: 'En transit',
  },
  {
    order_id: 'W2033',
    source: 'WhatsApp',
    date_commande: '2026-05-27T21:10:00',
    client_name: 'Khadija Mansouri',
    phone: '0677008899',
    city: 'Tanger',
    product: 'Celia Shoes - Noir',
    price: 249,
    statut_interne: 'À rappeler',
    code_colis: '',
    statut_livraison: '',
  },
  {
    order_id: 'CM-2029',
    source: 'Celia Mode 2026',
    date_commande: '2026-05-27T11:05:00',
    client_name: 'Oumaima Fassi',
    phone: '0655667788',
    city: 'Fès',
    product: 'Crème solaire Azayko',
    price: 159,
    statut_interne: 'Confirmé',
    code_colis: 'SDT-804221',
    statut_livraison: 'Livré',
  },
  {
    order_id: 'CM-2028',
    source: 'Celia Mode 2026',
    date_commande: '2026-05-26T17:35:00',
    client_name: 'Siham Jebari',
    phone: '0600456789',
    city: 'Agadir',
    product: 'Sérum visage',
    price: 189,
    statut_interne: 'Confirmé',
    code_colis: 'SDT-803908',
    statut_livraison: 'Injoignable',
  },
  {
    order_id: 'NY-1107',
    source: 'New Year',
    date_commande: '2026-05-26T10:55:00',
    client_name: 'Meriem Ait Lahcen',
    phone: '0699887766',
    city: 'Oujda',
    product: 'Verrou fenêtre coulissante - Pack 2',
    price: 139,
    statut_interne: 'Non intéressé',
    code_colis: '',
    statut_livraison: '',
  },
  {
    order_id: 'W2032',
    source: 'WhatsApp',
    date_commande: '2026-05-25T15:40:00',
    client_name: 'Hajar El Idrissi',
    phone: '0622554411',
    city: 'Kénitra',
    product: 'Clé USB Quran',
    price: 199,
    statut_interne: 'Confirmé',
    code_colis: 'SDT-803512',
    statut_livraison: 'Reporté',
  },
  {
    order_id: 'CM-2027',
    source: 'Celia Mode 2026',
    date_commande: '2026-05-25T12:10:00',
    client_name: 'Imane Alaoui',
    phone: '0711223344',
    city: 'Meknès',
    product: 'Celia Shoes - Caramel',
    price: 249,
    statut_interne: 'Confirmé',
    code_colis: 'SDT-802977',
    statut_livraison: 'Refusé',
  },
  {
    order_id: 'NY-1106',
    source: 'New Year',
    date_commande: '2026-05-24T19:20:00',
    client_name: 'Asmaa Berrada',
    phone: '0619876543',
    city: 'Mohammedia',
    product: 'Verrou fenêtre coulissante - Pack 4',
    price: 199,
    statut_interne: 'Confirmé',
    code_colis: 'SDT-801644',
    statut_livraison: 'Annulé',
  },
  {
    order_id: 'CM-2026',
    source: 'Celia Mode 2026',
    date_commande: '2026-05-24T09:00:00',
    client_name: 'Fatima Zahra',
    phone: '0666001122',
    city: 'El Jadida',
    product: 'Crème solaire Azayko',
    price: 159,
    statut_interne: 'Confirmé',
    code_colis: 'SDT-800914',
    statut_livraison: 'Entrepôt',
  },
  {
    order_id: 'W2031',
    source: 'WhatsApp',
    date_commande: '2026-05-23T22:05:00',
    client_name: 'Rania Bennani',
    phone: '0633445566',
    city: 'Salé',
    product: 'Celia Shoes - Beige',
    price: 249,
    statut_interne: 'Confirmé',
    code_colis: '',
    statut_livraison: '',
  },
]

const internalFilters = [
  { key: 'all', label: 'Tous', icon: '📋' },
  { key: 'new', label: 'Nouvelles', icon: '🆕' },
  { key: 'callback', label: 'À rappeler', icon: '📞' },
  { key: 'notInterested', label: 'Non intéressé', icon: '❌' },
  { key: 'confirmedToSend', label: 'Confirmées à envoyer', icon: '✅' },
  { key: 'withoutCode', label: 'Sans code colis', icon: '🏷️' },
]

const deliveryFilters = [
  { key: 'warehouse', label: 'Entrepôt', icon: '🏬' },
  { key: 'transit', label: 'En transit', icon: '🚚' },
  { key: 'delivered', label: 'Livrées', icon: '🎉' },
  { key: 'refused', label: 'Refusées', icon: '⛔' },
  { key: 'canceled', label: 'Annulées', icon: '❌' },
  { key: 'unreachable', label: 'Injoignables', icon: '☎️' },
  { key: 'postponed', label: 'Reportées', icon: '⏳' },
]

const sources = ['Toutes les sources', 'Celia Mode 2026', 'New Year', 'WhatsApp']

function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function isConfirmed(order) {
  const status = normalize(order.statut_interne)
  return ['confirme', 'confirmed'].includes(status)
}

function hasNoCode(order) {
  return !String(order.code_colis || '').trim()
}

function isNewOrder(order) {
  const hours = (TODAY - new Date(order.date_commande)) / 36e5
  return !order.statut_interne && hours <= 24
}

function matchesFilter(order, filter) {
  const internal = normalize(order.statut_interne)
  const delivery = normalize(order.statut_livraison)

  switch (filter) {
    case 'all':
      return true
    case 'new':
      return isNewOrder(order)
    case 'callback':
      return internal.includes('rappeler')
    case 'notInterested':
      return internal.includes('non interesse')
    case 'confirmedToSend':
      return isConfirmed(order) && hasNoCode(order)
    case 'withoutCode':
      return hasNoCode(order)
    case 'warehouse':
      return delivery.includes('entrepot')
    case 'transit':
      return delivery.includes('transit')
    case 'delivered':
      return delivery.includes('livre')
    case 'refused':
      return delivery.includes('refuse')
    case 'canceled':
      return delivery.includes('annule')
    case 'unreachable':
      return delivery.includes('injoignable')
    case 'postponed':
      return delivery.includes('reporte')
    default:
      return true
  }
}

function getStatus(order) {
  if (isNewOrder(order)) return { label: 'New', tone: 'new' }
  if (isConfirmed(order) && hasNoCode(order)) return { label: 'Confirmée à envoyer', tone: 'warning' }
  if (normalize(order.statut_interne).includes('rappeler')) return { label: 'À rappeler', tone: 'info' }
  if (normalize(order.statut_interne).includes('non interesse')) return { label: 'Non intéressé', tone: 'danger' }
  if (order.statut_livraison) return { label: order.statut_livraison, tone: deliveryTone(order.statut_livraison) }
  if (isConfirmed(order)) return { label: 'Confirmée', tone: 'success' }
  return { label: 'Non traité', tone: 'muted' }
}

function deliveryTone(status) {
  const value = normalize(status)
  if (value.includes('livre')) return 'success'
  if (value.includes('annule') || value.includes('refuse')) return 'danger'
  if (value.includes('injoignable') || value.includes('reporte')) return 'warning'
  if (value.includes('transit')) return 'info'
  return 'muted'
}

function money(value) {
  return `${value.toLocaleString('fr-MA')} DH`
}

function formatDate(value) {
  return new Intl.DateTimeFormat('fr-MA', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function whatsappLink(order) {
  const phone = order.phone.replace(/\D/g, '').replace(/^0/, '212')
  const message = encodeURIComponent(
    `Salam ${order.client_name}, concernant votre commande ${order.order_id} (${order.product}), pouvez-vous confirmer l'adresse svp ?`,
  )
  return `https://wa.me/${phone}?text=${message}`
}

function callLink(order) {
  return `tel:${order.phone}`
}

function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('Toutes les sources')
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredOrders = useMemo(() => {
    const query = normalize(search)

    return ordersData.filter((order) => {
      const sourceOk = sourceFilter === 'Toutes les sources' || order.source === sourceFilter
      const filterOk = matchesFilter(order, activeFilter)
      const searchOk =
        !query ||
        normalize(order.client_name).includes(query) ||
        normalize(order.phone).includes(query) ||
        normalize(order.city).includes(query) ||
        normalize(order.order_id).includes(query) ||
        normalize(order.product).includes(query)

      return sourceOk && filterOk && searchOk
    })
  }, [activeFilter, search, sourceFilter])

  const stats = useMemo(() => {
    const total = ordersData.length
    const confirmedToSend = ordersData.filter((order) => isConfirmed(order) && hasNoCode(order)).length
    const withoutCode = ordersData.filter(hasNoCode).length
    const delivered = ordersData.filter((order) => matchesFilter(order, 'delivered')).length
    const canceled = ordersData.filter((order) => matchesFilter(order, 'canceled')).length
    const deliveredRevenue = ordersData
      .filter((order) => matchesFilter(order, 'delivered'))
      .reduce((sum, order) => sum + order.price, 0)

    const confirmedCelia = ordersData.filter(
      (order) => order.source === 'Celia Mode 2026' && isConfirmed(order),
    ).length
    const deliveredCelia = ordersData.filter(
      (order) => order.source === 'Celia Mode 2026' && matchesFilter(order, 'delivered'),
    ).length
    const deliveryRate = confirmedCelia ? Math.round((deliveredCelia / confirmedCelia) * 100) : 0

    return { total, confirmedToSend, withoutCode, delivered, canceled, deliveredRevenue, deliveryRate }
  }, [])

  const sourceStats = useMemo(() => {
    return sources
      .filter((source) => source !== 'Toutes les sources')
      .map((source) => {
        const orders = ordersData.filter((order) => order.source === source)
        const delivered = orders.filter((order) => matchesFilter(order, 'delivered')).length
        const confirmed = orders.filter(isConfirmed).length
        const rate = confirmed ? Math.round((delivered / confirmed) * 100) : 0
        return { source, total: orders.length, confirmed, delivered, rate }
      })
  }, [])

  const cityStats = useMemo(() => {
    const cityMap = ordersData.reduce((acc, order) => {
      acc[order.city] = (acc[order.city] || 0) + 1
      return acc
    }, {})

    return Object.entries(cityMap)
      .map(([city, total]) => ({ city, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
  }, [])

  const priorityItems = [
    { label: 'À envoyer', value: stats.confirmedToSend, filter: 'confirmedToSend', tone: 'violet' },
    { label: 'Sans code', value: stats.withoutCode, filter: 'withoutCode', tone: 'amber' },
    { label: 'À rappeler', value: ordersData.filter((order) => matchesFilter(order, 'callback')).length, filter: 'callback', tone: 'blue' },
    { label: 'Injoignables', value: ordersData.filter((order) => matchesFilter(order, 'unreachable')).length, filter: 'unreachable', tone: 'red' },
  ]

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Celia COD Manager · V3</p>
          <h1>Dashboard COD</h1>
          <p className="subtitle">Suivi mobile-first des commandes, confirmations et colis Sendit.</p>
        </div>
        <div className="sync-pill">
          <span>Dernier sync</span>
          <strong>29 mai · 12:00</strong>
        </div>
      </section>

      <section className="priority-grid" aria-label="Actions prioritaires">
        {priorityItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`priority-card ${item.tone}`}
            onClick={() => setActiveFilter(item.filter)}
          >
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </button>
        ))}
      </section>

      <section className="stats-grid" aria-label="Statistiques COD">
        <StatCard icon="📦" label="Total commandes" value={stats.total} />
        <StatCard icon="✅" label="Confirmées à envoyer" value={stats.confirmedToSend} accent />
        <StatCard icon="🏷️" label="Sans code colis" value={stats.withoutCode} />
        <StatCard icon="🎉" label="Livrées" value={stats.delivered} />
        <StatCard icon="❌" label="Annulées" value={stats.canceled} />
        <StatCard icon="💰" label="CA livré" value={money(stats.deliveredRevenue)} />
      </section>

      <section className="insights-grid">
        <div className="rate-card">
          <div>
            <span>Taux livraison · Celia Mode 2026</span>
            <strong>{stats.deliveryRate}%</strong>
          </div>
          <div className="progress-bar">
            <span style={{ width: `${stats.deliveryRate}%` }} />
          </div>
        </div>

        <div className="mini-panel">
          <div className="panel-title">
            <span>Performance par source</span>
            <strong>{ordersData.length} orders</strong>
          </div>
          <div className="source-list">
            {sourceStats.map((item) => (
              <button
                key={item.source}
                type="button"
                className="source-row"
                onClick={() => setSourceFilter(item.source)}
              >
                <span>{item.source}</span>
                <strong>{item.total}</strong>
                <em>{item.rate}% livré</em>
              </button>
            ))}
          </div>
        </div>

        <div className="mini-panel city-panel">
          <div className="panel-title">
            <span>Top villes</span>
            <strong>{cityStats.length}</strong>
          </div>
          <div className="city-list">
            {cityStats.map((item) => (
              <button key={item.city} type="button" onClick={() => setSearch(item.city)}>
                <span>{item.city}</span>
                <strong>{item.total}</strong>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="control-panel">
        <div className="field">
          <label htmlFor="search">Recherche</label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nom, téléphone, ville, produit..."
          />
        </div>

        <div className="field">
          <label htmlFor="source">Source</label>
          <select id="source" value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}>
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        <FilterGroup
          title="Groupe 1 — Interne"
          filters={internalFilters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <FilterGroup
          title="Groupe 2 — Sendit"
          filters={deliveryFilters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </section>

      <section className="orders-heading">
        <div>
          <p className="eyebrow">Commandes</p>
          <h2>{filteredOrders.length} affichées</h2>
        </div>
        <button
          type="button"
          className="reset-button"
          onClick={() => {
            setActiveFilter('all')
            setSourceFilter('Toutes les sources')
            setSearch('')
          }}
        >
          Reset
        </button>
      </section>

      <section className="orders-list">
        {filteredOrders.map((order) => (
          <OrderCard key={order.order_id} order={order} onView={() => setSelectedOrder(order)} />
        ))}
      </section>

      {selectedOrder && <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </main>
  )
}

function StatCard({ icon, label, value, accent = false }) {
  return (
    <article className={accent ? 'stat-card accent' : 'stat-card'}>
      <span className="stat-icon">{icon}</span>
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  )
}

function FilterGroup({ title, filters, activeFilter, setActiveFilter }) {
  return (
    <div className="filter-group">
      <h3>{title}</h3>
      <div className="chips">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            className={activeFilter === filter.key ? 'chip active' : 'chip'}
            onClick={() => setActiveFilter(filter.key)}
          >
            <span>{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function OrderCard({ order, onView }) {
  const status = getStatus(order)

  return (
    <article className="order-card">
      <div className="order-top">
        <div>
          <strong>{order.order_id}</strong>
          <span>{formatDate(order.date_commande)}</span>
        </div>
        <span className={`badge ${status.tone}`}>{status.label}</span>
      </div>

      <div className="client-row">
        <div>
          <h3>{order.client_name}</h3>
          <p>
            {order.city} · {order.source}
          </p>
        </div>
        <strong>{money(order.price)}</strong>
      </div>

      <p className="product-line">{order.product}</p>

      <div className="meta-grid">
        <div>
          <span>Téléphone</span>
          <strong>{order.phone}</strong>
        </div>
        <div>
          <span>Code colis</span>
          <strong>{order.code_colis || 'Sans code'}</strong>
        </div>
        <div>
          <span>Livraison</span>
          <strong>{order.statut_livraison || 'Pas encore envoyé'}</strong>
        </div>
      </div>

      <div className="actions">
        <a className="whatsapp" href={whatsappLink(order)} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a className="call" href={callLink(order)}>
          Appeler
        </a>
        <button type="button" onClick={onView}>
          View
        </button>
      </div>
    </article>
  )
}

function OrderModal({ order, onClose }) {
  const status = getStatus(order)

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="order-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <div>
            <p className="eyebrow">Détails commande</p>
            <h2>{order.order_id}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer">
            ×
          </button>
        </div>

        <span className={`badge ${status.tone}`}>{status.label}</span>

        <div className="details-list">
          <DetailLine label="Client" value={order.client_name} />
          <DetailLine label="Téléphone" value={order.phone} />
          <DetailLine label="Ville" value={order.city} />
          <DetailLine label="Source" value={order.source} />
          <DetailLine label="Produit" value={order.product} />
          <DetailLine label="Prix" value={money(order.price)} />
          <DetailLine label="Date" value={formatDate(order.date_commande)} />
          <DetailLine label="Code colis" value={order.code_colis || 'Sans code'} />
          <DetailLine label="Livraison" value={order.statut_livraison || 'Pas encore envoyé'} />
        </div>

        <div className="actions modal-actions">
          <a className="whatsapp" href={whatsappLink(order)} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="call" href={callLink(order)}>
            Appeler
          </a>
          <button type="button" onClick={onClose}>
            Fermer
          </button>
        </div>
      </section>
    </div>
  )
}

function DetailLine({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default App
