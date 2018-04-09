import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

import { PNoMargins } from '../components/Text'

const Label = PNoMargins.withComponent('label').extend`
  font-weight: bold;
`

class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayColorPicker: false,
      color: {
        hex: this.props.input.value || '#333'
      },
    }
  }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState(() => ({
      color
      }), this.props.input.onChange(color.hex)
    )
  };

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '56px',
          height: '22px',
          borderRadius: '4px',
          background: this.state.color.hex,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '4px',
          boxShadow: '0 1px 1px 0 rgba(0,0,0,.1)',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    const { input, className, label, ...restProps } = this.props

    return (
      <div {...className}>
        <div>
          <Label onClick={this.handleClick}>{label}</Label>
        </div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? <div style={styles.popover}>
          <div style={styles.cover} onClick={this.handleClose} />
          <SketchPicker color={this.state.color} onChange={this.handleChange} {...restProps} />
        </div> : null}

      </div>
    )
  }
}

export default ColorPicker