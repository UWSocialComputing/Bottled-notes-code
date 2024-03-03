const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.resetAnsweredToday = functions.pubsub
    .schedule("0 0 * * *").timeZone("America/Los_Angeles")
    .onRun(async (context) => {
      const usersRef = admin.firestore().collection("users");
      const chatsRef = admin.firestore().collection("chats");
      const usersSnapshot = await usersRef.get();
      const chatsSnapshot = await chatsRef.get();
      const batch = admin.firestore().batch();

      usersSnapshot.docs.forEach((doc) => {
        const userRef = usersRef.doc(doc.id);
        const updates = {
          answeredToday: false,
          todaysMatchId: null,
          todaysAnswer: null,
          todaysRandom: Math.floor(Math.random() * 1000) + 1,
          alreadyMatched: false,
        };

        batch.update(userRef, updates);
      });

      chatsSnapshot.docs.forEach((doc) => {
        const chatRef = chatsRef.doc(doc.id);
        batch.delete(chatRef);
      });

      await batch.commit();
      console.log("Reset stuff for all users");
      return null;
    });

exports.pairUsers = functions.pubsub
    .schedule("0 */4 * * *").timeZone("America/Los_Angeles")
    .onRun(async (context) => {
      const usersRef = admin.firestore().collection("users");
      const snapshot = await usersRef.get();
      const batch = admin.firestore().batch();

      // Filter and sort users
      const users = snapshot.docs
          .filter((doc) =>
            doc.data().answeredToday === true &&
            doc.data().alreadyMatched === false &&
            doc.data().isPrivate !== true,
          )
          .sort((a, b) => a.data().todaysRandom - b.data().todaysRandom);

      console.log(`Found ${users.length} users to pair up`);

      // Pair up users
      for (let i = 0; i < users.length - 1; i += 2) {
        const user1 = users[i];
        const user2 = users[i + 1];

        console.log(`Pairing up user ${user1.id} with user ${user2.id}`);

        // Update user fields
        batch.update(usersRef
            .doc(user1.id), {todaysMatchId: user2.id, alreadyMatched: true});
        batch.update(usersRef
            .doc(user2.id), {todaysMatchId: user1.id, alreadyMatched: true});

        // Create chat documents
        const chat1Ref = admin.firestore().collection("chats").doc(user1.id);
        const chat2Ref = admin.firestore().collection("chats").doc(user2.id);

        batch.set(chat1Ref, {messages: []});
        batch.set(chat2Ref, {messages: []});
      }

      await batch.commit();
      console.log("Paired up users");
      return null;
    });
