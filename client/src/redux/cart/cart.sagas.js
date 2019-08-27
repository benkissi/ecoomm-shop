import { all, call, takeLatest, put} from 'redux-saga/effects'

import UserActionsTypes from '../user/user.types'
import { clearCart } from './cart.actions'

export function* clearCartOnSignOut() {
    yield put(clearCart())
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionsTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
    yield all([
        yield all([call(onSignOutSuccess)])
    ])
}