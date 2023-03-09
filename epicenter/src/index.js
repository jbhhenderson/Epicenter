import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Epicenter } from './Epicenter';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <Epicenter />
  </BrowserRouter>
);
