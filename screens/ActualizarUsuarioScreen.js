import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getApiBaseUrl } from '../config/apiConfig';

export default function ActualizarUsuarioScreen() {
  const router = useRouter();
  const { id, _id, nombre, edad } = useLocalSearchParams();
  const registroId = id ?? _id;
  const [nombreActualizado, setNombreActualizado] = useState(String(nombre ?? ''));
  const [edadActualizada, setEdadActualizada] = useState(String(edad ?? ''));
  const [guardando, setGuardando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => Platform.OS === 'web' ? alert(`${titulo}\n\n${mensaje}`) : Alert.alert(titulo, mensaje);

  const actualizarUsuario = async () => {
    if (!registroId) return mostrarMensaje('Error', 'No se encontró el identificador del usuario');
    if (nombreActualizado.trim() === '' || edadActualizada.trim() === '') return mostrarMensaje('Campos vacíos', 'Complete el nombre y la edad');
    const edadNumero = Number(edadActualizada.trim());
    if (!Number.isFinite(edadNumero)) return mostrarMensaje('Edad inválida', 'Ingrese una edad válida');

    try {
      setGuardando(true);
      const respuesta = await fetch(`${getApiBaseUrl()}/v1/usuarios/${registroId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombreActualizado.trim(), edad: edadNumero }),
      });
      if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
      mostrarMensaje('Usuario actualizado', 'Los datos fueron actualizados correctamente');
      router.replace('/consulta');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      mostrarMensaje('Error', `No fue posible conectar con ${getApiBaseUrl()}`);
    } finally { setGuardando(false); }
  };

  return (
    <SafeAreaView style={styles.container}><Text style={styles.titulo}>Actualizar Usuario</Text><View style={styles.card}>
      <Text style={styles.etiqueta}>Nombre</Text><TextInput style={styles.input} placeholder="Nombre del usuario" value={nombreActualizado} onChangeText={setNombreActualizado} />
      <Text style={styles.etiqueta}>Edad</Text><TextInput style={styles.input} placeholder="Edad del usuario" keyboardType="numeric" value={edadActualizada} onChangeText={setEdadActualizada} />
      <Pressable style={[styles.botonGuardar, guardando && styles.botonDeshabilitado]} onPress={actualizarUsuario} disabled={guardando}><Text style={styles.textoBoton}>{guardando ? 'Guardando...' : 'Guardar cambios'}</Text></Pressable>
    </View></SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 }, titulo: { fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#1F2937', marginBottom: 20 }, card: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 20, elevation: 4, shadowColor: '#000000', shadowOpacity: 0.15, shadowRadius: 5, shadowOffset: { width: 0, height: 3 } }, etiqueta: { fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 7 }, input: { height: 50, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, backgroundColor: '#F9FAFB', paddingHorizontal: 14, fontSize: 16, marginBottom: 18 }, botonGuardar: { backgroundColor: '#FACC15', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 5 }, botonDeshabilitado: { opacity: 0.6 }, textoBoton: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
