import { FlatList, TextInput, TouchableOpacity, View, Image, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './search.style'
import { Feather, Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants'
import axios from 'axios'
import SearchTile from '../components/products/SearchTile'

const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults)

  const handleSearch = async() => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/api/products/search/${searchKey}`)
      setSearchResults(response.data);
    } catch (error) {
      console.log('Failed to get products', error);
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons 
            name="camera-outline" 
            size={SIZES.xLarge} 
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Search for items..."
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch()}>
            <Feather name='search' size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResults.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image 
            source={require('../assets/images/Pose23.png')} 
            style={styles.searchImage}
          />
        </View>
      ): (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (<SearchTile item = {item}/>)}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  )
}

export default Search

