import React, {
  memo,
  useCallback,
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import DriverView from '../Views/Driver.view';
import interceptor from '../Services/interceptor';
import Spinner from '../Views/Spinner';
import BusDetails from '../Views/BusDetails.view';
import UtilContext from '../Services/UtilContext';
import EmptyScreen from '../Views/emptyScreen';
import Header from '../Components/header';

const Driver = () => {
  const utils = useContext(UtilContext);
  const BusData = useRef(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const isDriverBooked = useRef(false);
  const bookBus = useCallback(async (number,data) => {
    setLoading(true)
    const resp = await interceptor('bus',"PATCH",{number,username:utils?.userData?.username});
    isDriverBooked.current = true;
    BusData.current=data
    setLoading(false)
    console.log(resp);
  }, []);

  const onSubmit = useCallback(async(number,reached)=>{
  
    const resp = await interceptor('busroute',"PATCH",{number,reached});
    console.log(resp[1])

    if(resp[1].done){
      await getAllBuses()
      
    }
  },[])
  const getAllBuses = useCallback(async () => {
    setLoading(true);
    const response = await interceptor('bus-driver','POST',{username:utils?.userData?.username});
    // console.log(response);
    if (!response) {
      return;
    }
  
    const data = response[1].data;
    isDriverBooked.current = response[1].data.driverBusy;
    BusData.current = data;
    setLoading(false);
  }, []);
  useEffect(() => {
    (async () => {
      await getAllBuses();
    })();
  }, [getAllBuses]);
  if (isDriverBooked.current) {
    return <BusDetails onSubmit={onSubmit} busData={BusData.current} />;
  }
  if (isLoading) {
    return <Spinner message="Loading buses..." />;
  }
  if(!BusData.current.length){
    return (
      <>
      <Header title="Buses available" />
      <EmptyScreen message="No buses to show" />
    </>
    )
  }
  return <DriverView bookBus={bookBus} allBusData={BusData.current} />;
};

export default memo(Driver);
