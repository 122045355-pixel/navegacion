import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import {
  getApiConnection,
  setApiConnection,
  resetApiConnection,
} from '../../config/apiConfig';

export default function ConfiguracionApiScreen() {
  const actual = getApiConnection();
  const [host, setHost] = useState(actual.host);
  const [port, setPort] = useState(actual.port);
  const [urlActual, setUrlActual] = useState(actual.url);
  const [probando, setProbando] = useState(false);

  const mensaje = (titulo, texto) => {
    if (Platform.OS === 'web') alert(`${titulo}\n\n${texto}`);
    else Alert.alert(titulo, texto);
  };

  const guardar = () => {
    try {
      const url = setApiConnection(host, port);
      const datos = getApiConnection();
      setHost(datos.host);
      setPort(datos.port);
      setUrlActual(url);
      mensaje('Configuración guardada', `La API ahora apunta a ${url}`);
    } catch (error) {
      mensaje('Dirección inválida', error.message);
    }
  };

  const probar = async () => {
    try {
      const url = setApiConnection(host, port);
      setUrlActual(url);
      setProbando(true);
      const respuesta = await fetch(`${url}/v1/usuarios/`);
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      mensaje('Conexión correcta', `La API respondió desde ${url}`);
    } catch (error) {
      mensaje('Sin conexión', `No fue posible conectar con la API.\n${error.message}`);
    } finally {
      setProbando(false);
    }
  };

  const restaurar = () => {
    const datos = resetApiConnection();
    setHost(datos.host);
    setPort(datos.port);
    setUrlActual(datos.url);
    mensaje('Restaurado', `Se restauró ${datos.url}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Configuración de API</Text>
        <Text style={styles.descripcion}>
          Cambia la dirección cuando la computadora que ejecuta la API tenga una IP diferente.
        </Text>

        <Text style={styles.label}>Dirección IP o host</Text>
        <TextInput
          style={styles.input}
          value={host}
          onChangeText={setHost}
          placeholder="Ej. 192.168.1.25"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Puerto</Text>
        <TextInput
          style={styles.input}
          value={port}
          onChangeText={setPort}
          placeholder="5000"
          keyboardType="numeric"
        />

        <Text style={styles.actual}>Conexión actual: {urlActual}</Text>

        <Pressable style={styles.botonGuardar} onPress={guardar}>
          <Text style={styles.textoBoton}>Guardar dirección</Text>
        </Pressable>
        <Pressable style={styles.botonProbar} onPress={probar} disabled={probando}>
          <Text style={styles.textoBoton}>{probando ? 'Probando...' : 'Probar conexión'}</Text>
        </Pressable>
        <Pressable style={styles.botonRestaurar} onPress={restaurar}>
          <Text style={styles.textoRestaurar}>Restaurar valor inicial</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#FFFFFF', padding: 22, borderRadius: 15, elevation: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 5, shadowOffset: { width: 0, height: 3 } },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: 10 },
  descripcion: { fontSize: 15, color: '#6B7280', lineHeight: 21, marginBottom: 22, textAlign: 'center' },
  label: { fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 7 },
  input: { height: 50, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, backgroundColor: '#F9FAFB', paddingHorizontal: 14, fontSize: 16, marginBottom: 16 },
  actual: { color: '#4B5563', marginBottom: 20, textAlign: 'center' },
  botonGuardar: { backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  botonProbar: { backgroundColor: '#29bb0c', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  botonRestaurar: { paddingVertical: 12, alignItems: 'center' },
  textoBoton: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  textoRestaurar: { color: '#6B7280', fontSize: 15, fontWeight: '600' },
});
