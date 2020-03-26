var app = new Vue({
    el: '#app',
    data: {
        complains: [],
    },
    methods: {
        upvoteComplain(id) {
            //console.log(id);
            const upvote = firebase.functions().httpsCallable('upvote');
            upvote({ id })
                .catch(error => {
                    console.log(error.message);
                });
        }
    },
    mounted() {
        const ref = firebase.firestore().collection('complains');
        ref.onSnapshot(snapshot => {

            let complains = [];
            snapshot.forEach(doc => {
                complains.push({ ...doc.data(), id: doc.id });
            });
            this.complains = complains;
        });
    }

});

