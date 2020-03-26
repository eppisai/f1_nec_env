const complainModal = document.querySelector('.new-complain');
const complainLink = document.querySelector('.add-complain');
const complainForm = document.querySelector('.new-complain form')

//open request modal
complainLink.addEventListener('click', () => {
    complainModal.classList.add('open');
});

//close complain modal
complainModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('new-complain')) {
        complainModal.classList.remove('open');
    }
});
//add a new complain
complainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const addComplain = firebase.functions().httpsCallable('addComplain');
    addComplain({
        text: complainForm.complain.value
    })
        .then(() => {
            complainForm.reset();
            complainForm.querySelector('.error').textContent = '';
            complainModal.classList.remove('open');
        })
        .catch(error => {
            complainForm.querySelector('.error').textContent = error.message;
        });
});

// notification
const notification = document.querySelector('.notification');

const showNotification = (message) => {
    notification.textContent = message;
    notification.classList.add('active');
    setTimeout(() => {
        notification.classList.remove('active');
        notification.textContent = '';
    }, 4000);
};

