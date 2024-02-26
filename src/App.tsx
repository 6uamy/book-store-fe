import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { BookStoreThemeProvider } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/common/Error';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Layout>
                <Home />
            </Layout>
        ),
        errorElement: (
            <Layout>
                <Error />
            </Layout>
        ),
    },
    {
        path: '/books',
        element: (
            <Layout>
                <div>books list</div>
            </Layout>
        ),
    },
]);

function App() {
    return (
        <BookStoreThemeProvider>
            <RouterProvider router={router} />
        </BookStoreThemeProvider>
    );
}

export default App;
