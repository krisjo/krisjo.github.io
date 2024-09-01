import React from 'react';
import { render } from "react-dom";
import {
  Route,
  useParams, Routes, BrowserRouter
} from "react-router-dom";
import './index.css';
import Spellfound from './Spellfound';
import * as serviceWorker from './serviceWorker';

function Puzzle() {
//  const location = useLocation();
//  let { puzzle } = new URLSearchParams(location.search).get('puzzle');
  let { puzzle } = useParams();
  console.log('function Puzzle - puzzle = ' + puzzle);
  return <Spellfound puzzle={puzzle}/>;
}

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Spellfound />} />
      <Route path="/puzzles/:puzzle" element={<Puzzle />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
