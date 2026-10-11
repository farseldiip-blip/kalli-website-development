'use client'

import { useEffect, useMemo, useState } from 'react'

const logoUrl = '/images/kalli-wordmark.png'
const interiorUrl = '/images/photos/kalli-inside.png'
const heroUrl = '/images/photos/hero.jpg'

const menu = [
  { name: 'Espresso', category: 'Hot drinks', description: 'A short, intense coffee with a deep roasted finish.', price: '85 EGP', image: '/images/menu/espresso.jpg', alt: 'Small cup of dark espresso on a wooden table' },
  { name: 'Cappuccino', category: 'Hot drinks', description: 'Rich coffee balanced with a soft layer of milk foam.', price: '115 EGP', image: '/images/menu/cappuccino.jpg', alt: 'Cappuccino with a thick layer of milk foam' },
  { name: 'Iced latte', category: 'Cold drinks', description: 'Cold coffee and milk served bright, smooth, and easy.', price: '125 EGP', image: '/images/menu/iced-latte.jpg', alt: 'Iced latte in a clear glass with coffee and milk layers' },
  { name: 'Fresh lemonade', category: 'Cold drinks', description: 'A cool citrus drink with a clean, sharp finish.', price: '95 EGP', image: '/images/menu/fresh-lemonade.jpg', alt: 'Bright citrus salad used as an approximate visual match for fresh lemonade' },
  { name: 'Omelette', category: 'Breakfast', description: 'A warm, simple breakfast plate made for slow mornings.', price: '145 EGP', image: '/images/menu/omelette.jpg', alt: 'Fresh breakfast salad used as an approximate visual match for an omelette' },
  { name: 'Pancakes', category: 'Breakfast', description: 'Soft golden pancakes with a lightly sweet finish.', price: '155 EGP', image: '/images/menu/pancakes.jpg', alt: 'Stack of golden pancakes' },
  { name: 'Grilled chicken', category: 'Main dishes', description: 'Tender grilled chicken served hot with familiar comfort.', price: '275 EGP', image: '/images/menu/grilled-chicken.jpg', alt: 'Grilled chicken breast with herbs on a plate' },
  { name: 'Pasta', category: 'Main dishes', description: 'A warm pasta plate with a rich, satisfying finish.', price: '230 EGP', image: '/images/menu/pasta.jpg', alt: 'Pasta with sauce in a ceramic bowl' },
  { name: 'Cheesecake', category: 'Desserts', description: 'A smooth, creamy slice with a delicate sweet finish.', price: '145 EGP', image: '/images/menu/cheesecake.jpg', alt: 'Slice of creamy cheesecake on a plate' },
  { name: 'Brownie', category: 'Desserts', description: 'A dark chocolate square, soft in the middle and warm.', price: '120 EGP', image: '/images/menu/brownie.jpg', alt: 'Dark chocolate brownie squares' },
]

const hours = Array.from({ length: 18 }, (_, i) => (i + 8) % 24)

function getCairoHour() {
  return Number(new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Cairo', hour: 'numeric', hour12: false }).format(new Date()))
}

function Frame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`kalli-frame ${className}`}>{children}</div>
}

function Header() {
  return (
    <header className="site-header">
      <a href="#top" className="brand-link"><img src={logoUrl} alt="Kalli restaurant and café" /></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#about">About</a><a href="#menu">Menu</a><a href="#gallery">Gallery</a><a href="#visit">Visit</a>
      </nav>
      <button className="lang-button" aria-label="Switch to Arabic">ع</button>
    </header>
  )
}

function HoursBar({ compact = false }: { compact?: boolean }) {
  const [hour, setHour] = useState<number | null>(null)
  useEffect(() => { setHour(getCairoHour()); const timer = window.setInterval(() => setHour(getCairoHour()), 60000); return () => window.clearInterval(timer) }, [])
  const open = hour !== null && (hour >= 8 || hour < 2)
  return <div className={`hours-wrap ${compact ? 'compact' : ''}`}>
    <div className="hours-bar" aria-label="Open daily from 8 AM to 2 AM">{hours.map((item) => <span key={item} className={hour !== null && open && (item < hour || (hour < 2 && item >= 8)) ? 'past' : hour === item ? 'current' : ''} />)}</div>
    <div className="hours-labels"><span>8 AM</span><span>12 PM</span><span>6 PM</span><span>12 AM</span><span>2 AM</span></div>
    {!compact && <p className="status">{hour === null ? 'Open daily, 8 AM to 2 AM' : open ? 'Open now, until 2 AM' : 'Closed now, opens at 8 AM'}</p>}
  </div>
}

