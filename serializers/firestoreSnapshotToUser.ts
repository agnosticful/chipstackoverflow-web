import * as firebase from "firebase/app";
import User, { UserId } from "../models/User";

export default function firestoreDataToUser(
  snapshot: firebase.firestore.DocumentSnapshot
): User {
  const data = snapshot.data()!;

  return {
    id: snapshot.id as UserId,
    name: data.name,
    profileImageURL: new URL(data.profileImageURL)
  };
}
