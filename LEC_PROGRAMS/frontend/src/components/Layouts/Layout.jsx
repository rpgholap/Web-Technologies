import { Outlet } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <>
      {/* ✅ Fixed Navbar visible on all pages */}
      <NavigationBar />

      {/* ✅ Main Content Area (dynamic) */}
      <main className="main-content">
        <Outlet /> 
        {/* This is where page content (Home, About, Contact, etc.) will appear */}
      </main>

      {/* ✅ Footer visible on all pages */}
      <Footer />
    </>
  );
}