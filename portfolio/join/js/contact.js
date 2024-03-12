let selectedIndex = 0;
loggedInUser = [];

async function initContats() {
    await includeHTML();
    loadContactList();
    activeMenu();
    load();
    loadUserProfile();
}


/**
 * This function is used to initial the contact list.
 */
function initContactList() {
    let container = document.getElementById('contacts_list_container');
    container.innerHTML = '';
    let groupedContacts = groupContactsByFirstLetter(contact_list);
    for (const [letter, contacts] of groupedContacts) {
        container.innerHTML += renderLetterbox(letter);
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            const initials = contact['given_name'][0] + contact['name'][0];
            const backgroundColor = contact['color'] ? `style="background-color: ${contact['color']};"` : 'style="background-color: rgb(209,209,209);"';
            container.innerHTML += renderSnippetBox(contact, backgroundColor);
        }
    }
}


/**
 * This function is used to group the contacts sorted in alphabet.
 * 
 * @param {string} contacts - this are the contacts to be sorted.
 * @returns creates a new Map object containing grouped contacts, filtering out empty groups and sorting them alphabetically.
 */
function groupContactsByFirstLetter(contacts) {
    const groupedContacts = contacts.reduce((map, contact) => {
        const firstLetter = contact.given_name[0].toUpperCase();
        const contactsWithSameLetter = map.get(firstLetter) || [];
        contactsWithSameLetter.push(contact);
        map.set(firstLetter, contactsWithSameLetter);
        return map;
    }, new Map());
    return new Map([...groupedContacts].filter(([letter, contacts]) => contacts.length > 0).sort());
}


/**
 * This function is used to open a popup to add a new contact to the contact list.
 */
function openAddContactCard() {
    document.getElementById('addContactScreen').classList.remove('d-none');
    document.getElementById('add_contact_card').classList.add('move-to-screen');
    setTimeout(removeAnimationsFromOpenAddContactCard, 300);
}


/**
 * This function is used to remove the animation, the popup needs to appear.
 */
function removeAnimationsFromOpenAddContactCard() {
    document.getElementById('add_contact_card').classList.remove('move-to-screen');
}


/**
 * This function is used to add a animation to hide the "add Contact" popup from screen.
 */
function hideAddContactCardFromScreen() {
    document.getElementById('add_contact_card').classList.add('hide-from-screen');
    setTimeout(closeAddContactCard, 200);
}


/**
 * This function is used to close the "add Contact" popup.
 */
function closeAddContactCard() {
    document.getElementById('addContactScreen').classList.add('d-none');
    document.getElementById('add_contact_card').classList.remove('hide-from-screen');
}


/**
 * This function is used to open a popup to edit or delete a existing contact.
 * 
 * @param {string} contactId - This is the Contact Id to edit in popup
 */
function openEditContactCard(contactId) {
    const contactData = contact_list.find(contact => contact.id === contactId);
    document.getElementById('editContactScreen').classList.remove('d-none');
    fillEditContactCardWithContactData(contactData, contactId);
    setTimeout(removeAnimationsFromOpenEditContactCard, 300);
}


/**
 * This function is used to fill the inputfields in edit popup with data from a existing contact
 * 
 * @param {string} contactData - this are the data from the selected contact from the contact list array
 * @param {string} contactId - this is the id from the selected Contact
 */
function fillEditContactCardWithContactData(contactData, contactId) {
    document.getElementById('editContactScreen').innerHTML = renderEditContactCard(contactData, contactId);
    document.getElementById('edit_contact_fname').value = contactData['given_name'];
    document.getElementById('edit_contact_lname').value = contactData['name'];
    document.getElementById('edit_contact_email').value = contactData['e-mail'];
    document.getElementById('edit_contact_phone').value = contactData['phone'];
}


/**
 * This function is used to remove the animation, the popup needs to appear.
 */
function removeAnimationsFromOpenEditContactCard() {
    document.getElementById('edit_contact_card').classList.remove('move-to-screen');
}


/**
 * This function is used to add a animation to hide the "edit Contact" popup from screen.
 */
function hideEditCardFromScreen() {
    document.getElementById('edit_contact_card').classList.add('hide-from-screen');
    document.getElementById('editContactScreen').classList.remove('d-none');
    setTimeout(closeEditContactCard, 200);
}


/**
 * This function is used to close the "edit Contact" popup.
 */
function closeEditContactCard() {
    document.getElementById('edit_contact_card').classList.remove('hide-from-screen');
    document.getElementById('editContactScreen').classList.add('d-none');
}


/**
 * This function prevents to hide the popup by clicking on the popup.
 * 
 * @param {string} event - this parameter captures the event data.
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * this function is used to select a contact from the contact list.
 * 
 * @param {string} contactId - this is the id from the selected contact
 */
