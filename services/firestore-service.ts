import { db } from '../firebaseConfig.js';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  setDoc,
} from 'firebase/firestore';

export class FirestoreService<T> {
  private colRef: CollectionReference;

  constructor(collectionPath: string) {
    this.colRef = collection(db, collectionPath);
  }

  // Create a new document
  async create(data: T): Promise<string> {
    const docRef = await addDoc(this.colRef, data as any);
    return docRef.id;
  }

  // Create a new document (with Id)
  async createWithId(id: string, data: T): Promise<string> {
    const docRef = doc(this.colRef, id); // Create a reference to the document with the specified ID
    await setDoc(docRef, data as any); // Set the document data
    return docRef.id; // Return the ID
  }

  // Read a single document by ID
  async read(id: string): Promise<T | null> {
    const docRef = doc(this.colRef, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  }

  // Read all documents in the collection
  async readAll(): Promise<{ id: string; data: T }[]> {
    const snapshot = await getDocs(this.colRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data() as T,
    }));
  }

  // Update a document by ID
  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(this.colRef, id);
    await updateDoc(docRef, data as any);
  }

  // Delete a document by ID
  async delete(id: string): Promise<void> {
    const docRef = doc(this.colRef, id);
    await deleteDoc(docRef);
  }
}
