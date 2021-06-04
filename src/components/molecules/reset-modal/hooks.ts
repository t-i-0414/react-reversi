import { useDispatch } from 'react-redux';
import { clearState } from 'src/redux/modules/game';

export default (): (() => void) => {
  const dispatch = useDispatch();
  const onReset = () => {
    dispatch(clearState());
  };

  return onReset;
};
