import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../../icons/Icon'

export default class TodoItem extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        info: PropTypes.object.isRequired,
        changeFocusId: PropTypes.func.isRequired,
        focusing: PropTypes.bool.isRequired,
        textareaRef: PropTypes.object.isRequired,
        editTodo: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            content: props.info.content
        }
        this.textareaRef = React.createRef();
    }

    componentDidMount() {
        const { focusing } = this.props
        if (focusing) {
            this.focus(this.textareaRef)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.focusing === false && this.props.focusing === true) {
            this.focus(this.textareaRef)
        }
    }

    focus() {
        this.textareaRef.current.focus()
    }

    render() {
        const { index, info, changeFocusId, focusing, editTodo } = this.props
        return (
            <div data-id={ info.id } onClick={ () => { changeFocusId(info.id) } }>
                <span className="pointer" onClick={ () => { } }>
                    <Icon name='radioBoxBlank' />
                </span>
                <textarea
                    rows="1"
                    className={ focusing ? '' : 'hide' }
                    ref={ this.textareaRef }
                    value={ this.state.content }
                    onChange={ (e) => { this.setState({ content: e.target.value }) } }
                    onBlur={ (e) => { editTodo(info, index, e.target.value) } }
                ></textarea>
                <span className={ focusing ? 'hide' : '' }>{ this.state.content }</span>
            </div>
        )
    }
}
