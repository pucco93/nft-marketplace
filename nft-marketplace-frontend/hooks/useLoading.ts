import { store } from "../store/appStore";
import { setLoading } from "../store/slices/LoadingSlice";

const setLoadingMsg = (msg: string) => {
    const loading = store.getState().loading;
    store.dispatch(setLoading(msg));
};

export default setLoadingMsg;