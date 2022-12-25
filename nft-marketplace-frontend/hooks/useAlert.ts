import { store } from "../store/appStore";
import { createAlert, deleteAlert } from "../store/slices/AlertsSlice";
import { cancelLoading } from "../store/slices/LoadingSlice";

const useAlert = (msg: string, color: string = 'green') => {
    store.dispatch(cancelLoading);
    store.dispatch(createAlert({msg, show: true, color}));
    setTimeout(() => {
        store.dispatch(deleteAlert());
    }, 6000);
};

export default useAlert;