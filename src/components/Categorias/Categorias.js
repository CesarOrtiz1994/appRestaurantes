import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { styles } from './Categorias.styles'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'

export default function Categorias({setSelectedCategory}) {

  const categoryList = [
    {
      id: 1,
      name: 'Restaurantes',
      value: 'restaurant',
      icon: require('../../assets/restaurant.png'),
    },
    {
      id: 2,
      name: 'Comida para llevar',
      value: 'meal_takeaway',
      icon: require('../../assets/meal.png'),
    },
    {
      id: 3,
      name: 'Alimentos',
      value: 'food',
      icon: require('../../assets/food.png'),
    },
  ]

  return (
    <View style={styles.mainContent}>
      <Text style={styles.textSelect}>Selecciona una categoría:</Text>
      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> setSelectedCategory(item.value)}>
            <View style={styles.component}>
              <Image source={item.icon} style={styles.icon} />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}