function selectContact(contactId) {
    const selectedContact = contact_list.find(contact => contact.id === contactId);
    const allContactSnippetBoxes = document.querySelectorAll('.contact_list_snippet_box');
    allContactSnippetBoxes.forEach(box => box.classList.remove('contact_list_snippet_box_blue'));
    const selectedContactSnippetBox = document.querySelector(`#contactSnippetBox${contactId}`);
    if (selectedContactSnippetBox) {
        selectedContactSnippetBox.classList.add('contact_list_snippet_box_blue');
    }
    const elements = ['contacts_list_container', 'showContactContainer', 'showContactHeaderBox', 'showContactFooterBox', 'add_contacts_button_box', 'open_sidebar_button'];
    selectedContactIfElseBranch(elements);
    renderContactDetails(selectedContact);
}


/**
 * This function is used to show a selected Contact.
 * 
 * @param {string} elements - this are the elements to add or remove classes to show the contact.
 */
function selectedContactIfElseBranch(elements) {
    document.getElementById('show-contact').classList.add('z_index1');
    elements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            if (elementId === 'contacts_list_container') {
                element.classList.remove('z_index3');
            } else if (elementId === 'showContactContainer' || elementId === 'showContactHeaderBox' || elementId === 'showContactFooterBox') {
                element.classList.add('z_index5');
                if (elementId === 'showContactFooterBox') {
                    element.classList.remove('d-none');
                }
            } else if (elementId === 'add_contacts_button_box') {
                element.classList.remove('z_index4');
            } else if (elementId === 'open_sidebar_button') {
                element.classList.add('z_index6');
            }
        }
    });
}

/**
 * This function is used to rendering an selected contact to show all details.
 * 
 * @param {string} contact - this is the selected contact to render.
 */
function renderContactDetails(contact) {
    const initials = contact['given_name'][0] + contact['name'][0];
    const name = contact['given_name'] + ' ' + contact['name'];
    const e_mail = contact['e-mail'];
    const phone = contact['phone'];

    document.getElementById('showContactContainer').innerHTML = generateContactDetailsHtml(contact);
}

/**
 * This function is used to delete a selected contact from the contact list.
 * 
 * @param {string} contactId - this is the id from the selected contact to be deleted.
 */
function deleteSelectedContact(contactId) {
    const contacts = JSON.parse(localStorage.getItem('contact_list'));
    const selectedIndex = contacts.findIndex(contact => contact.id === contactId);

    if (selectedIndex !== -1) {
        contacts.splice(selectedIndex, 1);
        localStorage.setItem('contact_list', JSON.stringify(contacts));
    }

    loadContactList();
    closeShowContact();
    showContactDeletedConfirmation();
}


/**
 * This function is used to hide the redered Contact details.
 */
function closeShowContact() {
    document.getElementById('show-contact').classList.remove('z_index1');
    document.getElementById('contacts_list_container').classList.add('z_index3');
    document.getElementById('showContactContainer').classList.remove('z_index5');
    document.getElementById('showContactHeaderBox').classList.remove('z_index5');
    document.getElementById('showContactFooterBox').classList.remove('z_index5');
    document.getElementById('showContactFooterBox').classList.add('d-none');
    document.getElementById('add_contacts_button_box').classList.add('z_index4');
    const allContactSnippetBoxes = document.querySelectorAll('.contact_list_snippet_box');
    allContactSnippetBoxes.forEach(box => {
        box.classList.remove('contact_list_snippet_box_blue');
    });
}


/**
 * This function is used to open a popup with a button to edit a selected Contact or delete a selected contact.
 * 
 * @param {string} contactId - This is the selected Contact to edit or delete.
 */
function openEditDeleteContactPopup(contactId) {
    document.getElementById('edit_delete_contact_popup_screen').classList.remove('d-none');
    document.getElementById('edit_delete_contact_popup_screen').innerHTML = '';
    document.getElementById('edit_delete_contact_popup_screen').innerHTML = renderEditDeleteContactPoup(contactId);
}


/**
 * This function is used to hide the little popup from screen with an animation.
 */
function moveEditDeleteContactPopupFromScreenToRight() {
    document.getElementById('edit_delete_contact_popup').classList.add('move-from-screen-to-right');
    document.getElementById('edit_delete_contact_popup_screen').classList.remove('d-none');
    setTimeout(closeEditDeleteContactPopup, 600);
}


/**
 * This function is used to close the popup with the two buttons to edit or delete contacts.
 */
function closeEditDeleteContactPopup() {
    const popupElement = document.getElementById('edit_delete_contact_popup');
    const screenElement = document.getElementById('edit_delete_contact_popup_screen');

    if (popupElement && screenElement) {
        popupElement.classList.remove('move-from-screen-to-right');
        screenElement.classList.add('d-none');
    }
}


