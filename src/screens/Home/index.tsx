import { ScrollView, Text, View, FlatList } from 'react-native';

import { Header } from 'components/Header';
import { Post } from 'components/Post';
import { Float } from 'components/Float';

export default function Home() {
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
            data={[
              {
                id: 'react-native-evolution',
                title: 'React Native está cada vez mais evoluido',
                body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                image: 'https://reactnative.dev/img/logo-og.png',
              },
              {
                id: 'react-native-evolution-part-two',
                title: 'React Native está cada vez mais evoluido - parte 2',
                body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                image: 'https://reactnative.dev/img/logo-og.png',
              },
            ]}
            renderItem={({ item, index }) => <Post item={item} />}
            keyExtractor={(item, index) => String(index)}
          />
        </ScrollView>
      </ScrollView>
      <Float />
    </>
  );
}
