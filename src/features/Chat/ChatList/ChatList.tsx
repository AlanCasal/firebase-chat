import useAuthContext from '@/src/context/useAuthContext';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '@/firebaseConfig';
import Loader from '@/src/components/Loader';
import { CustomUserData } from '@/src/context/types';
import ChatItem from '@/src/features/Chat/ChatList/components/ChatListItem';
import { useRouter } from 'expo-router';

const ChatList = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [users, setUsers] = useState<CustomUserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = async () => {
    setIsLoading(true);
    // fetch users except the current user
    const q = query(usersRef, where('userId', '!=', user?.userId));
    const querySnapshot = await getDocs(q);

    const data: CustomUserData[] = [];
    querySnapshot.forEach(doc =>
      data.push({ ...(doc.data() as CustomUserData) })
    );

    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.userId) getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='light' />

      {isLoading && (
        <View className='flex items-center' style={{ top: hp(20) }}>
          <Loader />
        </View>
      )}

      {users.length > 0 && user && (
        <View className='flex-1'>
          <FlatList
            data={users}
            contentContainerStyle={{ flex: 1, paddingBottom: 25 }}
            keyExtractor={() => Math.random().toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ChatItem
                currentUser={user}
                router={router}
                noBorder={index + 1 === users.length}
                item={item}
                index={index}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default ChatList;
