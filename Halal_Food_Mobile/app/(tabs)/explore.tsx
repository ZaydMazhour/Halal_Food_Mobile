import { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View, Text, Button } from 'react-native';
import { supabase } from "../../supabase/supabase"

interface User {
  email: string;
  emailVerified: string | null;
  id: string;
  image: string | null;
  isAdmin: boolean;
  name: string;
  password: string;
  phoneNumber: string;
}

export default function TabTwoScreen() {
  
const [userData, setUserData] = useState<User | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Simulating login state

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("User") // Adjust to the correct table
        .select("*")
  
      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        // Assuming the response is an array, we access the first item
        const user = data?.[0];
        if (user) {
          setUserData({
            email: user.email,
            emailVerified: user.emailVerified,
            id: user.id,
            image: user.image,
            isAdmin: user.isAdmin,
            name: user.name,
            password: user.password, // If you're showing the password, you should avoid it or hash it
            phoneNumber: user.phoneNumber,
          });
        }
      }
    };
  
    fetchUserData();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You are logged out</Text>
        <Button title="Log in" onPress={() => setIsLoggedIn(true)} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.infoText}>{userData?.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Mobile Phone:</Text>
        <Text style={styles.infoText}>{userData?.phoneNumber}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Points:</Text>
        <Text style={styles.infoText}>55 points</Text>
      </View>

      <Button title="Logout" onPress={handleLogout} color="#FF6347" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor : 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    color: "gray",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
