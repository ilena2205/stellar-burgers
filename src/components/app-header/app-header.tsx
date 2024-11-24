import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const userName = user?.name || '';
  return <AppHeaderUI userName={userName} />;
};
