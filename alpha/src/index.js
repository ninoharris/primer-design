import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import './style.css'

import ExerciseContainer from './ExerciseContainer'

ReactDOM.render(<Router><ExerciseContainer /></Router>, document.getElementById('root'));
registerServiceWorker();
