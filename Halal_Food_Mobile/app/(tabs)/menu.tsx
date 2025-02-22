import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from "../../supabase/supabase"
import {useWindowDimensions} from 'react-native';

interface MenuItem {
    id: string;
    title: string;
    desc: string;
    img: string;
    color?: string; // Optional since it may not always be provided
}

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/zaydm/image/upload/v1704043465/restaurant/";


export default function menu() {
    const {height, width} = useWindowDimensions();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenu = async () => {
            const { data, error } = await supabase.from("Category").select("*");
            if (error) {
                console.error("Error fetching menu:", error);
            } else {
                setMenuItems(data as any);
                
            }
            setLoading(false);
        };

        fetchMenu();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false} 
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.menuItem, { backgroundColor: "white" , height : height/4.5}]}>
                        <Image source={{ uri: `${CLOUDINARY_BASE_URL}${item.img}` }} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.desc}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "gray",
    },
});
