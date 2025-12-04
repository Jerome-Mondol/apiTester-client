import { doc, setDoc, addDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.init.js";
import axios from "axios";
import { axiosInstance } from "../axios/axios.js";

// Send API request via server proxy and map response
export const sendApiRequest = async ({ url, method = 'GET', headers = {}, body = null, params = {} }) => {
    try {
        // Send to server proxy which will perform the external request
        const res = await axiosInstance.post('/api/proxy', { url, method, headers, body, params }, { validateStatus: () => true });

        // server returns { status, statusText, headers, body, time }
        const payload = res.data || {};

        return {
            success: true,
            status: payload.status || res.status,
            statusText: payload.statusText || res.statusText || '',
            headers: payload.headers || {},
            data: payload.body,
            time: payload.time != null ? payload.time : null
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
};

// Save a request under the current user's requests collection
export const addRequest = async (userId, request) => {
    if (!userId) return null;
    try {
        const colRef = collection(db, 'users', userId, 'requests');
        const payload = {
            ...request,
            createdAt: new Date()
        };
        const docRef = await addDoc(colRef, payload);
        return docRef.id;
    } catch (err) {
        console.error('Failed to save request', err);
        return null;
    }
};

// Subscribe to a user's requests (real-time) - returns unsubscribe
export const subscribeToRequests = (userId, onUpdate) => {
    if (!userId) return () => {};
    const colRef = collection(db, 'users', userId, 'requests');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        onUpdate(items);
    }, (err) => {
        console.error('subscribeToRequests error', err);
    });

    return unsubscribe;
};

// Save request into a named collection (creates collection doc then adds request)
export const saveToCollection = async (userId, collectionName, request) => {
    if (!userId) return null;
    try {
        const collectionsRef = collection(db, 'users', userId, 'collections');
        // create or get collection doc by name (simple approach: create new doc with name)
        const colDocRef = await addDoc(collectionsRef, { name: collectionName, createdAt: new Date() });
        // add request under this collection
        const requestsRef = collection(db, 'users', userId, 'collections', colDocRef.id, 'requests');
        await addDoc(requestsRef, { ...request, createdAt: new Date() });
        return colDocRef.id;
    } catch (err) {
        console.error('saveToCollection error', err);
        return null;
    }
}