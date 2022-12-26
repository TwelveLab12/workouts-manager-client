
import BaseLayout from './layouts/BaseLayout'

import {
  BrowserRouter,
  Routes, Route
} from "react-router-dom";

import CurrentWorkout from './Pages/CurrentWorkout/CurrentWorkout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />} >
          <Route path={'/'} element={<CurrentWorkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
