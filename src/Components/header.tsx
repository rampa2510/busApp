import React, {memo, FC} from 'react';
import {NavigationBar, Title} from '@shoutem/ui';
// import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
}

const Header: FC<Props> = ({title}) => (
  <NavigationBar
    // leftComponent={
    //   <Button onPress={() => navigation.toggleDrawer()}>
    //     <Icon name="sidebar" />
    //   </Button>
    // }
    centerComponent={<Title>{title}</Title>}
    styleName="inline"
  />
);

export default memo(Header);
