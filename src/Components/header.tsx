import React, {memo, FC, useContext} from 'react';
import {NavigationBar, Title, Button, Image} from '@shoutem/ui';
import {useNavigation} from '@react-navigation/native';
import List from '../Images/list.webp';
import Logout from '../Images/logout.webp';
import UtilContext from '../Services/UtilContext';

interface Props {
  title: string;
}

const Header: FC<Props> = ({title}) => {
  const navigation = useNavigation();
  const utils = useContext(UtilContext);

  return (
    <NavigationBar
      leftComponent={
          <Button onPress={() => navigation.toggleDrawer()}>
            <Image resizeMode={'contain'} style={{width: 30}} source={List} />
          </Button>
        }
      rightComponent={
        <Button onPress={() => utils?.signOut()}>
          <Image resizeMode={'contain'} style={{width: 30}} source={Logout} />
        </Button>
      }
      centerComponent={<Title>{title}</Title>}
      styleName="inline"
    />
  );
};

export default memo(Header);
