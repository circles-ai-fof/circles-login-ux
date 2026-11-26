# Circles Ai — pantalla de acceso (demostración)

Pantalla de inicio de sesión con UX cuidada y la identidad visual de Circles Ai. Es una demostración estática: **no se envían ni se recolectan credenciales** en ningún servidor. El envío del formulario simula el acceso en el navegador.

## Credenciales de demostración

- Correo: `demo@circles-ai.ai`
- Contraseña: `Demo1234`

Cualquier otra combinación muestra un error amable. Si activas «Recordarme», solo se guarda el correo en `localStorage` del navegador (nunca la contraseña).

## Qué incluye

- Layout dividido: panel de marca a la izquierda y formulario a la derecha. En móvil, solo el formulario con cabecera compacta.
- Campos de correo y contraseña con etiquetas visibles.
- Mostrar u ocultar contraseña.
- Aviso de Bloq Mayús.
- Validación en línea (sin gritar hasta que el campo pierde el foco o se envía el formulario).
- Botón con estado de carga.
- «Recordarme» y «¿Olvidaste tu contraseña?» (este último explica que es una demo).
- Mensajes de error claros, en español de Ecuador.
- Accesibilidad: contraste AA, foco visible, `aria`, navegación por teclado, `autocomplete` correcto.
- Modo oscuro automático (`prefers-color-scheme`).
- Microanimaciones sutiles, respetando `prefers-reduced-motion`.

## Cómo verla en local

Abre `index.html` en el navegador o sirve la carpeta:

```bash
python3 -m http.server 4173
```

Luego visita `http://localhost:4173`.

## Despliegue

Sitio estático listo para Vercel. No requiere build ni variables de entorno.
