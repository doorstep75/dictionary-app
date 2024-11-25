import React from 'react';

function Link({ page, children }) {
  return <a href={page}>{children}</a>;
}

export default Link;