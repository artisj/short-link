import React from 'react';
import { Link } from 'react-router-dom';

// export default class NotFound extends React.Component {
//   render() {
//     return (
//     <div className="boxed-view">
//     <div className="boxed-view__box">
//     <h1>Page Not Found</h1>
//     <p>Wer're unable to find that page.</p>
//     <Link to="/" className="button button--link">Head Home</Link>
//     </div>
//     </div>
//     );
//   }
// }

export default () => {
  return (
    <div className="boxed-view">
    <div className="boxed-view__box">
    <h1>Page Not Found</h1>
    <p>Wer're unable to find that page.</p>
    <Link to="/" className="button button--link">Head Home</Link>
    </div>
    </div>
    );
};
