import firebase from 'firebase/app';
import 'firebase/storage';
import { reactive, toRefs } from 'vue';

interface StorageOptions {
  path: string;
}

export default function (storageOptions?: StorageOptions) {
  const state = reactive({
    error: null,
    processing: false,
    progress: 0,
    storageData: {} as any,
  });

  const storage = firebase.storage();
  const storageRef = storage.ref();

  const createFile = (file: File) => {
    const path = [storageOptions?.path, file.name].join('/');
    const uploadTask = storageRef.child(path).put(file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        state.progress = progress;
        state.processing = true;
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused.');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running.');
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          state.storageData.url = downloadUrl;
          state.processing = false;
          console.log(`File available at ${downloadUrl}`);
        });
      });
  };

  return {
    ...toRefs(state),
    createFile,
  };
}
