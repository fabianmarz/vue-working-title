import { toRefs, reactive, onMounted } from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';

interface QueryOptions {
  documentId?: string;
  onMount?: boolean;
}

interface Document {
  id: string;
}

export default function (collectionName: string, queryOptions?: QueryOptions) {
  const state = reactive({
    error: null,
    documentData: {} as any,
    loading: false,
  });

  const db = firebase.firestore();

  const removeDocument = (documentId: string) => {
    state.loading = true;
    state.error = null;

    db.collection(collectionName).doc(documentId).delete().then(() => {
      console.log('deleted');
    });
  };

  const createDocument = (documentData: object) => {
    state.loading = true;
    state.error = null;
    db.collection(collectionName)
      .add({
        ...documentData,
        createdOn: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        state.error = null;
        state.documentData.id = docRef.id;
        console.log(docRef);
      })
      .catch((error) => {
        console.log('Error createdDocument ', error);
        state.error = error;
        state.documentData = null;
      })
      .finally(() => {
        state.loading = false;
      });
  };

  const updateDocument = (documentData: Document) => {
    const { id, ...data } = documentData;

    db.collection(collectionName).doc(id).set({
      ...data,
      updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true }).then(() => {
      console.log('updated', id);
    });
  };

  const addDocument = (documentData: Document) => {
    state.loading = true;
    state.error = null;
    const { id, ...data } = documentData;

    db.collection(collectionName).doc(id)
      .set({
        ...data,
        updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((error) => {
        console.log('Error addDocument ', error);
        state.error = error;
        state.documentData = null;
      })
      .finally(() => {
        state.loading = false;
      });
  };

  const getDocument = (documentId?: string) => {
    state.loading = true;
    state.error = null;

    db.collection(collectionName)
      .doc(documentId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          state.documentData = {
            id: doc.id,
            ...doc.data(),
          };
        } else {
          state.documentData = null;
          state.error = null;
        }
      })
      .catch((error) => {
        console.log('Error getDocument ', error);
        state.error = error;
      })
      .finally(() => {
        state.loading = false;
      });
  };

  onMounted(() => queryOptions && (queryOptions.onMount && getDocument(queryOptions.documentId)));

  return {
    ...toRefs(state),
    getDocument,
    createDocument,
    addDocument,
    updateDocument,
    removeDocument,
  };
}
