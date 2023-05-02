import { useEffect, useState } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { Header } from 'components/Header';
import { Post } from 'components/Post';
import { Float } from 'components/Float';

export default function Home() {
  const [posts, setPosts] = useState<Array<any>>([]);

  useEffect(() => {
    const subListener = firestore()
      .collection('blogs')
      .onSnapshot((snapshot) => {
        if (snapshot) {
          setPosts(snapshot.docs);
        }
      });
    return () => subListener();
  }, []);

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 40,
          backgroundColor: '#295094',
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 100,
        }}
        nestedScrollEnabled
      >
        <Header />
        <ScrollView
          contentContainerStyle={{
            width: '100%',
          }}
          horizontal
          scrollEnabled={false}
        >
          <FlatList
            data={posts}
            renderItem={({ item, index }) => (
              <Post item={item.data()} id={item.id} />
            )}
            keyExtractor={(item, index) => String(index)}
            ListEmptyComponent={
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: '#999',
                    fontSize: 17,
                    fontFamily: 'Rubik_600SemiBold',
                  }}
                >
                  Nenhum blog criado
                </Text>
              </View>
            }
          />
        </ScrollView>
      </ScrollView>
      <Float />
    </>
  );
}
