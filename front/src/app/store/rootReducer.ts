import { combineReducers } from '@reduxjs/toolkit';
import musicReducer from "../../features/music/slices/music.slice"

const rootReducer = combineReducers({
    music: musicReducer
})

export default rootReducer