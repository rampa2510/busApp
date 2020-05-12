import React, {useState, memo, useEffect, useRef} from 'react';
import {Screen} from '@shoutem/ui';
import interceptor from '../Services/interceptor';
import Header from '../Components/header';
import EmptyScreen from './emptyScreen';
import Spinner from './Spinner';
import {FlatList} from 'react-native';
import FeedBack from '../Components/FeedBack';

const FeedbackList = () => {
  const [isLoading, setLoading] = useState(true);
  const feedbackData = useRef(null);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const resp = await interceptor('feedback');
      feedbackData.current = resp[1].data;
      setLoading(false);
    })();
  }, []);
  if (isLoading) {
    return <Spinner message="Loading feedbacks" />;
  }
  if (!feedbackData.current.length) {
    return (
      <>
        <Header title="Feedback List" />
        <EmptyScreen message="No feedback" />
      </>
    );
  }
  return (
    <Screen>
      <Header title="Feedback List" />
      <FlatList
        data={feedbackData.current}
        renderItem={({item}) => <FeedBack feedBack={item} />}
        keyExtractor={item => item._id}
      />
    </Screen>
  );
};

export default memo(FeedbackList);
