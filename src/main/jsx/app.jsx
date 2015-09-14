__webpack_public_path__= window.resURL+'js/';
import React from "react";
import ReactDOM from 'react-dom';
import BuildHistoryPage from './pages/BuildHistoryPage.jsx';
import {job} from './api/Api.jsx'; 
import BuildHistory from './models/BuildHistory.js'
window.onload = function (){
  const buildHistory = new BuildHistory();
  buildHistory.addChangeListener(buildHistory => {
    ReactDOM.render(<BuildHistoryPage buildHistory={buildHistory}/>, document.getElementById('content'));
  });
  buildHistory.historyChanged({builds:[],filters:[]});

  job("buildHistoryTabs,builds[*,commit[*],cause[*],parameters[*]]", 'All',50).then(data => {
    buildHistory.historyChanged({builds: data.builds, filters: data.buildHistoryTabs});
  });
}

