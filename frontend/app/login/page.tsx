"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="shell">
      <section className="card">
        <p className="eyebrow">AUTOCARE</p>
        <h1>Acceso al vehículo</h1>
        <p className="lead">
          Introduce tus credenciales para acceder al historial y mantenimiento.
        </p>

        <form className="form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
      </section>
    </main>
  );
}
