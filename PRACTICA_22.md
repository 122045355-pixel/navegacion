# Práctica No. 22 - APK e Instalación en Android

## Objetivo
Investigar y aplicar el proceso necesario para generar un archivo APK de una aplicación desarrollada con React Native utilizando Expo y Expo Application Services (EAS), además de personalizar el nombre, icono y pantalla de carga de la aplicación.

## Implementación realizada en el proyecto

Se preparó el proyecto `navegacion` para poder compilar una versión instalable de Android mediante EAS Build.

### 1. Configuración de la aplicación
Se actualizó `app.json` para definir:
- Nombre visible: `Navegacion Usuarios`.
- Slug: `navegacion-usuarios`.
- Icono principal: `./assets/icon.png`.
- Splash screen: `./assets/splash-icon.png`.
- Color de fondo del splash: `#F5F7FA`.
- Identificador Android: `com.emiliano.navegacionusuarios`.
- `versionCode` de Android: `1`.
- Identificador iOS equivalente para mantener una configuración consistente.

### 2. Configuración de EAS Build
Se agregó `eas.json` con tres perfiles:

- `development`: compilación APK para desarrollo con development client.
- `preview`: compilación APK de distribución interna. Este es el perfil utilizado para obtener el APK instalable de la práctica.
- `production`: compilación AAB para una futura publicación en Google Play.

### 3. Scripts de compilación
Se agregaron los siguientes scripts a `package.json`:

```bash
npm run eas:configure
npm run build:apk
npm run build:android
```

`npm run build:apk` utiliza el perfil `preview` y genera un APK. `npm run build:android` utiliza el perfil `production` y genera un Android App Bundle (AAB).

## Procedimiento para generar el APK

1. Descargar/cambiar a la rama del proyecto y actualizarla:

```bash
git switch agent/adapt-user-crud
git pull origin agent/adapt-user-crud
npm install
```

2. Instalar EAS CLI globalmente:

```bash
npm install -g eas-cli
```

También se puede ejecutar EAS con `npx eas-cli` si no se desea instalar globalmente.

3. Crear una cuenta de Expo desde el sitio oficial de Expo si todavía no se cuenta con una.

4. Iniciar sesión desde la terminal:

```bash
eas login
```

5. Verificar la sesión:

```bash
eas whoami
```

6. Configurar/vincular el proyecto con EAS cuando se ejecute por primera vez:

```bash
eas build:configure
```

Si EAS modifica `app.json` agregando un `projectId`, se debe conservar ese cambio.

7. Generar el APK instalable:

```bash
npm run build:apk
```

Equivale a:

```bash
eas build --platform android --profile preview
```

8. Esperar a que EAS termine la compilación. Al finalizar se mostrará un enlace a la compilación desde donde se puede descargar el APK.

9. Abrir el enlace desde el dispositivo Android o transferir el APK al teléfono. Permitir la instalación de aplicaciones desde esa fuente cuando Android lo solicite e instalar el archivo.

## Cuestionario

### a) ¿Qué es Expo Application Services (EAS)?
EAS es el conjunto de servicios en la nube de Expo para desarrollar, compilar, enviar y actualizar aplicaciones Expo y React Native. Para esta práctica se utiliza principalmente EAS Build, que realiza la compilación de la aplicación Android.

### b) ¿Qué diferencia existe entre Expo Go y un APK?
Expo Go es una aplicación de desarrollo que permite ejecutar proyectos Expo durante el desarrollo sin instalar una compilación independiente del proyecto. Un APK es un paquete Android instalable que corresponde a una aplicación compilada y puede instalarse directamente en un dispositivo compatible.

### c) ¿Qué es EAS CLI y cómo se instala?
EAS CLI es la herramienta de línea de comandos para interactuar con los servicios EAS. Se puede instalar con:

```bash
npm install -g eas-cli
```

### d) ¿Cómo crear una cuenta en Expo?
Se crea una cuenta desde el sitio web oficial de Expo mediante la opción de registro. La misma cuenta se utiliza posteriormente desde EAS CLI.

### e) ¿Cómo iniciar sesión desde la terminal?

```bash
eas login
```

Para comprobar el usuario autenticado:

```bash
eas whoami
```

### f) ¿Cómo configurar un proyecto para utilizar EAS Build?
Después de instalar EAS CLI e iniciar sesión se ejecuta:

```bash
eas build:configure
```

Además, el proyecto puede utilizar un archivo `eas.json` para definir sus perfiles de compilación.

### g) ¿Cuál es la diferencia entre un archivo APK y un AAB?
APK es un paquete que Android puede instalar directamente. AAB (Android App Bundle) es el formato orientado a distribución mediante Google Play; la tienda utiliza el bundle para generar APK optimizados para cada dispositivo.

### h) ¿Qué perfiles de compilación existen (development, preview y production)?
En este proyecto se configuraron:
- `development`: para desarrollo y pruebas con development client.
- `preview`: para distribución interna; genera el APK instalable usado en la práctica.
- `production`: para la versión destinada a publicación; genera un AAB.

Los nombres de perfiles son configurables en `eas.json`, pero estos tres representan una organización común recomendada para separar desarrollo, pruebas y producción.

### i) ¿Cómo generar un APK utilizando EAS Build?
En este proyecto se ejecuta:

```bash
npm run build:apk
```

El comando ejecuta internamente:

```bash
eas build --platform android --profile preview
```

El perfil `preview` contiene `android.buildType: apk`, por lo que EAS genera un APK en lugar de un AAB.

### j) ¿Cómo descargar e instalar el APK generado en un dispositivo Android?
Al finalizar EAS Build se proporciona una página/enlace de la compilación. Desde ella se descarga el APK. El archivo puede abrirse en el dispositivo Android y el sistema solicitará autorización para instalar aplicaciones procedentes de esa fuente si todavía no se ha concedido. Después de autorizarla, se continúa con la instalación.

## Evidencia sugerida
Para cumplir el entregable, la grabación debe comenzar mostrando el fondo de pantalla del teléfono y posteriormente mostrar la aplicación instalada y funcionando. Conviene demostrar al menos la apertura de la aplicación y las operaciones principales implementadas en la práctica anterior.

## Archivos agregados o modificados para la práctica 22
- `app.json`: personalización y configuración Android/iOS.
- `eas.json`: perfiles EAS Build.
- `package.json`: comandos para configurar EAS y generar APK/AAB.
- `PRACTICA_22.md`: documentación de la práctica y cuestionario.

## Resultado
El repositorio queda preparado para generar un APK Android instalable mediante EAS Build. La compilación final requiere autenticar la cuenta Expo del alumno y ejecutar `npm run build:apk` desde una computadora con acceso a Internet.
