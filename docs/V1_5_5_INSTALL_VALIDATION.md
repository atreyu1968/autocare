# AutoCare v1.5.5 — Validación automática de instalación

## Objetivo
Preparar la validación del despliegue antes de una beta con usuarios reales.

## Comprobaciones previstas

- disponibilidad de servicios;
- conexión base de datos;
- variables de entorno;
- salud del backend;
- comunicación entre módulos;
- persistencia de datos.

## Flujo de validación

Instalación limpia → comprobaciones automáticas → pruebas funcionales → candidato beta.

## Criterio de aceptación

No avanzar a usuarios reales hasta disponer de un entorno reproducible y verificable.