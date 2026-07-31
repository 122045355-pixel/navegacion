import React, { useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Alert,
  Platform,
} from 'react-native';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

export default function DetalleUsuarioScreen() {
  const router = useRouter();

  const {
    id,
    _id,
    nombre,
    edad,
  } = useLocalSearchParams();

  const registroId = id ?? _id;

  const [modalVisible, setModalVisible] =
    useState(false);

  const [eliminando, setEliminando] =
    useState(false);

  const API_BASE_URL =
    Platform.OS === 'web'
      ? 'http://localhost:5000'
      : 'http://10.86.100.240:5000';

  const mostrarMensaje = (
    titulo,
    mensaje
  ) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const irAActualizar = () => {
    router.push({
      pathname: '/actualizarUsuario',

      params: {
        id: String(registroId),
        nombre: String(nombre),
        edad: String(edad),
      },
    });
  };

  const eliminarUsuario = async () => {
    try {
      setEliminando(true);

      const respuesta = await fetch(
        `${API_BASE_URL}/v1/usuarios/${registroId}`,
        {
          method: 'DELETE',
        }
      );

      if (!respuesta.ok) {
        throw new Error(
          `Error ${respuesta.status}`
        );
      }

      setModalVisible(false);

      mostrarMensaje(
        'Usuario eliminado',
        'El usuario fue eliminado correctamente'
      );

      router.replace('/consulta');
    } catch (error) {
      console.error(
        'Error al eliminar usuario:',
        error
      );

      mostrarMensaje(
        'Error',
        'No fue posible eliminar el usuario'
      );
    } finally {
      setEliminando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Detalles del Usuario
      </Text>

      <View style={styles.card}>
        <View style={styles.campo}>
          <Text style={styles.etiqueta}>
            Nombre
          </Text>

          <Text style={styles.valor}>
            {nombre}
          </Text>
        </View>

        <View style={styles.linea} />

        <View style={styles.campo}>
          <Text style={styles.etiqueta}>
            Edad
          </Text>

          <Text style={styles.valor}>
            {edad} años
          </Text>
        </View>

        <Pressable
          style={styles.botonActualizar}
          onPress={irAActualizar}
        >
          <Text style={styles.textoBoton}>
            Actualizar
          </Text>
        </Pressable>

        <Pressable
          style={styles.botonEliminar}
          onPress={() =>
            setModalVisible(true)
          }
        >
          <Text style={styles.textoBoton}>
            Eliminar
          </Text>
        </Pressable>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() =>
          setModalVisible(false)
        }
      >
        <View style={styles.fondoModal}>
          <View style={styles.contenidoModal}>
            <Text style={styles.tituloModal}>
              Confirmar eliminación
            </Text>

            <Text style={styles.mensajeModal}>
              ¿Está seguro de que desea
              eliminar al usuario {nombre}?
            </Text>

            <View style={styles.contenedorBotonesModal}>
              <Pressable
                style={styles.botonCancelar}
                onPress={() =>
                  setModalVisible(false)
                }
                disabled={eliminando}
              >
                <Text
                  style={
                    styles.textoBotonCancelar
                  }
                >
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={styles.botonConfirmar}
                onPress={eliminarUsuario}
                disabled={eliminando}
              >
                <Text
                  style={
                    styles.textoBotonConfirmar
                  }
                >
                  {eliminando
                    ? 'Eliminando...'
                    : 'Sí, eliminar'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    elevation: 4,

    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  campo: {
    paddingVertical: 10,
  },

  etiqueta: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },

  valor: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },

  botonActualizar: {
    backgroundColor: '#FACC15',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },

  botonEliminar: {
    backgroundColor: '#EF4444',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  contenidoModal: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
  },

  tituloModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 15,
  },

  mensajeModal: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 25,
  },

  contenedorBotonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  botonCancelar: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 6,
  },

  botonConfirmar: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 6,
  },

  textoBotonCancelar: {
    color: '#374151',
    fontWeight: 'bold',
  },

  textoBotonConfirmar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});