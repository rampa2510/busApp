import React, {memo, useRef, useEffect, useState, useCallback,useContext} from 'react';
import UserView from '../Views/UserHome.View';
import {BusDataType} from '../Types/EssentialData';
import interceptor from '../Services/interceptor';
import Spinner from '../Views/Spinner';

const UserHome: React.FC = () => {
  const BusData = useRef<BusDataType[] | null>(null);
  // console.log(BusData);

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

    />
  );
};

export default memo(UserHome);
