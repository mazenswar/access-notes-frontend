A User has many notes
A note belongs to A User
A User has many favoriteLists
A User has many notes Through favoriteLists
A Note has many noteTags
A Note has many tags through noteTags

Note:

- title
- content
- user_id

FavoriteList:

- user_id
- note_id

Tag:

- title

NoteTag:

- note_id
- tag_id
