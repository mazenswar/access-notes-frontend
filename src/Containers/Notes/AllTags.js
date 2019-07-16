import React from 'react';
import { BASE_URL } from '../../ApiConstants';
import { searchTags, generateTags } from '../../Helpers/Helpers';
import '../../stylesheets/notes/allTags.scss';

class AllTags extends React.Component {
  state = {
    tags: [],
    searchTerm: '',
  };

  componentDidMount() {
    fetch(`${BASE_URL}/tags`)
      .then(r => r.json())
      .then(tagsArr => this.setState({ tags: tagsArr }));
  }

  handleChange = e => this.setState({ searchTerm: e.target.value });

  generateTagElements = () => {
    const { searchTerm, tags } = this.state;
    return searchTerm === ''
      ? generateTags(tags)
      : generateTags(searchTags(tags, searchTerm));
  };

  render() {
    const { tags, searchTerm } = this.state;
    if (tags.length > 0) {
      return (
        <React.Fragment>
          <h1>Tags</h1>
          <input
            className="search-input"
            value={searchTerm}
            onChange={this.handleChange}
            placeholder="Search Tags"
          />
          <div className="tags-container">{this.generateTagElements()}</div>
        </React.Fragment>
      );
    }
    return null;
  }
}

export default AllTags;
