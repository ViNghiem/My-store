import { combineReducers } from "redux";
import UserReduces from "./UserReducer";

const rootReduces = combineReducers({
    user: UserReduces
})
export default rootReduces;