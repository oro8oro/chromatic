
SvgController = React.createClass({
  render() {
    return (
      <circle cx={this.props.x} cy={this.props.y} r={this.props.size} fill={this.props.color} />
    );
  }
});