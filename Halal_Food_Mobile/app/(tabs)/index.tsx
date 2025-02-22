import { supabase } from '../../supabase/supabase';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';


interface Product {
  id: string;
  title: string;
  price: number;
  img: string;
}

export default function index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]); // Assuming promotions are simple data objects
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("Product").select("*");
      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data);
      }
    };

    const fetchPromotions = async () => {
      // For now, we're hardcoding promotions, but you can fetch this from your DB as well
      setPromotions([
        { title: "Promo 1", image: "https://example.com/promo1.jpg" },
        { title: "Promo 2", image: "https://example.com/promo2.jpg" },
      ]);
    };

    fetchProducts();
    fetchPromotions();
    setLoading(false);
  }, []);

  // Product section render
  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={{ uri: item.img }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.cartIcon}>
          <Icon name="shopping-cart" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.productSection}>
        <Text style={styles.sectionTitle}>Promotions</Text>
        <FlatList
          data={products.slice(0, 5)} // Display the first 5 products for section 1
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.productSection}>
        <Text style={styles.sectionTitle}>Catalogue</Text>
        <FlatList
          data={products.slice(5, 10)} // Display the next 5 products for section 2
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 35,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    height: 40,
    paddingLeft: 15,
    borderRadius: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  headerButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  carouselContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  carouselItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: 300,
    height: 200,
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  carouselTitle: {
    position: "absolute",
    bottom: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  productSection: {
    marginBottom: 20,
    backgroundColor :'white'
  },
  productCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  productPrice: {
    marginTop: 5,
    color: "#888",
  },
  cartIcon: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 25,
    marginLeft: 10,
  },
});
