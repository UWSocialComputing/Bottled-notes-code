import { db, auth } from './firebase';
import { collection, getDocs, query, where, setDoc, doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const signUpUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Signed up 
        const user = userCredential.user;
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
    }
}

const signInUser = async (userCredentials) => {
    const email = userCredentials.email;
    const password = userCredentials.password;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in
        console.log('user signed in');
        return ({ userId: userCredential.user.uid, error: undefined });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        return ({ error: errorMessage });
    }
}

// temporary to upload questions to the database
// const uploadData = async () => {
//     const data = [
//         {
//             id: 180,
//             question: "What's a lesson you learned from a stranger?",
//             usedbefore: false
//         },
//         // format continues
//     ];

//     console.log('uploaddata called');

//     const batch = writeBatch(db);

//     data.forEach((item) => {
//         const docRef = doc(collection(db, "qotd")); // automatically generate unique id
//         batch.set(docRef, item);
//     });

//     try {
//         await batch.commit();
//         console.log('Data uploaded successfully.');
//     } catch (error) {
//         console.error('Error uploading data:', error);
//     }
// };

const getQotd = async (questionId) => {
    const qotdCollection = collection(db, "qotd");
    const q = query(qotdCollection, where("id", "==", questionId));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return doc.data().question;
    } else {
        console.log("No such document!");
        return null;
    }
}

const addNote = async (userId, answer, isPrivate) => {
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, { answeredToday: true, isPrivate: isPrivate, todaysAnswer: answer }, { merge: true });
}

const getAnswer = async (userId) => {
    const userDoc = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDoc);
    if (userDocSnap.exists()) {
        return userDocSnap.data().todaysAnswer;
    } else {
        console.log("No such document!");
        return null;
    }
}

const getMatchId = async (userId) => {
    const userDoc = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDoc);
    if (userDocSnap.exists()) {
        const user = userDocSnap.data();
        if (user.alreadyMatched) {
            return user.todaysMatchId;
        }
    } else {
        console.log("No such document!");
    }
    return null;
}

const getMessages = async (matchId) => {
    if (!matchId) {
        console.log("matchId is null or undefined 1!");
        return [];
    }

    const docRef = doc(db, "chats", matchId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().messages || [];
    } else {
        console.log("No such document!");
        return [];
    }
};

const sendMessage = async (matchId, message, senderId) => {
    const userIds = [senderId, matchId];
    for (const userId of userIds) {
        const docRef = doc(db, "chats", userId);
        await updateDoc(docRef, {
            messages: arrayUnion({
                text: message,
                senderId: senderId
            })
        });
    }
};

export {
    getQotd,
    signUpUser,
    signInUser,
    addNote,
    getAnswer,
    getMatchId,
    getMessages,
    sendMessage
};