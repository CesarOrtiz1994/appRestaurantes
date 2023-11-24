import { View, Text } from 'react-native'
import React from 'react'
import { Avatar, Card, IconButton } from 'react-native-paper';

export default function CardCategoria() {
  const texto = 'Tacos, Av. Pie de la cuesta, 23, oaisoi.';
  const partes = texto.split(',');
  const name = partes[0].trim();
  const address = partes.slice(1).join(',').trim();

  return (
    <Card.Title
      title={name}
      subtitle={address}
      left={(props) => <Avatar.Icon {...props} icon="folder" />}
      right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
    />
  )
}