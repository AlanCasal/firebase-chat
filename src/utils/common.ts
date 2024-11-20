import { Platform } from 'react-native';

export const BLUR_HASH =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const IS_IOS = Platform.OS === 'ios';

export const getRoomId = (userId1: string, userId2: string): string => {
  const sortedIds = [userId1, userId2].sort();
  const roomId = sortedIds.join('_');

  return roomId;
};

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];

  const formattedDate = `${day} ${month}`;

  return formattedDate;
};

interface ScrollViewRef {
  current: {
    scrollToEnd: (options: { animated: boolean }) => void;
  } | null;
}

type UpdateScrollViewParams = {
  scrollViewRef: ScrollViewRef;
  delay?: number;
  animated?: boolean;
};

export const updateScrollView = ({
  scrollViewRef,
  delay = 50,
  animated = true,
}: UpdateScrollViewParams): void => {
  // timeOut in case there's an incoming message in chat room screen
  setTimeout(() => {
    scrollViewRef.current?.scrollToEnd({ animated });
  }, delay);
};
