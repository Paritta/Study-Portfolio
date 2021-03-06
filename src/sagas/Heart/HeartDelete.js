import { put, takeEvery, call } from "redux-saga/effects/";
import { getFirebase } from "react-redux-firebase";

export function* HeartRemove(action) {
    const PostId = action.payload.PostId;
    const Email = action.payload.Email;

    const RefData = yield getFirebase()
        .database()
        .ref(`posts/${PostId}/HeartUser`)
        .once("value")
        .then(res => {
            return res.val();
        });

    for(let key in RefData) {
        if(Email === RefData[key]) {
            yield getFirebase()
                .database()
                .ref(`posts/${PostId}/HeartUser/${key}`)
                .remove();

            const RefCountData = yield getFirebase()
                .database()
                .ref(`posts/${PostId}/HeartCount`);

            RefCountData.transaction(count => (count || 0) - 1);
        }
    }
}

export function* HeartDelete (action) {
    try {
        yield call(HeartRemove, action);
        yield put({ type: "heart/heart_delete_Success" });
    } catch (error) {
        yield put({ type: "heart/heart_delete_Failure", payload: error })
    }
}

export function* watchHeartDelete () {
    yield takeEvery("heart/heart_delete_Request", HeartDelete);
}
