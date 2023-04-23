import React from 'react';

class nav extends React.Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
      children: [0, 1, 2, 3, 4],
    };
  }

  check_tittle_index(index) {
    return index === this.state.currentIndex
      ? 'Tab_tittle active'
      : 'Tab_tittle';
  }

  // check_item_index(index) {
  //     return index === this.state.currentIndex ? "show" : "Tab_item";
  // }

  render() {
    return (
      <div>
        <div className="Tab_tittle_wrap">
          {this.state.children.map((item, index) => {
            return (
              <div
                onClick={() => {
                  this.setState({ currentIndex: index });
                }}
                className={this.check_tittle_index(index)}
                key={index}
              ></div>
            );
          })}
        </div>
        <div className="Tab_item_wrap">
          {React.Children.map(this.props.children, (element, index) => {
            return <div>{element}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default nav;
