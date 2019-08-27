import ShopActionTypes from './shop.types'


export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

//--When using redux thunk
// export const fetchCollectionsStartAsync = () => {
//     return dispatch => {
//         const collectionRef = firestore.collection('collections')
//         dispatch(fetchCollectionsStart())

//         //--This uses the promises pattern by using <.get> and <.then>
//         collectionRef.get().then(snapshot => {
//             const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
//             dispatch(fetchCollectionsSuccess(collectionsMap))
//         }).catch(error => dispatch(fetchCollectionsFailure(error.message)))

//         //--This uses the observer patern by making use of <onSnapshot>
//         // this.unsubscribeFromSnapShot = collectionRef.onSnapshot(async snapshot => {
//         //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
//         //     updateCollections(collectionsMap)
//         //     this.setState({loading: false})
//         // })
//     }
// }