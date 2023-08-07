import { RecoilRoot } from 'recoil';
import './App.css';

import SinglePathRoute from './routes';

function App() {
  return (
    <RecoilRoot>
      <SinglePathRoute/>
    </RecoilRoot>
  );
}

export default App;
