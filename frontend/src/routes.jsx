import Waitlist from './pages/Waitlist';
import { Route, createBrowserRouter, createRoutesFromElements, Routes } from "react-router-dom"


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Waitlist />} />
      <Route path="/waitlist" element={<Waitlist />} />
    </>
  )
);