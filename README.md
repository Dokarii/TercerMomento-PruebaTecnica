# SubZen Subscription Manager

Una aplicación web moderna y funcional para gestionar suscripciones digitales, desarrollada como prueba técnica para el cargo de Desarrollador Front-End Junior en SubZen S.A.S.

## 🚀 Características Principales

### Funcionalidades Core
- **Sistema de Autenticación**: Login y registro de usuarios con validación
- **Gestión Completa de Suscripciones**: CRUD completo (Crear, Leer, Actualizar, Eliminar)
- **Dashboard Intuitivo**: Panel principal con estadísticas y resumen financiero
- **Búsqueda y Filtrado**: Encuentra suscripciones por nombre o categoría
- **Protección de Rutas**: Acceso restringido a usuarios autenticados
- **Confirmaciones de Seguridad**: SweetAlert2 para operaciones críticas

### Características Técnicas
- **React 18** con TypeScript
- **React Router DOM** para navegación
- **Context API** para manejo de estado global
- **API REST** simulada con json-server
- **Tailwind CSS** para estilos modernos
- **Lucide React** para iconografía
- **SweetAlert2** para notificaciones elegantes

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca principal de UI
- **TypeScript** - Tipado estático
- **React Router DOM 6.26.1** - Enrutamiento
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Iconos modernos
- **SweetAlert2** - Modales y alertas elegantes

### Backend Simulado
- **json-server 0.17.4** - API REST mock
- **Base de datos JSON** - Simulación de backend

### Herramientas de Desarrollo
- **Vite** - Build tool y dev server
- **ESLint** - Linting de código
- **PostCSS & Autoprefixer** - Procesamiento de CSS

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout.tsx      # Layout principal con header
│   ├── ProtectedRoute.tsx  # HOC para protección de rutas
│   ├── SubscriptionCard.tsx  # Tarjeta de suscripción
│   └── SubscriptionModal.tsx # Modal para CRUD
├── context/            # Contextos de React
│   └── AuthContext.tsx # Manejo de autenticación
├── pages/              # Páginas principales
│   ├── LoginPage.tsx   # Página de inicio de sesión
│   ├── RegisterPage.tsx # Página de registro
│   └── DashboardPage.tsx # Dashboard principal
├── services/           # Servicios y API
│   └── api.ts         # Cliente de API
├── types/             # Definiciones de TypeScript
│   └── index.ts       # Interfaces y tipos
└── App.tsx            # Componente raíz
```

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd SubZen-subscription-manager
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
```

4. **Ejecutar el servidor JSON (en otra terminal)**
```bash
npm run server
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run server` - Inicia json-server en puerto 3001
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta ESLint

## 👤 Cuentas de Prueba

La aplicación incluye cuentas de demostración:

- **Administrador**: `admin@SubZen.com` / `admin123`
- **Usuario Demo**: `demo@SubZen.com` / `demo123`

## 🎨 Diseño y UX

### Principios de Diseño
- **Diseño Moderno**: Gradientes, glass morphism y micro-interacciones
- **Responsive**: Adaptable a móvil, tablet y desktop
- **Accesibilidad**: Contrastes adecuados y navegación por teclado
- **Consistencia**: Sistema de colores y tipografía uniforme

### Sistema de Colores
- **Primario**: Azul (#3B82F6)
- **Secundario**: Esmeralda (#10B981) 
- **Acento**: Naranja (#F97316)
- **Estados**: Verde, Amarillo y Rojo para éxito, advertencia y error

## 📊 Funcionalidades Detalladas

### Autenticación
- Login con email y contraseña
- Registro de nuevos usuarios
- Validación de formularios
- Persistencia de sesión con localStorage
- Protección automática de rutas

### Gestión de Suscripciones
- **Crear**: Agregar nuevas suscripciones con todos los datos
- **Leer**: Visualizar lista completa con tarjetas informativas
- **Actualizar**: Editar suscripciones existentes
- **Eliminar**: Borrar con confirmación de seguridad

### Dashboard
- **Estadísticas**: Costo mensual, anual y renovaciones próximas
- **Búsqueda**: Filtro por nombre o categoría
- **Categorización**: Entertainment, Music, Design, etc.
- **Estados**: Activo, Inactivo, Cancelado
- **Alertas**: Notificaciones de vencimientos próximos

## 🔧 API y Datos

### Endpoints Disponibles
- `GET /users` - Obtener usuarios
- `POST /users` - Crear usuario
- `GET /subscriptions?userId=<id>` - Obtener suscripciones del usuario
- `POST /subscriptions` - Crear suscripción
- `PUT /subscriptions/<id>` - Actualizar suscripción
- `DELETE /subscriptions/<id>` - Eliminar suscripción

### Modelo de Datos

**Usuario**
```typescript
interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}
```

**Suscripción**
```typescript
interface Subscription {
  id?: number;
  userId: number;
  name: string;
  cost: number;
  category: string;
  renewalDate: string;
  status: 'active' | 'inactive' | 'cancelled';
  description?: string;
}
```

## 🧪 Características Avanzadas

### Optimizaciones de Performance
- Lazy loading de componentes
- Memoización de cálculos costosos
- Debounce en búsquedas
- Virtualización de listas largas

### Manejo de Estados
- Context API para autenticación global
- Estados locales con useState
- Efectos con useEffect para ciclo de vida
- Validaciones de formularios en tiempo real

### Experiencia de Usuario
- Loading states y feedback visual
- Animaciones suaves con CSS
- Responsive design mobile-first
- Modo oscuro/claro (opcional)

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Consideraciones de Despliegue
- Variables de entorno para URLs de API
- Optimización de assets
- Compresión gzip
- Service Workers para cache (opcional)

## 📋 Requisitos Técnicos Cumplidos

### ✅ React JS
- [x] useState para manejo de estado
- [x] useEffect para ciclo de vida
- [x] Props para comunicación entre componentes  
- [x] react-router-dom para navegación

### ✅ JavaScript ES6+
- [x] Funciones flecha y destructuring
- [x] Async/await para operaciones asíncronas
- [x] Manipulación de arrays y objetos
- [x] Módulos ES6 con import/export

### ✅ Consumo de API
- [x] Fetch para interactuar con API REST
- [x] Manejo de errores y loading states
- [x] Operaciones CRUD completas

### ✅ HTML y CSS
- [x] Maquetación semántica
- [x] Estilos modernos con Tailwind CSS
- [x] Responsive design
- [x] Accesibilidad básica

### ✅ Arquitectura
- [x] Separación clara de componentes
- [x] Services para lógica de API
- [x] Context para estado global
- [x] Types para definiciones TypeScript

## 👨‍💻 Ricardo Tejedor Anaya
Prueba técnica - Desarrollador Front-End II
