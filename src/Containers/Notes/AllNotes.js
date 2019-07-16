import React from 'react';
import { connect } from 'react-redux';
import { searchedNotes, generateNotes } from '../../Helpers/Helpers';
import '../../stylesheets/notes/allNotes.scss';

class AllNotes extends React.Component {
  state = {
    searchTerm: '',
    sortBy: 'all',
  };

  handleSelect = event => {
    this.setState({ sortBy: event.target.value });
    console.log(this.state);
  };
  dropDownSelect = () => {
    const { sortBy } = this.state;
    return (
      <select value={sortBy} onChange={this.handleSelect}>
        <option value="all">All</option>
        <option value="new">Newest First</option>
      </select>
    );
  };

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  sortNotes = notes => {
    // const { sortBy } = this.state;
    // if (sortBy === 'new') {
    //   debugger;
    //   return notes.sort((a, b) => {
    //     return a.title - b.title;
    //   });
    // }
    return notes;
  };
  generateNoteLIs = () => {
    const { notes } = this.props;

    const { searchTerm } = this.state;
    console.log('search ', searchTerm);
    if (notes.length > 0) {
      const list = this.sortNotes(notes);
      return searchTerm === ''
        ? generateNotes(list)
        : generateNotes(searchedNotes(list, searchTerm));
    }
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <React.Fragment>
        {this.dropDownSelect()}
        <h1>Notes</h1>
        <input
          className="search-input"
          value={searchTerm}
          onChange={this.handleChange}
          placeholder="Search Notes"
        />
        <ul className="notes-ul">{this.generateNoteLIs()}</ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
});

export default connect(
  mapStateToProps,
  null
)(AllNotes);
