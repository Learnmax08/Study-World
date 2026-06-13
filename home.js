// ---- HOME PAGE USER LOGIN TRACKING SYSTEM ----
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
import { getFirestore, doc, updateDoc, increment } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

const auth = getAuth();
const db = getFirestore();

// යූසර් හෝම් පේජ් එකට ආපු ගමන් මේ සෙලෙක්ෂන් එක රන් වෙනවා
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            // Cloud Firestore එකේ 'users' කලෙක්ෂන් එක ඇතුලේ ඉන්න අදාල user.uid එක තියෙන ඩොකියුමන්ට් එක ගන්නවා
            const userDocRef = doc(db, 'users', user.uid);
            
            // ලොගින් වෙලාව සහ ලොගින් ගණන Cloud Firestore එකට ලස්සනට යාවත්කාලීන කරනවා
            await updateDoc(userDocRef, {
                'last_login': new Date().toLocaleString(),
                'login_count': increment(1)
            });
            
            console.log("User login tracking data saved successfully to Cloud Firestore!");
        } catch (error) {
            console.error("Tracking Error on Home Page: ", error);
        }
    }
});
