import {
    configureStore,
    combineReducers
} from "@reduxjs/toolkit";
import searchRedux from "./searchRedux";
import userRedux from "./userRedux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartRedux from "./cartRedux";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ['search', 'cart']
};

const combinedReducer = combineReducers({
    user: userRedux,
    cart: cartRedux,
    search: searchRedux
});


const rootReducer = (state, action) => {
    if (action.type === 'user/logout') {
        state = undefined;
    }
    return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})

export let persistor = persistStore(store);