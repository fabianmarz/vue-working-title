import { toRefs, reactive, onMounted } from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import FieldPath = firebase.firestore.FieldPath;
import OrderByDirection = firebase.firestore.OrderByDirection;

interface QueryOptions {
  query?: object;
  onMount?: boolean;
  orderBy?: string | FieldPath;
  order?: OrderByDirection;
  limit?: number;
}

export default function (collectionName: string, queryOptions: QueryOptions) {
  const state = reactive({
    error: null,
    collectionData: [] as object,
    loading: false,
  });

  const db = firebase.firestore();

  const getRealTimeCollection = ({ orderBy, order = 'asc' } = queryOptions) => {
    state.loading = true;
    state.error = null;

    const resultArray: object[] = [];
    let theQuery = db.collection(collectionName);

    if (orderBy) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      theQuery = theQuery.orderBy(orderBy, order);
    }

    theQuery.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const {
          newIndex, oldIndex, doc, type,
        } = change;
        if (type === 'added') {
          resultArray.splice(newIndex, 0, {
            id: doc.id,
            ...doc.data(),
          });
        } else if (type === 'modified') {
          resultArray.splice(oldIndex, 1);
          resultArray.splice(newIndex, 0, {
            id: doc.id,
            ...doc.data(),
          });
        } else if (type === 'removed') {
          resultArray.splice(oldIndex, 1);
        }
      });
      state.collectionData = resultArray;
      state.loading = false;
    });
  };

  const getCollection = ({ query, orderBy, limit } = queryOptions) => {
    state.loading = true;
    state.error = null;

    const resultArray: object[] = [];
    const theQuery = db.collection(collectionName);

    theQuery
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          resultArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        state.collectionData = resultArray;
        state.error = null;
      })
      .catch((error) => {
        console.log('Error getCollection ', error);
        state.error = error;
      })
      .finally(() => {
        state.loading = false;
      });
  };

  onMounted(() => queryOptions && (queryOptions.onMount && getRealTimeCollection()));

  return {
    ...toRefs(state),
    getCollection,
    getRealTimeCollection,
  };
}