/**
 * This function is used to show a confirmation-button when a contact is created or edited.
 */
function showContactCreatedConfirmation() {
    document.getElementById('confirmation_container').classList.remove('d-none');
    setTimeout(hideContactCreatedConfirmation, 1400);
}


/**
 * This function is used to hide the saved-confirmation-button.
 */
function hideContactCreatedConfirmation() {
    document.getElementById('confirmation_container').classList.add('d-none');
}


/**
 * This function is used to show a confirmation-button when a contact is deleted.
 */
function showContactDeletedConfirmation() {
    document.getElementById('delete_confirmation_container').classList.remove('d-none');
    setTimeout(hideContactDeletedConfirmation, 1400);
}


/**
 * This function is used to hide the deleted-confirmation-button.
 */
function hideContactDeletedConfirmation() {
    document.getElementById('delete_confirmation_container').classList.add('d-none');
}


/**
 * This function is used to save an added Contact
 */
function saveAddedContact() {
    let form = document.getElementById('addContactForm');

    let first_name = document.getElementById('add_contact_fname');
    let last_name = document.getElementById('add_contact_lname');
    let email = document.getElementById('add_contact_email');
    let phone = document.getElementById('add_contact_phone');
    let newContact = getNewContactInformation(first_name, last_name, email, phone);
    contact_list.push(newContact);
    localStorage.setItem('contact_list', JSON.stringify(contact_list));
    clearAddContactInputfields(first_name, last_name, email, phone);
    showContactCreatedConfirmation();
    hideAddContactCardFromScreen();
    loadContactList();
}


/**
 * This function is used to get the informations from inputfields of add Contact Popup
 * 
 * @param {string} first_name - This is the given name from the inputfield
 * @param {string} last_name - This is the family name from the inputfield
 * @param {string} email - This is the email-adress from the inputfield
 * @param {string} phone - This is the phone number from the inputfield
 * @returns This are the informations for add to the contact list as json array
 */
function getNewContactInformation(first_name, last_name, email, phone) {
    return {
        'id': generateUniqueId(),
        'name': last_name.value,
        'given_name': first_name.value,
        'e-mail': email.value,
        'color': generateRandomColor(),
        'phone': phone.value
    };
}


/**
 * This function is used to clear the inputfields after add a new contact.
 * 
 * @param {string} first_name - this is the first name inputfield to clear
 * @param {string} last_name - this is the last name inputfield to clear
 * @param {string} email - this is the email adress inputfield to clear
 * @param {string} phone - this is the phone number inputfield to clear
 */
function clearAddContactInputfields(first_name, last_name, email, phone) {
    first_name.value = '';
    last_name.value = '';
    email.value = '';
    phone.value = '';
}


/**
 * this function is used to load the Contact list.
 */
function loadContactList() {
    if (!localStorage.getItem('contact_list')) {
        localStorage.setItem('contact_list', JSON.stringify(contact_list));
    }

    let contactListAsString = localStorage.getItem('contact_list');
    contact_list = JSON.parse(contactListAsString);
    initContactList();
}


/**
 * This function is used to generate an id for each new contact.
 */
function generateUniqueId() {
    return (contact_list.length + 1).toString();
}


/**
 * This function is used to save an edited Contact
 * 
 * @param {string} contactId - this is the id of the edited contact
 */
function saveEditedContact(contactId) {
    const updatedContact = updateContact(contactId);
    contact_list.push(updatedContact);
    localStorage.setItem('contact_list', JSON.stringify(contact_list));
    hideEditCardFromScreen();
    closeShowContact();
    loadContactList();
    showContactCreatedConfirmation();
}


/**
 * This function is used to update the contacts in the inputfields of the edit contact popup.
 * 
 * @param {string} contactId - this is the id of the contact to update.
 * @returns this returns the updated contact.
 */
function updateContact(contactId) {
    const { firstName, lastName, email, phone } = declareInputs();
    const selectedContactIndex = contact_list.findIndex(contact => contact.id === contactId);
    const oldContact = contact_list.splice(selectedContactIndex, 1)[0];
    const updatedContact = {
        id: oldContact.id,
        name: lastName.value,
        given_name: firstName.value,
        'e-mail': email.value,
        color: oldContact.color,
        phone: phone.value
    };
    return updatedContact;
}


/**
 * This function is used to declare the variables from elements by Id
 * 
 * @returns this returns the declarations.
 */
function declareInputs() {
    return {
        firstName: document.getElementById('edit_contact_fname'),
        lastName: document.getElementById('edit_contact_lname'),
        email: document.getElementById('edit_contact_email'),
        phone: document.getElementById('edit_contact_phone')
    };
}