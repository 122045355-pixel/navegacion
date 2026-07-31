import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';

import { useRouter } from 'expo-router';

export default function ConsultaUsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);

  const router = useRouter();

  const API_BASE_URL =
    Platform.OS === 'web'
      ? 'http://localhost:5000'
      : 'http://10.86.100.240:5000';

  const obtenerUsuarios = async () => {
    try {
        const respuesta = await fetch('http://10.86.100.240:5000/v1/usuarios/');

      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}`);
      }

      const datos = await respuesta.json();

      console.log('Usuarios recibidos:', datos);

      setUsuarios(datos.usuarios);
    } catch (error) {
      console.error(
        'Error al obtener usuarios:',
        error
      );
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const verDetalles = (usuario) => {
    const usuarioId = usuario.id ?? usuario._id;

    router.push({
      pathname: '/detalleUsuario',

      params: {
        id: String(usuarioId),
        nombre: usuario.nombre,
        edad: String(usuario.edad),
      },
    });
  };

  const renderTarjeta = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.nombre}>
          {item.nombre}
        </Text>

        <View style={styles.linea} />

        <Text style={styles.info}>
          Edad: {item.edad} años
        </Text>

        <Pressable
          style={styles.botonDetalles}
          onPress={() => verDetalles(item)}
        >
          <Text style={styles.textoDetalles}>
            Ver detalles
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) =>
          String(item.id ?? item._id)
        }
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },

  botonDetalles: {
    alignSelf: 'flex-end',
    marginTop: 15,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  textoDetalles: {
    fontSize: 15,
    color: '#2563EB',
    fontWeight: '600',
  },
});