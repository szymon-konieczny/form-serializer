import { Model } from './js/model';
import { View } from './js/view';
import { Controller } from './js/controller';

import './css/styles.css';

const model = new Model;
const view = new View;
const controller = new Controller(model, view);
