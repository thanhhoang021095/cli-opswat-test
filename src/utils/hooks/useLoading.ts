
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from "../../store";
import { userSlice } from "../../store/userSlice";

export const useLoading = () => {
    const dispatch: AppDispatch = useDispatch();
    const {
        loadingApp,
    } = useSelector((state: AppState) => state.user);

    useEffect(() => {
        if (loadingApp) {
            const loadingTimer = setTimeout(() => {
                dispatch(userSlice.actions.reloadApp(false));
                clearTimeout(loadingTimer);
            }, 500);
        }
      
    }, [dispatch, loadingApp])
}