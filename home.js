// ---- HOME PAGE USER LOGIN TRACKING SYSTEM ----
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
import { getFirestore, doc, updateDoc, increment } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

// දැනටමත් ඔයා index.html එකේ initialize කරලා තියෙන Firebase App එක මේ ෆයිල් එකටත් සම්බන්ධ වෙනවා
const auth = getAuth();
const db = getFirestore();

// යූසර් index.html එකෙන් සාර්ථකව ලොග් වෙලා home.html එකට ආපු සැණින් මේක ක්‍රියාත්මක වෙනවා
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const userDocRef = doc(db, 'users', user.uid);
            
            // Firestore එකේ අදාළ යූසර්ගේ ID එක ඇතුලට දත්ත යවනවා
            await updateDoc(userDocRef, {
                'last_login': new Date().toLocaleString(), // ලොග් වුණු දිනය සහ වෙලාව
                'login_count': increment(1) // දැනට තියෙන ගණනට 1 ක් එකතු කරනවා (Auto +1)
            });
            
            console.log("User active session & login count tracked successfully on Home Page!");
        } catch (error) {
            console.error("Tracking Error on Home Page: ", error);
        }
    } else {
        console.log("No user is signed in on home page.");
    }
});
