import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { getApiBaseUrl } from '../config/apiConfig';

export default function ConsultaUsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const router = useRouter();

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch(`${getApiBaseUrl()}/v1/usuarios/`);
      if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
      const datos = await respuesta.json();
      console.log('Usuarios recibidos:', datos);
      setUsuarios(Array.isArray(datos.usuarios) ? datos.usuarios : []);
    } catch (error) {
      console.error(`Error al obtener usuarios desde ${getApiBaseUrl()}:`, error);
    }
  };

  useEffect(() => { obtenerUsuarios(); }, []);

  const verDetalles = (usuario) => {
    const usuarioId = usuario.id ?? usuario._id;
    if (usuarioId == null) return;
    router.push({ pathname: '/detalleUsuario', params: { id: String(usuarioId), nombre: String(usuario.nombre ?? ''), edad: String(usuario.edad ?? '') } });
  };

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <View style={styles.linea} />
      <Text style={styles.info}>Edad: {item.edad} años</Text>
      <Pressable style={styles.botonDetalles} onPress={() => verDetalles(item)}><Text style={styles.textoDetalles}>Ver detalles</Text></Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>
      <Pressable style={styles.botonRecargar} onPress={obtenerUsuarios}><Text style={styles.textoRecargar}>Recargar</Text></Pressable>
      <FlatList data={usuarios} keyExtractor={(item, index) => String(item.id ?? item._id ?? index)} renderItem={renderTarjeta} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1F2937', marginBottom: 10 },
  botonRecargar: { alignSelf: 'center', padding: 8, marginBottom: 10 },
  textoRecargar: { color: '#2563EB', fontWeight: '600' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 18, marginBottom: 15, elevation: 4, shadowColor: '#000000', shadowOpacity: 0.15, shadowRadius: 5, shadowOffset: { width: 0, height: 3 } },
  nombre: { fontSize: 20, fontWeight: 'bold', color: '#2563EB' },
  linea: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 10 },
  info: { fontSize: 16, color: '#4B5563' },
  botonDetalles: { alignSelf: 'flex-end', marginTop: 15, paddingVertical: 5, paddingHorizontal: 5 },
  textoDetalles: { fontSize: 15, color: '#2563EB', fontWeight: '600' },
});
