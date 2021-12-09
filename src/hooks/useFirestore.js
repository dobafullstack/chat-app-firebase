import React, { useState, useContext } from 'react';
import {db} from '../firebase/config';

const useFirestore = (collection, condition) => {
    const [documents, setDocuments] = useState([])

    React.useEffect(() => {
        let collectionRef = db
            .collection(collection);

        if (condition){
            if (!condition.compareValue || !condition.compareValue.length){
                return;
            }

            collectionRef = collectionRef
                .where(
                    condition.fieldName,
                    condition.operator,
                    condition.compareValue
                );
        }
        
        const unsubcribe = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setDocuments(documents)
        })
        
        return unsubcribe
    },  [collection, condition]);
    return documents
}

export const useMemberstore = (collection, condition) => {
    const [members, setMembers] = useState([]);

    React.useEffect(() => {
        let collectionRef = db
            .collection(collection);

        if (condition){
            if (!condition.compareValue || !condition.compareValue.length){
                return;
            }

            collectionRef = collectionRef
                .where(
                    condition.fieldName,
                    condition.operator,
                    condition.compareValue
                );
        }
        
        const unsubcribe = collectionRef.onSnapshot((snapshot) => {
            const members = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setMembers(members);
        })
        
        return unsubcribe
    },  [collection, condition]);
    return members;
}

export const useMessagestore = (collection, condition) => {
    const [message, setMessage] = useState([]);

    React.useEffect(() => {
        let collectionRef = db
            .collection(collection);


        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }

            collectionRef = collectionRef.where(
                condition.fieldName,
                condition.operator,
                condition.compareValue
            );
        }

        const unsubcribe = collectionRef.onSnapshot((snapshot) => {
            const messages = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setMessage(messages);
        });

        return unsubcribe;
    }, [collection, condition]);

    return message;
};

export default useFirestore;