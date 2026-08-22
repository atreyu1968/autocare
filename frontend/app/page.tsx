export default function Home() {
  const tasks = [
    { name: "Cambio de aceite 5W40", status: "Próximo", km: "5.000 km", color: "yellow" },
    { name: "Bujías de iridio", status: "Pendiente", km: "Vencido", color: "red" },
    { name: "Líquido de frenos DOT 4", status: "Correcto", km: "18.000 km", color: "green" }
  ];

  return (
    <main className="shell">
      <section className="card">
        <p className="eyebrow">AUTOCARE DASHBOARD</p>
        <h1>Nissan Qashqai J10</h1>
        <p className="lead">Motor MR20DE · Gasolina · 220.000 km</p>

        <div className="status">
          <span className="dot" aria-hidden="true" />
          Estado general: 87/100 · Bueno
        </div>

        <div className="grid">
          {tasks.map((task) => (
            <article className="card item" key={task.name}>
              <h2>{task.name}</h2>
              <p>{task.status}</p>
              <strong>{task.km}</strong>
              <small>{task.color}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
