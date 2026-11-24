import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';

const getLibraryRef = () => {
  const uid = getAuth().currentUser?.uid || 'guest';
  const db = getFirestore();
  return collection(doc(collection(db, 'users'), uid), 'library');
};

export const addBookToLibrary = async (book: { title: string; author: string; coverId?: number }) => {
  await addDoc(getLibraryRef(), {
    ...book,
    status: 'Want to Read',
    addedAt: serverTimestamp(),
  });
};

export const getMyLibrary = async () => {
  const q = query(getLibraryRef(), orderBy('addedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateBookStatus = async (docId: string, newStatus: string) => {
  await updateDoc(doc(getLibraryRef(), docId), { status: newStatus });
};

export const deleteBookFromLibrary = async (docId: string) => {
  await deleteDoc(doc(getLibraryRef(), docId));
};
