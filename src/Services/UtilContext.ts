import {createContext} from 'react';
import {Utils} from '../Types/UtilContext';

const UtilsContext = createContext<Utils | null>(null);

export default UtilsContext;
