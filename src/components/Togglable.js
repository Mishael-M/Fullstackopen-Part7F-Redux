import PropTypes from 'prop-types';
import React, { useImperativeHandle, useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #e4717a;
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 1em;
  border: 2px solid #c41e3a;
  border-radius: 3px;
  &:hover {
    background: rgba(200, 0, 0, 0.5);
  }
`;
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
