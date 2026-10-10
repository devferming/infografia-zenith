# Prácticas digitales emergentes — Infografía interactiva

Versión web interactiva de la infografía *“Comprendiendo las prácticas emergentes contemporáneas del ser humano y la tecnología”*. Hecha con **React 18 + Vite**, sin librerías extra (todas las animaciones son CSS y hooks propios).

## Interacciones

| Sección | Interacción |
|---|---|
| Inicio | Título animado, íconos en órbita con parallax del mouse; al tocarlos muestran un dato |
| 1 · ¿Qué son? | Palabras clave de la definición que activan escenas de chat animadas en un teléfono 3D (inclinación con el mouse) |
| 2 · Transformaciones | Tarjetas 3D que se giran: idea ↔ ejemplo cotidiano + pregunta; contador de exploradas |
| 3 · Oportunidades y riesgos | Balanza física que se inclina según lo que agregues; evaluador de criterios UNESCO con medidor y confeti |
| 4 · Ejercicio profesional | Competencias con anillo de progreso; deslizador tecnología ↔ interacción humana con diagrama de Venn |
| 5 · Conclusión | Retos desplegables, votación de la pregunta reflexiva y “termómetro de uso consciente” con perfil |
| ★ Reto final | Quiz de 5 preguntas con retroalimentación, mejor marca guardada y opción de compartir |
| Global | Barra de progreso, navegación por secciones (lateral en escritorio, inferior en móvil), modo claro/oscuro, resaltado de citas por autor en toda la página |

Accesible con teclado, respeta `prefers-reduced-motion` y se adapta a móvil.

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera /dist
npm run preview
```

## Despliegue en Netlify

1. Sube el repositorio a GitHub.
2. En Netlify: **Add new site → Import an existing project** y elige el repo.
3. La configuración ya está en `netlify.toml` (build `npm run build`, carpeta `dist`, Node 20). Solo pulsa **Deploy**.

## Estructura

```
src/
  App.jsx            # layout, tema, toasts, confeti, resaltado de autores
  data.js            # todo el contenido (textos, citas, quiz)
  hooks.js           # hooks: reveal, progreso, tilt 3D, localStorage
  styles.css         # diseño completo (tokens claro/oscuro)
  components/        # una sección por archivo
```

Para editar textos, preguntas del quiz o citas, modifica `src/data.js`.

## Fuentes citadas

Cárdenas Obregón (2020) · Zayed (2021) · Hällgren (2019) · UNESCO (2023)
