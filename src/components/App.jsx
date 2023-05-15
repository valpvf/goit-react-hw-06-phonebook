import { useState } from 'react';
import { nanoid } from 'nanoid';

import { useLocalStorage } from 'hooks/useLocalStorage';
import { ContactForm, ContactList, Filter } from 'components';
import {
  TitleStyled,
  SubtitleStyled,
} from '../components/ContactForm/ContactForm.styled';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', '[]');
  const [filter, setFilter] = useState('');

  const addContacts = ({ name, number }) => {
    if (contacts.some(el => el.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in contacts.`);
    }
    setContacts(prevContacts => [
      ...prevContacts,
      { name, number, id: nanoid() },
    ]);
  };

  const removeContacts = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contacts => contacts.id !== id)
    );
  };

  const filterContacts = e => {
    console.log(e.target.value);
    const { value } = e.target;
    setFilter(value);
  };

  const showContacts = () => {
    if (filter === '') return contacts;
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const renderContacts = showContacts();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <TitleStyled>Phonebook</TitleStyled>
      <ContactForm addContacts={addContacts} contacts={contacts} />
      <SubtitleStyled>Contacts</SubtitleStyled>
      <Filter filter={filter} filterContacts={filterContacts} />
      <ContactList contacts={renderContacts} removeContacts={removeContacts} />
    </div>
  );
};
