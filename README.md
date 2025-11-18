# Villa Gym Colima — Landing (Plantilla)

Plantilla de landing para Villa Gym Colima. Está pensada como propuesta de diseño y maquetación estática para presentar en GitHub.

Arquitectura:

- `index.html` — HTML semántico y contenido principal.
- `styles.css` — Estilos con variables CSS y responsive.
- `script.js` — Validación de formulario, efectos parallax y carrusel.
- `images/` — Recursos de imagen (placeholders y fotos).

Cómo usar:

1. Clona o descarga el repositorio.
2. Abre `index.html` en tu navegador o sirve la carpeta con un servidor estático.

Ejemplo (PowerShell):

```powershell
cd 'C:\Users\RAHER\Documents\villagym_landing'
start .\index.html
```

Notas importantes:

- La imagen de portada está en `images/logo.jpg` (se usa como `--cover-img` en CSS). Reemplaza esa imagen por la foto de portada que prefieras.
- El carrusel de la sección de ubicación utiliza `images/location/villagymlocation.jpg` y `villagymlocation2.jpg`. Sustituye por fotos reales si lo deseas.
- Para usar Google Maps con marcador o comportamiento avanzado, añade una API key y cambia el iframe por la Google Maps JS API.

Siguientes pasos recomendados:

- Reemplazar placeholders SVG por fotos reales optimizadas (webp).
- Integrar el formulario con Mailchimp, Google Forms o una endpoint propio.
- Añadir CI (GitHub Pages) para publicar la landing.

Licencia: MIT (archivo LICENSE incluido).
