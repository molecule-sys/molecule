import React from 'react';

export default class Autocomplete extends React.PureComponent {

  static propTypes = {
    data: React.PropTypes.instanceOf(Array).isRequired,
    id: React.PropTypes.string,
    wrapperClassName: React.PropTypes.string,
    inputClassName: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    maxLength: React.PropTypes.string,
    inputValue: React.PropTypes.string,
    takeState: React.PropTypes.bool,
    value: React.PropTypes.bool,
    required: React.PropTypes.bool,
    searchText: React.PropTypes.func,
  }

  state = {
    searchText: '',
    showDropdown: false,
  }

  onChangeAutocomplete = (event) => {
    this.setState({
      searchText: event.currentTarget.value,
    });
    this.props.searchText({
      searchText: event.currentTarget.value,
    });
  }

  onFocusAutocomplete = () => {
    this.setState({
      searchText: '',
      showDropdown: true,
    });
    if (this.props.value) {
      this.props.searchText({
        searchText: '',
      });
    }
  }

  onBlurAutocomplete = () => {
    setTimeout(() => {
      this.setState({
        showDropdown: false,
      });
    }, 200);
  }

  onSelectListItem = (event) => {
    this.setState({
      showDropdown: false,
    });
    if (this.props.value) {
      this.setState({
        searchText: event.target.dataset.text,
      });
    }
    this.props.searchText({
      searchText: event.target.dataset.text,
    });
  }

  render() {
    return (
      <div className={`Autocomplete ${this.props.wrapperClassName}`}>
        <div className="Autocomplete-wrapper">
          <input
            id={this.props.id}
            type="search"
            className={`Input ${this.props.inputClassName}`}
            placeholder={this.props.placeholder}
            maxLength={this.props.maxLength}
            required={this.props.required}
            onFocus={this.onFocusAutocomplete}
            onBlur={this.onBlurAutocomplete}
            value={this.props.takeState ? this.props.inputValue : this.state.searchText}
            onChange={this.onChangeAutocomplete}
          />
          <ul className={`Autocomplete-list ${this.state.showDropdown ? 'show' : ''}`}>
            {this.props.data.length > 0 &&
              this.props.data
                .filter(item => item !== null)
                .filter(item => (
                  item.name ?
                    item.name.toLowerCase().indexOf(
                      this.state.searchText.name ?
                        this.state.searchText.name.toLowerCase() :
                        this.state.searchText.toLowerCase(),
                    ) !== -1 :
                    item.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
                ))
                .map((item, i) =>
                  <li
                    onClick={this.onSelectListItem}
                    data-text={item.name ? item.id : item}
                    key={i}
                  >
                    {item.name ? item.name : item}
                  </li>,
                )
            }
          </ul>
        </div>
      </div>
    );
  }

}
