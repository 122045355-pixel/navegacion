import { Platform } from 'react-native';

const DEFAULT_HOST = Platform.OS === 'web' ? 'localhost' : '10.86.100.240';
const DEFAULT_PORT = '5000';

let apiHost = DEFAULT_HOST;
let apiPort = DEFAULT_PORT;

function limpiarHost(valor = '') {
  return String(valor)
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/$/, '')
    .split(':')[0];
}

function limpiarPuerto(valor = '') {
  const puerto = String(valor).trim();
  return /^\d{1,5}$/.test(puerto) ? puerto : DEFAULT_PORT;
}

export function setApiConnection(host, port = DEFAULT_PORT) {
  const hostLimpio = limpiarHost(host);

  if (!hostLimpio) {
    throw new Error('La dirección IP o host no puede estar vacía');
  }

  apiHost = hostLimpio;
  apiPort = limpiarPuerto(port);

  return getApiBaseUrl();
}

export function getApiConnection() {
  return {
    host: apiHost,
    port: apiPort,
    url: getApiBaseUrl(),
  };
}

export function getApiBaseUrl() {
  return `http://${apiHost}:${apiPort}`;
}

export function resetApiConnection() {
  apiHost = DEFAULT_HOST;
  apiPort = DEFAULT_PORT;
  return getApiConnection();
}
