import firebase from 'firebase/app';
import 'firebase/storage';
import { reactive } from 'vue';

interface StorageOptions {
  path: string;
}

export default function (storageOptions?: StorageOptions) {
  const state = reactive({
    error: null,
    storageData: {} as any,
    loading: false,
  });

  const storage = firebase.storage();
  const storageRef = storage.ref();

  const createFile = (file: any) => {
    console.log(file);
    state.loading = true;
    const path = [storageOptions?.path, file.name];
    const fileRef = storageRef.child(path.join('/'));
    fileRef.put(file).then((snapshot) => {
      console.log('uploaded', snapshot);
    }).finally(() => {
      state.loading = false;
    });
  };

  return {
    createFile,
  };
}
