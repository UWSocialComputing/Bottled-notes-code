import { db, auth } from './firebase';
import { collection, getDocs, query, where, setDoc, doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const signUpUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
        return ({ userId: userCredential.user.uid, error: undefined });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        return ({ error: errorMessage });
    }
}

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
        return {
            todaysAnswer: userDocSnap.data().todaysAnswer,
            isPrivate: userDocSnap.data().isPrivate,
        };
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

const fetchPastNotes = async (questionId) => {
    if (questionId === undefined) {
        throw new Error("questionId is undefined!")
    }

    const qotdCollection = collection(db, "qotd");
    const q = query(qotdCollection, where("id", "<=", questionId));

    const querySnapshot = await getDocs(q);
    const notes = querySnapshot.docs.map(doc => doc.data());
    notes.sort((a, b) => a.id - b.id); // Sort by id
    return notes;
};

export {
    getQotd,
    signUpUser,
    signInUser,
    addNote,
    getAnswer,
    getMatchId,
    getMessages,
    sendMessage,
    fetchPastNotes
};