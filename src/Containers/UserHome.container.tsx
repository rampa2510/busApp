import React, {
  memo,
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import UserView from '../Views/UserHome.View';
import {BusDataType} from '../Types/EssentialData';
import interceptor from '../Services/interceptor';
import Spinner from '../Views/Spinner';
import UtilContext from '../Services/UtilContext';

const UserHome: React.FC = () => {
  const BusData = useRef<BusDataType[] | null>(null);
  // console.log(BusData);
  const utils = useRef(useContext(UtilContext));

  const [isLoading, setLoading] = useState<boolean>(true);

  const getAllBuses = useCallback(async () => {
    setLoading(true);
    const response = await interceptor('bus');
    if (!response) {
      return;
    }
    const data = response[1].data;
    // console.log(data);
    BusData.current = data;
    setLoading(false);
  }, []);

  const bookBus = useCallback(async number => {
    setLoading(true);
    const response = await interceptor('passenger', 'patch', {
      username: utils.current.userData.username,
      number,
    });
    await getAllBuses();
    setLoading(false);
    console.log(response);
  }, []);

  useEffect(() => {
    (async () => {
      await getAllBuses();
    })();
  }, [getAllBuses]);

  if (isLoading) {
    return <Spinner message="Loading buses" />;
  }

  return (
    <UserView
      allBusData={BusData.current}
      isLoading={isLoading}
      getAllBuses={getAllBuses}
      bookBus={bookBus}
      username={utils.current?.userData?.username}
    />
  );
};

export default memo(UserHome);
