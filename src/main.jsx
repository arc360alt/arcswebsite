import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import MoreLinks from './MoreLinks';
import LearnAboutMe from './LearnAboutMe';
import ActiveProjects from './ActiveProjects';
import WhatImDoing from './WhatImDoing';
import Renders from './Renders';
import Sitemap from './Sitemap';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/more-links" element={<MoreLinks />} />
        <Route path="/aboutme" element={<LearnAboutMe />} />
        <Route path="/active" element={<ActiveProjects />} />
        <Route path="/what-im-doing" element={<WhatImDoing />} />
        <Route path="/renders" element={<Renders />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
