/*
 * Copyright 2016 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 'use strict'

const React = require('react')
const ReactDOM = require('react-dom')
const propTypes = require('prop-types')
const Color = require('color')

const middleEllipsis = require('./../../utils/middle-ellipsis')

const styled = require('styled-components').default
const {Button, Box, Txt, Provider} = require('rendition')

const shared = require('/./../../../../../lib/shared/units')
const { colors, consts } = require('./../../theme')

const StyledButton = styled(Button)`
  width: 100%;
  max-width: ${consts.btnMinWidth};
  margin: auto;

  overflow: hidden;
`

const StyledFooter = styled(Txt.p).attrs({
  className: 'step-footer'
})``

const StyledFooterUnderline = styled(Txt.span).attrs({
  className: 'step-footer-underline'
})``

const StyledBox = styled(Box).attrs({
  className: 'step-selection-text'
})``

const ImageNameButton = styled(Button).attrs({
  className: 'step-image step-name'
})`
  &:hover, &:focus, &:active{
    color: ${colors.primary.foreground};
  }
`

const ChangeButton = styled(Button).attrs({
  className: 'button button-link step-footer'
})``

const StyledText = styled(Txt).attrs({
  className: 'step-image step-size'
})``

class SelectImageButton extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      chosenImage: '',
      imageSize: ''
    }
  }

  static getDerivedStateFromProps (props, state) {
    state.chosenImage = middleEllipsis(props.getImageName || props.getImageBasename , 20)
    state.imageSize = shared.bytesToClosestUnit(props.getImageSize)
    return state
  }


  render () {
    if (this.props.hasImage){
      return (
        <Provider>
          <StyledBox>
            <ImageNameButton
              plaintext
              onClick={() => this.props.showSelectedImageDetails()}
              tooltip={this.props.getImageBasename}
            >
              {this.state.chosenImage}
            </ImageNameButton>
            <StyledText>
              {this.state.imageSize}
            </StyledText>
            { this.props.flashing ?
              null
              :
              <ChangeButton
                plaintext
                onClick={() => this.props.reselectImage()}
              >
                Change
              </ChangeButton>
            }
          </StyledBox>
        </Provider>
      )
    }
    else {
      return (
        <Provider>
          <StyledBox>
            <StyledButton
              primary
              onClick={() => this.props.openImageSelector()}
            >
              Select image
            </StyledButton>
            <StyledFooter>
              { ::this.props.mainSupportedExtensions.join(', ') }, and
              <StyledFooterUnderline
                tooltip={ ::this.props.extraSupportedExtensions.join(', ') }
              >
                {' '}others
              </StyledFooterUnderline>
            </StyledFooter>
          </StyledBox>
        </Provider>
      )
    }
  }
}

SelectImageButton.propTypes = {
  openImageSelector: propTypes.func,
  mainSupportedExtensions: propTypes.array,
  extraSupportedExtensions: propTypes.array,
  hasImage: propTypes.bool,
  showSelectedImageDetails: propTypes.func,
  getImageName: propTypes.string,
  getImageBasename: propTypes.string,
  reselectImage: propTypes.func,
  flashing: propTypes.bool,
  getImageSize: propTypes.number,
}

module.exports = SelectImageButton
