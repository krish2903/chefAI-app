import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Switch } from 'react-native';
import TopBar from './TopBar';
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import Logo from '../Icons/intelliChefLogo.png';

const fetchRecipes = async () => {
  return [
    { id: 1, title: 'Vegan Tacos', image: 'https://res.cloudinary.com/dy8ayjlcm/image/upload/v1727031784/download_fad7wp.jpg', description: 'Delicious vegan tacos', prepTime: '20 min', isVegetarian: true, isVegan: true },
    { id: 2, title: 'Chicken Curry', image: 'https://res.cloudinary.com/dy8ayjlcm/image/upload/v1727031993/download_hjlkxx.jpg', description: 'Spicy chicken curry', prepTime: '40 min', isVegetarian: false, isVegan: false },
    { id: 3, title: 'Gluten-Free Pancakes', image: 'https://res.cloudinary.com/dy8ayjlcm/image/upload/v1727032075/download_htwbha.jpg', description: 'Fluffy gluten-free pancakes', prepTime: '15 min', isVegetarian: true, isVegan: false },
    { id: 4, title: 'Quinoa Salad', image: 'https://res.cloudinary.com/dy8ayjlcm/image/upload/v1727032123/download_jou2ad.jpg', description: 'Fresh and healthy quinoa salad', prepTime: '25 min', isVegetarian: true, isVegan: true },
    { id: 5, title: 'Mushroom Risotto', image: 'https://res.cloudinary.com/dy8ayjlcm/image/upload/v1727032150/download_rnf480.jpg', description: 'Creamy mushroom risotto', prepTime: '35 min', isVegetarian: true, isVegan: false },
    { id: 6, title: 'Beef Stroganoff', image: 'https://res.cloudinary.com/dy8ayjlcm/image/upload/v1727032212/download_h7827t.jpg', description: 'Rich and savory beef stroganoff', prepTime: '45 min', isVegetarian: false, isVegan: false },
    { id: 7, title: 'Stuffed Bell Peppers', image: 'https://res.cloudinary.com/dy8ayjlcm/image/upload/v1727032219/download_wl3xjf.jpg', description: 'Bell peppers stuffed with a savory filling', prepTime: '30 min', isVegetarian: true, isVegan: false },
    { id: 8, title: 'Pasta Primavera', image: 'https://res.cloudinary.com/dy8ayjlcm/image/upload/v1727032293/download_zdbo2x.jpg', description: 'Pasta with a variety of fresh vegetables', prepTime: '20 min', isVegetarian: true, isVegan: false },
    { id: 9, title: 'Sweet Potato Fries', image: 'https://res.cloudinary.com/dy8ayjlcm/image/upload/v1727032316/download_vaywes.jpg', description: 'Crispy and delicious sweet potato fries', prepTime: '30 min', isVegetarian: true, isVegan: true },
    { id: 10, title: 'Thai Green Curry', image: 'https://res.cloudinary.com/dy8ayjlcm/image/upload/v1727032377/download_s9inxp.jpg', description: 'Fragrant Thai green curry with vegetables', prepTime: '35 min', isVegetarian: false, isVegan: false },
  ];
};

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);

  useEffect(() => {
    fetchRecipes().then((data) => {
      setRecipes(data);
      setFilteredRecipes(filterRecipes(data));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setFilteredRecipes(filterRecipes(recipes));
  }, [searchTerm, isVegetarian, isVegan]);

  const filterRecipes = (data) => {
    return data.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (isVegetarian ? recipe.isVegetarian : true) &&
      (isVegan ? recipe.isVegan : true)
    );
  };

  const toggleIsVegetarian = () => {
    setIsVegetarian((prevState) => !prevState);
  };

  const toggleIsVegan = () => {
    setIsVegan((prevState) => !prevState);
  };

  const toggleAllFilters = () => {
    setIsVegetarian(false);
    setIsVegan(false);
  };

  const renderRightActions = () => {
    return (
      <View style={[styles.heartIconContainer]}>
        <FontAwesome name="heart" size={40} color="#fff" />
      </View>
    );
  };

  const renderLeftActions = () => {
    return (
      <View style={[styles.dislikeContainer]}>
        <FontAwesome name="thumbs-down" size={40} color="#fff" />
      </View>
    );
  };

  const renderRecipe = ({ item }) => (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      // onSwipeableRightOpen={() => addToFavorites(item)} 
      overshootRight={false}
    >
      <View style={styles.recipeCard}>
        <Image source={{ uri: item.image }} style={styles.recipeImage} />
        <View style={styles.recipeDetailsContainer}>
          <Image style={styles.userIcon} source={Logo} />
          <View style={styles.recipeDetails}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text style={styles.recipeDescription}>{item.description} <Text style={styles.greenText}>{'\u2022'}</Text> {item.prepTime}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading recipes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar />
      <TextInput
        style={styles.searchBar}
        placeholder="Search recipes..."
        placeholderTextColor='#8c8d96'
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {isVegetarian || isVegan ? (
          <View>
            <TouchableOpacity style={[styles.filterButton, styles.clearFiltersButton]} onPress={toggleAllFilters}>
              <Text style={styles.clearFiltersLabel}>X</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View>
          <TouchableOpacity name={isVegetarian} style={styles.filterButton} onPress={toggleIsVegetarian}>
            <Text style={isVegetarian ? styles.filterLabelActive : styles.filterLabelInactive}>Vegetarian</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity name={isVegan} style={styles.filterButton} onPress={toggleIsVegan}>
            <Text style={isVegan ? styles.filterLabelActive : styles.filterLabelInactive}>Vegan</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity name={isVegetarian} style={styles.filterButton} onPress={toggleIsVegetarian}>
            <Text style={isVegetarian ? styles.filterLabelActive : styles.filterLabelInactive}>Lactose free</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity name={isVegetarian} style={styles.filterButton} onPress={toggleIsVegetarian}>
            <Text style={isVegetarian ? styles.filterLabelActive : styles.filterLabelInactive}>Gluten free</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {filteredRecipes.length === 0 ? (
        <View style={styles.messageContainer}>
          <Image style={styles.messageImage} source={require('../assets/notFound.png')} />
          <Text style={styles.messageText}>No Recipes Found</Text>
        </View>
      ) : (
        <FlatList
          style={styles.recipeContainer}
          data={filteredRecipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id.toString()}
        />
      )
      }

      {/* <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity> */}
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    paddingTop: 40,
    backgroundColor: '#1E2124',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#383a43',
    color: '#8c8d96',
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  filterContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },
  messageContainer: {
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageImage: {
    width: 150,
    height: 150,
  },
  messageText: {
    width: '100%',
    textAlign: 'center',
    color: '#cccdd0',
  },
  filterButton: {
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: '#26272e',
    backgroundColor: '#383a43',
  },
  clearFiltersButton: {
    backgroundColor: 'rgba(255, 153, 153, 0.25)',
  },
  clearFiltersLabel: {
    color: '#ff9999',
  },
  filterLabelInactive: {
    color: '#8c8d96',
  },
  filterLabelActive: {
    color: '#41a36b',
  },
  recipeContainer: {
    height: '100%',
  },
  recipeCard: {
    overflow: 'hidden',
    marginBottom: 15,
    flexDirection: 'column',
  },
  recipeImage: {
    backgroundColor: '#26272e',
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
  recipeDetailsContainer: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeDetails: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
  recipeTitle: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#cccdd0',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  recipeDescription: {
    fontSize: 12,
    letterSpacing: 1,
    color: '#8c8d96',
  },
  greenText: {
    color: '#41a36b',
    letterSpacing: 5,
  },
  heartIconContainer: {
    marginBottom: 75,
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 40,
    backgroundColor: '#486581',
  },
  dislikeContainer: {
    marginBottom: 75,
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    backgroundColor: '#CD5C5C',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#41a36b',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
