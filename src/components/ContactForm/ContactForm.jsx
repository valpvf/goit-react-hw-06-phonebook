import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  FormStyled,
  LabelStyled,
  InputStyled,
  BtnStyled,
} from './ContactForm.styled';

const ContactForm = ({ addContacts }) => {
  const [form, setForm] = useState({
    name: '',
    number: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContacts(form);
    e.target.reset();
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <LabelStyled>
        Name
        <InputStyled
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </LabelStyled>
      <LabelStyled>
        Number
        <InputStyled
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
        <BtnStyled type="submit">Add contact</BtnStyled>
      </LabelStyled>
    </FormStyled>
  );
};

ContactForm.propTypes = {
  addContacts: PropTypes.func,
};

export default ContactForm;
