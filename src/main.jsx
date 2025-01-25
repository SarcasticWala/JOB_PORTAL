import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Signup from './components/Signup.jsx'
import MyProfile from './components/MyProfile.jsx'
import Dashboard from './components/Dashboard.jsx'
import Settings from './components/Settings.jsx'
import Contact from './components/Contact.jsx'
import Jobs from './components/Jobs.jsx'
import AddPost from './components/AddPost.jsx'
import MyPosts from './components/MyPosts.jsx'
import EditPost from './components/EditPost.jsx'
import AppliedUsers from './components/AppliedUsers.jsx'
import Applied from './components/Applied.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import VerifyEmail from './components/VerifyEmail.jsx'
import ResetPassword from './components/ResetPassword.jsx'

import persistedReducer from './redux/store.js'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import VerifyOtp from './components/VerifyOtp.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // The main App component
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/jobs',
        element: <Jobs />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/verify-email',
        element: <VerifyEmail />
      },
      {
        path: '/reset-password',
        element: <ResetPassword />
      },
      {
        path: '/verify-otp',
        element: <VerifyOtp />,
      },
      {
        element: <Dashboard />,
        children: [
          {
            path: '/myprofile',
            element: <MyProfile />
          },
          {
            path: '/settings',
            element: <Settings />
          },
          {
            path: '/addpost',
            element: <AddPost />
          },
          {
            path: '/myposts',
            element: <MyPosts />
          },
          {
            path: '/myposts/editPost/:postId',
            element: <EditPost />
          },
          {
            path: '/myposts/appliedUsers/:postId',
            element: <AppliedUsers />
          },
          {
            path: '/applied',
            element: <Applied />
          }
        ]
      },
    ],
  },
]);

const store = configureStore({
  reducer: persistedReducer
})

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
