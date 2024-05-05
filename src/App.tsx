import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListingPage from './pages/Listing/listingPage'
import DetailPage from './pages/DetailPage/DetailPage'

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListingPage />} />
          <Route path='/details/:name' element={<DetailPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
