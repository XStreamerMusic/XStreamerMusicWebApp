import Giveaways from './pages/Giveaways';
import Waitlist from './pages/Waitlist';
import GiveawayDetail from './pages/GiveawayDetail';
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Waitlist />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/giveaways" element={<Giveaways />} />
            <Route path="/giveaways/:slug" element={<GiveawayDetail />} />
        </>
    )
);