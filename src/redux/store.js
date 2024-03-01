import { configureStore } from '@reduxjs/toolkit'
import AuthReduer from './AuthSlice'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, AuthReduer)

export const Store = configureStore({
    reducer: {
        Data: persistedReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})

export const persistor = persistStore(Store)