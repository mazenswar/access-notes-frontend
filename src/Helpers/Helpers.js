import React from 'react';
import { Link } from 'react-router-dom';

// PROFILE NOTES

export const profileNotes = notes => {
  return notes.map(note => {
    const date = new Date(note.created_at).toDateString();
    return (
      <Link to={`notes/${note.id}`} key={note.id} className="profile-note-li">
        <p>{note.title}</p>
        <span className="date">{date}</span>
      </Link>
    );
  });
};

// NOTES
export const searchedNotes = (notes, searchTerm) => {
  return notes.filter(note => {
    return note.title.includes(searchTerm);
  });
};

export const generateNotes = notes => {
  return notes.map(note => {
    const date = new Date(note.created_at).toDateString();
    return (
      <Link to={`notes/${note.id}`} key={note.id} className="note-li">
        <p>{note.title}</p>
        <span>
          <img src={note.user.img_url} alt={note.title} />
          {note.user.username}
        </span>
        <span className="date">{date}</span>
      </Link>
    );
  });
};

// TAGS

export const searchTags = (tags, searchTerm) =>
  tags.filter(tag => tag.name.includes(searchTerm));

export const generateTags = tags => {
  return tags.map(tag => {
    return (
      <Link to={`tags/${tag.id}`} key={tag.id} className="tag-box">
        <p>{tag.name}</p>
        <span>{tag.notes.length} Note(s)</span>
      </Link>
    );
  });
};

// Misc

export const isNotEmpty = something =>
  Object.keys(something).length > 0 ? true : false;