function MenuCard({ item }: { item: typeof menu[number] }) {
  return <article className="menu-card"><Frame><img src={item.image} alt={item.alt} /></Frame><div className="menu-card-copy"><h3>{item.name}</h3><p>{item.description}</p><strong>{item.price}</strong></div></article>
}

export default function KalliSite() {
  const [active, setActive] = useState('All')
  const filtered = useMemo(() => active === 'All' ? menu : menu.filter((item) => item.category === active), [active])
  return <div id="top" className="kalli-site">
    <Header />
    <main>
      <section className="hero content-shell">
        <div className="hero-copy"><div className="hero-numerals"><span>8 AM</span><i>Every day.</i><strong>2 AM</strong></div><p className="hero-subline">Kalli restaurant &amp; café, in front of Toshka Gate, Mansoura.</p><div className="button-row"><a className="button primary" href="#menu">See the menu</a><a className="button secondary" href="#visit">Find us</a></div><HoursBar /></div>
        <Frame className="hero-image"><img src={heroUrl} alt="Moody cafe interior with warm pendant lights and a quiet wooden bar" /></Frame>
      </section>

      <section id="about" className="statement content-shell"><div><p className="kicker">KALLI / MANSOURA</p><h2>In front of<br /><em>Toshka Gate.</em></h2><p>Restaurant and café, open every day from 8 AM to 2 AM.</p><a className="text-link" href="https://maps.google.com/?q=Kalli+Restaurant+%26+Cafe+Mansoura+Toshka+Gate">Get directions</a></div><Frame className="statement-photo"><img src={interiorUrl} alt="Seating area and wood tables inside Kalli in Mansoura" /></Frame></section>

      <section className="inside content-shell"><div className="section-heading"><p className="kicker">INSIDE KALLI</p><h2>Made for the<br /><em>long hours.</em></h2></div><div className="inside-grid"><Frame><img src={interiorUrl} alt="Kalli dining room with glowing rectangular frames on a concrete wall" /></Frame><Frame className="offset-frame"><img src="/images/photos/inside-detail.jpg" alt="Warm cafe interior detail with dark wood and soft light" /></Frame></div><p className="caption">Concrete wall, brass lamps, wooden tables, and three lit frames.</p></section>

      <section id="menu" className="menu-section"><div className="content-shell"><div className="section-heading light"><p className="kicker">THE MENU</p><h2>Drinks, food,<br /><em>and everything between.</em></h2><p>Prices in EGP.</p></div><div className="filter-row" role="tablist">{['All', 'Drinks', 'Food', 'Desserts'].map((tab) => <button key={tab} className={active === tab ? 'active' : ''} onClick={() => setActive(tab)}>{tab}</button>)}</div><div className="menu-grid">{filtered.slice(0, 6).map((item) => <MenuCard key={item.name} item={item} />)}</div><a className="button primary light-button" href="#full-menu">See the full menu</a></div></section>

      <section id="gallery" className="gallery content-shell"><div className="section-heading"><p className="kicker">A LOOK INSIDE</p><h2>Come in.</h2></div><div className="gallery-grid"><Frame><img src={interiorUrl} alt="Wide view of Kalli's dining room with teal seating and wood tables" /></Frame><Frame><img src="/images/photos/inside-window.jpg" alt="Cafe seating seen beside a warmly lit window" /></Frame><Frame><img src="/images/photos/coffee-making.jpg" alt="Coffee being prepared in a warmly lit cafe" /></Frame></div><a className="text-link" href="#gallery">See all photos</a></section>

      <section id="visit" className="visit"><div className="content-shell visit-inner"><div><p className="kicker">VISIT KALLI</p><h2>Come in.</h2><p>In front of Toshka Gate,<br />Mansoura, Egypt</p><a className="button primary" href="https://maps.google.com/?q=Kalli+Restaurant+%26+Cafe+Mansoura+Toshka+Gate">Get directions</a></div><div><HoursBar compact /><a className="social-link" href="https://www.instagram.com/kallicafe.eg/">Instagram <span>@kallicafe.eg</span></a></div></div></section>
    </main>
    <footer><div className="content-shell footer-inner"><img src={logoUrl} alt="Kalli restaurant and café" /><p>Every day<br />8 AM — 2 AM</p><p>In front of Toshka Gate<br />Mansoura, Egypt</p><a href="https://www.instagram.com/kallicafe.eg/">@kallicafe.eg</a></div></footer>
    <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#top">Home</a><a href="#about">About</a><a className="mobile-active" href="#menu">Menu</a><a href="#gallery">Gallery</a><a href="#visit">Visit</a></nav>
  </div>
}

export { menu }
